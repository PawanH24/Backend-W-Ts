import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.utils";
import { Role } from "../types/enum.types";
import { verifyToken } from "../utils/jwt.utils";

export const authenticate = (roles?: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      //get access token from cookie

      const token = req.cookies["access_token"];
      // console.log(token);
      //if not access token -> throw error unauthorized
      if (!token) {
        throw new AppError(
          "Unauthorized: no token provided",
          401,
          "UNAUTHORIZED",
        );
      }
      //verify token-> jwt.verify() method ->
      const decoded_data = verifyToken(token);
      if (!decoded_data)
        throw new AppError("unauthorized, access denied", 401, "UNAUTHORIZED");
      //if not verified throw same unAuth error}
      if (roles && !roles.includes(decoded_data.role))
        throw new AppError("forbidden.access denied", 403, "FORBIDDEN");
      req.user = {
        _id: decoded_data._id,
        email: decoded_data.email,
        role: decoded_data.role,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
};
