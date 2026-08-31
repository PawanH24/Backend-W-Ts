import type { Request, Response } from "express";
import Amenity from "../models/amenities.model";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";
import { Role } from "../types/enum.types";
const folder = "/amenities";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const amenity = await Amenity.find({});

  sendResponse(res, {
    message: "Displaying all amenity",
    statusCode: 200,
    data: amenity,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const amenity = await Amenity.findById(id);

  if (!amenity) {
    throw new AppError("Amenity not found", 404);
  }

  sendResponse(res, {
    message: "Amenity found successfully",
    statusCode: 200,
    data: amenity,
  });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const file = req.file;

  if (!file) throw new AppError("Logo is required", 400, "VALIDATION_ERR");

  const amenity = new Amenity({ name, description });
  const { path, public_id } = await uploadFileToCloudinary(file, folder);
  amenity.icon = {
    path,
    public_id,
  };

  await amenity.save();
  sendResponse(res, {
    message: "Amenity created successfully",
    statusCode: 201,
    data: amenity,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const file = req.file;
  const user = req.user;

  const amenity = await Amenity.findOne({ _id: id }).populate("user");

  if (!amenity) throw new AppError("Amenity not found", 404, "NOT FOUND");

  //only admin and owner can update
  if (user.role !== Role.ADMIN || amenity.user._id !== user._id) {
    throw new AppError("Only admin or owner can update this resource", 400);
  }

  if (!amenity) {
    throw new AppError("Amenity not found", 404);
  }
  if (name) amenity.name = name;
  if (description) amenity.description = description;

  if (file) {
    const { path, public_id } = await uploadFileToCloudinary(file, folder);
    await deleteFileFromCloudinary(amenity.icon.public_id);
    amenity.icon = {
      path,
      public_id,
    };
  }
  await amenity.save();
  sendResponse(res, {
    message: "Amenity updated successfully",
    statusCode: 200,
    data: amenity,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  const amenity = await Amenity.findOne({ _id: id }).populate("user");

  if (!amenity) {
    throw new AppError("Amenity not found", 404, "NOT FOUND");
  }

  if (user.role !== Role.ADMIN || amenity.user._id !== user._id) {
    throw new AppError("Only admin or owner can update this resource", 400);
  }

  await deleteFileFromCloudinary(amenity.icon.public_id);
  await Amenity.deleteOne();

  //image needs to be deleted before deleing amenity itself

  sendResponse(res, {
    message: "Amenity deleted successfully",
    statusCode: 200,
    data: amenity,
  });
});
