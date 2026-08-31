import mongoose from "mongoose";
import { Role } from "../types/enum.types";
import jwt from "jsonwebtoken";
import ENV_CONFIG from "../config/env.config";

// generate token
export type TJwtPayload = {
  _id: mongoose.Types.ObjectId;
  role: Role;
  email: string;
};

type TJwtReturn = TJwtPayload & { iat: number; exp: number };

export const generateJwtToken = (payload: TJwtPayload) => {
  return jwt.sign(payload, ENV_CONFIG.JWT_SECRET, {
    expiresIn: ENV_CONFIG.JWT_EXPIRES_IN as any,
  });
};

// verify token
export const verifyToken = (token: string): TJwtReturn => {
  try {
    return jwt.verify(token, ENV_CONFIG.JWT_SECRET) as TJwtReturn;
  } catch (error) {
    throw error;
  }
};
