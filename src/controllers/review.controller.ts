import type { Request, Response } from "express";
import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";
import { Role } from "../types/enum.types.js";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const { property_id } = req.query;
  const filter: any = {};
  if (property_id) filter.property = property_id;

  const reviews = await Review.find(filter)
    .populate("user", "fullName profile_image")
    .populate("property", "name address");

  sendResponse(res, {
    message: "Displaying all reviews",
    statusCode: 200,
    data: reviews,
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const review = await Review.findById(id)
    .populate("user", "fullName profile_image")
    .populate("property", "name address");

  if (!review) throw new AppError("Review not found", 404);

  sendResponse(res, {
    message: "Review found successfully",
    statusCode: 200,
    data: review,
  });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const { property_id, booking_id, rating, comment } = req.body;
  const user_id = req.user._id;

  const booking = await Booking.findOne({
    _id: booking_id,
    user: user_id,
    property: property_id,
  });
  if (!booking) throw new AppError("Booking not found for this property", 404);

  if (new Date(booking.check_out) > new Date())
    throw new AppError("You can only review after your stay is complete", 400);

  const existingReview = await Review.findOne({ booking: booking_id });
  if (existingReview)
    throw new AppError("You have already reviewed this booking", 409);

  const review = await Review.create({
    property: property_id,
    user: user_id,
    booking: booking_id,
    rating,
    comment,
  });

  await review.populate("user", "fullName profile_image");

  sendResponse(res, {
    message: "Review created successfully",
    statusCode: 201,
    data: review,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user_id = req.user._id;
  const { rating, comment } = req.body;

  const review = await Review.findById(id);
  if (!review) throw new AppError("Review not found", 404);

  if (review.user.toString() !== user_id.toString())
    throw new AppError("Only the review author can edit this review", 403);

  if (rating) review.rating = rating;
  if (comment !== undefined) review.comment = comment;

  await review.save();

  sendResponse(res, {
    message: "Review updated successfully",
    statusCode: 200,
    data: review,
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;

  const review = await Review.findById(id);
  if (!review) throw new AppError("Review not found", 404);

  if (
    user.role !== Role.ADMIN &&
    review.user.toString() !== user._id.toString()
  )
    throw new AppError(
      "Only admin or the review author can delete this review",
      403,
    );

  await review.deleteOne();

  sendResponse(res, {
    message: "Review deleted successfully",
    statusCode: 200,
    data: review,
  });
});
