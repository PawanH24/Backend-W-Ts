import mongoose from "mongoose";

interface TBooking {
  user: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  host: mongoose.Types.ObjectId;
  check_in: Date;
  check_out: Date;
  total_price: number;
  payment_status: boolean;
}

const bookingSchema = new mongoose.Schema<TBooking>(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    property: {
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
      type: Date,
      required: true,
    },
    check_out: {
      type: Date,
      required: true,
    },
    //add its own id for ease of searching
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model<TBooking>("booking", bookingSchema);
export default Booking;
