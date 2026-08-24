import type { Request, Response } from "express";
import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";
import { Role } from "../types/enum.types.js";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const filter: any = {};
  const { role = Role.USER } = req.query;
  if (role) {
    filter.role = role;
  }
  const users = await User.find(filter)
    .select("-password")
    .populate("profile_image");
  sendResponse(res, {
    message: "Displaying all users",
    statusCode: 200,
    data: users,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findById(id)
    .select("-password")
    .populate("profile_iamge");
  if (!user) throw new AppError("user not found", 404);
  sendResponse(res, {
    message: "user found successfully",
    statusCode: 200,
    data: user,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const user = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!user) throw new AppError("User not found", 400);
  sendResponse(res, {
    message: `${user.role} updated successfully`,
    statusCode: 201,
    data: user,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);

  if (!user) throw new AppError("user not found", 400);
  sendResponse(res, {
    message: "User deleted successsfully",
    statusCode: 200,
    data: user,
  });
});
