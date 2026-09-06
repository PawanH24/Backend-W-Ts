import mongoose, { BooleanExpression, model } from "mongoose";
import { OtpAction } from "../types/enum.types";

interface TOtpDocument {
  user: mongoose.Types.ObjectId;
  otp: string;
  action: string;
  active: boolean;
  expiresAt: Date;
}

const otpSchema = new mongoose.Schema<TOtpDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    otp: {
      type: String,
      required: true,
      select: false,
    },
    action: {
      type: String,
      enum: Object.values(OtpAction),
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Otp = mongoose.model<TOtpDocument>("otp", otpSchema);
export default Otp;
