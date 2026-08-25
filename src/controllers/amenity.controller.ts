import type { Request, Response } from "express";
import Amenity from "../models/amenities.model";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const amenity = await Amenity.find({}).populate("icon");

  sendResponse(res, {
    message: "Displaying all amenity",
    statusCode: 200,
    data: amenity,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const amenity = await Amenity.findById(id).populate("icon");

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
  const data = req.body;

  const amenity = await Amenity.create(data);

  sendResponse(res, {
    message: "Amenity created successfully",
    statusCode: 201,
    data: amenity,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const amenity = await Amenity.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  if (!amenity) {
    throw new AppError("Amenity not found", 404);
  }

  sendResponse(res, {
    message: "Amenity updated successfully",
    statusCode: 200,
    data: amenity,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const amenity = await Amenity.findByIdAndDelete(id);

  if (!amenity) {
    throw new AppError("Amenity not found", 404);
  }

  sendResponse(res, {
    message: "Amenity deleted successfully",
    statusCode: 200,
    data: amenity,
  });
});
