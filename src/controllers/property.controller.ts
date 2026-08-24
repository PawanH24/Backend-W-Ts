import type { Request, Response } from "express";
import Property from "../models/property.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const property = await Property.find({})
    .populate("main_image")
    .populate("gallery_image");

  sendResponse(res, {
    message: "Displaying all reviews",
    statusCode: 200,
    data: property,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const property = await Property.findById(id)
    .populate("main_image")
    .populate("gallery_image");

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  sendResponse(res, {
    message: "Property found successfully",
    statusCode: 200,
    data: property,
  });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const property = await Property.create(data);

  sendResponse(res, {
    message: "Property created successfully",
    statusCode: 201,
    data: property,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const property = await Property.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  sendResponse(res, {
    message: "Property updated successfully",
    statusCode: 200,
    data: property,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const property = await Property.findByIdAndDelete(id);

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  sendResponse(res, {
    message: "Property deleted successfully",
    statusCode: 200,
    data: property,
  });
});
