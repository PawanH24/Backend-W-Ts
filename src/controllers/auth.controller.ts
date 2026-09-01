import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";
import { hashPassword } from "../utils/bcrypt.utils";
import bcrypt from "bcryptjs";
import { sendResponse } from "../utils/sendResponse.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { generateJwtToken } from "../utils/jwt.utils";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../utils/cloudinary.utils";
import ENV_CONFIG from "../config/env.config";
import { Role } from "../types/enum.types";

const folder = "/profile-images";

//register
export const register = catchAsync(async (req, res) => {
  const { fullName, email, password, phone, host = false } = req.body;
  const file = req.file;
  // if (!fullName) {
  //   //   const error: any = new Error("full_name required");
  //   //   error.statusCode = 400;
  //   //   error.status = "fail";
  //   //   error.success = false;
  //   throw new AppError("full_name is required", 400);
  // }
  // if (!email) throw new AppError("email is required", 400);

  // if (!password) throw new AppError("password is required", 400);
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new AppError("User already exists with this email", 409);

  const hashedPassword = await hashPassword(password);
  //user instance
  const user = new User({ fullName, email, password: hashedPassword, phone });

  if (host) {
    user.role = Role.HOST;
  }

  //upload profile image
  if (file) {
    // user.profile_image = file.path;
    //upload file to cloudinary
    const { path, public_id } = await uploadFileToCloudinary(file, folder);
    user.profile_image = {
      path,
      public_id,
    };
  }

  await user.save();

  const { password: _, ...userWithoutPassword } = user.toObject();

  sendResponse(res, {
    message: "registered succesfully",
    statusCode: 201,
    data: userWithoutPassword,
  });
});

//login

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email) throw new AppError("email is required", 400);
    if (!password) throw new AppError("password is required", 400);

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new AppError("Invalid email or password", 401);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Wrong password", 401);
    }

    //jws token
    const access_token = generateJwtToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });

    //cookie
    res.cookie("access_token", access_token, {
      httpOnly: ENV_CONFIG.NODE_ENV === "development" ? false : true,
      secure: ENV_CONFIG.NODE_ENV === "development" ? false : true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: ENV_CONFIG.NODE_ENV === "development" ? "lax" : "strict",
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    // 3. If password is correct, send success
    // response
    sendResponse(res, {
      message: "Logged in successfully",
      statusCode: 200,
      data: {
        user: userWithoutPassword, //access_token
      },
    });
  },
);
//get profile
export const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.user;
    const profile = await User.findOne({ _id });

    if (!profile) throw new AppError("something went wrong", 500);

    sendResponse(res, {
      message: "profile fetched",
      data: profile,
      statusCode: 200,
    });
  },
);

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const file = req.file;
  const { fullName, phone } = req.body;

  const profile = await User.findOne({ _id: user._id });

  if (!profile) throw new AppError("Profile not found", 404, "NOT FOUND");

  if (fullName) profile.fullName = fullName;

  if (phone) profile.phone = phone;
  if (file) {
    const { path, public_id } = await uploadFileToCloudinary(file, folder);
    await deleteFileFromCloudinary(profile.profile_image.public_id);
    profile.profile_image = {
      path,
      public_id,
    };
  }
  await profile.save();
  sendResponse(res, {
    message: "Profile updated successfully",
    statusCode: 200,
    data: profile,
  });
});

// change password
export const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, new_password } = req.body;

    if (!email) throw new AppError("email is required", 400);
    if (!password) throw new AppError("password is required", 400);
    if (!new_password) throw new AppError("new password is required", 400);
    if (password === new_password)
      throw new AppError(
        "New password must be different from current password",
        400,
      );

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) throw new AppError("User not found", 404);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new AppError("Password incorrect", 401);
    user.password = await hashPassword(new_password);
    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();
    sendResponse(res, {
      message: "Changed Password successfully",
      statusCode: 200,
      data: userWithoutPassword,
    });
    // res.status(201).json({
    //   message: "New password added",
    //   data: rest,
    //   success: true,
    //   status: "success",
    // });
  },
);
//forgot password

//logout
export const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: ENV_CONFIG.NODE_ENV === "development" ? false : true,
    secure: ENV_CONFIG.NODE_ENV === "development" ? false : true,
    sameSite: ENV_CONFIG.NODE_ENV === "development" ? "lax" : "strict",
  });

  sendResponse(res, {
    message: "Logged out successfully",
    statusCode: 200,
  });
});
