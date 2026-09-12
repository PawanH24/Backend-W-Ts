import mongoose, { Document } from "mongoose";
import { PaymentStatus } from "../types/enum.types";

export type TPaymentDocument = {
  booking: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId; // denormalized ONLY for fast lookups (e.g. "all my payments")
  amount: number; // copied from booking at creation time — a receipt snapshot
  status: PaymentStatus;
  transaction_id?: string; // whatever your payment gateway returns
  paid_at?: Date;
} & Document;

const paymentSchema = new mongoose.Schema<TPaymentDocument>(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
      required: true,
      unique: true, // one payment per booking — prevents double-charging the same booking
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    transaction_id: {
      type: String,
    },
    paid_at: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Payment = mongoose.model<TPaymentDocument>("payment", paymentSchema);
export default Payment;
