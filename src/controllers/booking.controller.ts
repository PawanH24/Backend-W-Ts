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
  const { property_id, check_in, check_out } = req.body;
  const user_id = req.user._id;

  const property = await Property.findById(property_id);
  if (!property)
    throw new AppError("property you are trying to book does not exist", 404);

  if (property.host.equals(user_id))
    throw new AppError("You cannot book your own property", 400);

  let time = 0;
  if (property.price_type === "per_day") {
    time = Math.max(
      1,
      Math.round((check_out - check_in) / (1000 * 60 * 60 * 24)),
    );
  } else if (property.price_type === "per_hour") {
    time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60)));
  } else if (property.price_type === "per_week") {
    time = Math.max(
      1,
      Math.round((check_out - check_in) / (1000 * 60 * 60 * 24 * 7)),
    );
  } else if (property.price_type === "per_month") {
    time = Math.max(
      1,
      Math.round((check_out - check_in) / (1000 * 60 * 60 * 24 * 30)),
    );
  }

  const booking = await Booking.create({
    user: user_id,
    host: property.host,
    property: property_id,
    check_in,
    check_out,
    total_price: property.amount * time,
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
  const { check_in, check_out } = req.body;

  const booking = await Booking.findById(id).populate("property");
  if (!booking) throw new AppError("Booking not found", 404);
  if (!booking.property)
    throw new AppError("Property information missing", 404);

  const property = booking.property as any;
  let time = 0;
  if (property.price_type === "per_day") {
    time = Math.max(
      1,
      Math.round((check_out - check_in) / (1000 * 60 * 60 * 24)),
    );
  } else if (property.price_type === "per_hour") {
    time = Math.max(1, Math.round((check_out - check_in) / (1000 * 60 * 60)));
  } else if (property.price_type === "per_week") {
    time = Math.max(
      1,
      Math.round((check_out - check_in) / (1000 * 60 * 60 * 24 * 7)),
    );
  } else if (property.price_type === "per_month") {
    time = Math.max(
      1,
      Math.round((check_out - check_in) / (1000 * 60 * 60 * 24 * 30)),
    );
  }

  booking.check_in = check_in;
  booking.check_out = check_out;
  booking.total_price = property.amount * time;
  await booking.save();

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
