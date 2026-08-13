import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import AppError from "../utils/appError.utils";

//register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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

    const user = new User({ fullName, email, password, phone });

    //hash password

    //upload profile image

    await user.save();

    res.status(201).json({
      message: "account created",
      data: user,
      success: true,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
//login
//get profile
// change password
//forgot password
