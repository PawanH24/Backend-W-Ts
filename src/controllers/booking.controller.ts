import type { Request, Response } from "express";
import Booking from "../models/booking.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const bookings = await Booking.find({});

  sendResponse(res, {
    message: "Displaying all bookings",
    statusCode: 200,
    data: bookings,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const booking = await Booking.findById(id);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  sendResponse(res, {
    message: "Booking found successfully",
    statusCode: 200,
    data: booking,
  });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const booking = await Booking.create(data);

  sendResponse(res, {
    message: "Booking created successfully",
    statusCode: 201,
    data: booking,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const booking = await Booking.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  sendResponse(res, {
    message: "Booking updated successfully",
    statusCode: 200,
    data: booking,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const booking = await Booking.findByIdAndDelete(id);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  sendResponse(res, {
    message: "Booking deleted successfully",
    statusCode: 200,
    data: booking,
  });
});
