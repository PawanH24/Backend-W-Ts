import type { Request, Response } from "express";
import Booking from "../models/booking.model";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import { Role } from "../types/enum.types";
import Property from "../models/property.model";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const filter: any = {};

  if (user.role === Role.USER) filter.user = user._id;
  else if (user.role === Role.HOST) filter.host = user._id;

  const bookings = await Booking.find(filter)
    .populate("property", "name address main_image")
    .populate("host", "fullName email phone profile_image")
    .populate("user", "fullName email phone profile_image");

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
  const { property_id, total_price, check_in, check_out } = req.body;
  const user_id = req.user._id;

  const property = await Property.findById(property_id);
  if (!property)
    throw new AppError("property you are trying to book does not exist", 404);

  if (property.host.equals(user_id))
    throw new AppError("You cannot book your own property", 400);
  const booking = await Booking.create({
    user: user_id,
    host: property.host,
    property: property_id,
    check_in: new Date(check_in),
    check_out: new Date(check_out),
    total_price,
    payment_status: false,
  });

  await booking.populate("user", "fullName email phone profile_image");
  await booking.populate("host", "fullName email phone profile_image");
  await booking.populate("property", "name address main_image");

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
