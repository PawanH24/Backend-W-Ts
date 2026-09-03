import mongoose from "mongoose";

interface TBooking {
  user_id: mongoose.Types.ObjectId;
  property_id: mongoose.Types.ObjectId;
  host_id: mongoose.Types.ObjectId;
  check_in: string;
  check_out: string;
  total_price: number;
  payment_status: boolean;
}

const bookingSchema = new mongoose.Schema<TBooking>(
  {
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
      required: true,
    },

    total_price: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    check_in: {
      type: String,
      required: true,
    },
    check_out: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model<TBooking>("booking", bookingSchema);
export default Booking;
