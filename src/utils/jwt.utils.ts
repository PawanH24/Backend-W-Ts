import mongoose from "mongoose";
import { Role } from "../types/enum.types";
import jwt from "jsonwebtoken";

// generate token
type TJwtPayload = {
  _id: mongoose.Types.ObjectId;
  role: Role;
  email: string;
};

export const generateJwtToken = (payload: TJwtPayload) => {
  return jwt.sign(payload, "iergerbif}oiakpbe@34411(*%$", {
    expiresIn: "7d",
  });
};

// verify token
