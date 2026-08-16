import type { Request, Response } from "express";
import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.utils.js";
import AppError from "../utils/appError.utils.js";
import { sendResponse } from "../utils/sendResponse.utils.js";
import mongoose from "mongoose";

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) throw new AppError("user not found", 400);
  sendResponse(res, {
    message: "user found successfully",
    statusCode: 201,
    data: user,
  });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const user = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findByIdAndDelete(id);

  if (!user) throw new AppError("user not found", 400);
});
