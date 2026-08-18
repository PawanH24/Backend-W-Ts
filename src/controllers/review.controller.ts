import type { Request, Response } from "express";
import Review from "../models/review.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const reviews = await Review.find({});

  sendResponse(res, {
    message: "Displaying all reviews",
    statusCode: 200,
    data: reviews,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const review = await Review.findById(id);

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  sendResponse(res, {
    message: "Review found successfully",
    statusCode: 200,
    data: review,
  });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const review = await Review.create(data);

  sendResponse(res, {
    message: "Review created successfully",
    statusCode: 201,
    data: review,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const review = await Review.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  sendResponse(res, {
    message: "Review updated successfully",
    statusCode: 200,
    data: review,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const review = await Review.findByIdAndDelete(id);

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  sendResponse(res, {
    message: "Review deleted successfully",
    statusCode: 200,
    data: review,
  });
});
