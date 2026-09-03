import type { Request, Response } from "express";
import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";
import { Role } from "../types/enum.types.js";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils.js";

const folder = "/amenity";
export const getAll = catchAsync(async (req: Request, res: Response) => {
  const filter: any = {};
  const { role = Role.USER } = req.query;
  if (role) {
    filter.role = role;
  }

  const users = await User.find(filter).select("-password");

  sendResponse(res, {
    message: "Displaying all users",
    statusCode: 200,
    data: users,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password");

  if (!user) throw new AppError("user not found", 404);
  sendResponse(res, {
    message: "user found successfully",
    statusCode: 200,
    data: user,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { fullName, role, phone } = req.body;
  const file = req.file;

  const user = await User.findOne({ _id: id });
  if (!user) throw new AppError("User not found", 400);

  if (fullName) user.fullName = fullName;
  if (role) user.role = role;
  if (phone) user.phone = phone;

  if (file) {
    const { path, public_id } = await uploadFileToCloudinary(file, folder);
    await deleteFileFromCloudinary(user.profile_image.public_id);
    user.profile_image = {
      path,
      public_id,
    };
  }
  await user.save();
  sendResponse(res, {
    message: `${user.role} updated successfully`,
    statusCode: 201,
    data: user,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const _id = req.params.id;

  const user = await User.findOne({ _id });

  if (!user) throw new AppError("user not found", 404, "NOT FOUND");

  await deleteFileFromCloudinary(user.profile_image.public_id);
  await user.deleteOne();

  sendResponse(res, {
    message: "User deleted successsfully",
    statusCode: 200,
    data: user,
  });
});
