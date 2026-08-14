import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { hashPassword } from "../utils/bcrypt.utils";
import bcrypt from "bcryptjs";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";

//register
export const register = catchAsync(async (req, res) => {
  const { fullName, email, password, phone } = req.body;
  if (!fullName) {
    //   const error: any = new Error("full_name required");
    //   error.statusCode = 400;
    //   error.status = "fail";
    //   error.success = false;
    throw new AppError("full_name is required", 400);
  }
  if (!email) {
    const error: any = new Error("email required");
    error.statusCode = 400;
    error.status = "fail";
    error.success = false;
  }
  if (!password) {
    const error: any = new Error("email required");
    error.statusCode = 400;
    error.status = "fail";
    error.success = false;
  }

  //user instance
  const user = new User({ fullName, email, password, phone });

  //hash password
  const hash = await hashPassword(password);
  user.password = hash;
  //upload profile image
  //save user
  await user.save();
  //success response
  const { password: _, ...rest } = user.toObject();
  sendResponse(res, {
    message: "registered succesfully",
    statusCode: 201,
    data: rest,
  });
});

//login

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new AppError("email is required", 400);
    if (!password) throw new AppError("password is required", 400);

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) throw new AppError("user not found", 500);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Wrong password", 400);
    }

    // 3. If password is correct, send success
    // response
    res.status(200).json({ message: "Logged In" });
  } catch (error) {
    next(error);
  }
};
//get profile
// change password
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, new_password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      throw new AppError("User not found", 400);
    }
    if (!email) throw new AppError("email is required", 400);
    if (!password) throw new AppError("password is required", 400);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      user.password = await hashPassword(new_password);
    }
    await user.save();
    const { password: _, ...rest } = user.toObject();
    sendResponse(res, {
      message: "Changed Password successfully",
      statusCode: 201,
      data: rest,
    });
    // res.status(201).json({
    //   message: "New password added",
    //   data: rest,
    //   success: true,
    //   status: "success",
    // });
  } catch (error) {
    next(error);
  }
};
//forgot password
