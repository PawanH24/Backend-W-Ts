import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

//register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password, phone } = req.body;
    if (!full_name) {
      const error: any = new Error("full_name required");
      error.statusCode = 400;
      error.status = "fail";
      error.success = false;
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

    const user = new User({ full_name, email, password, phone });

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
