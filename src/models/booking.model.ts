import mongoose from "mongoose";

interface TBooking {
  user_id: string;
  property_id: string;
  host_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  payment_status: boolean;
}

const bookingSchema = new mongoose.Schema<TBooking>({
  host_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    trim: true,
  },

  property_id: {
    type: String,
    required: true,
  },

  total_price: {
    type: Number,
  },
  payment_status: {
    type: Boolean,
  },
  check_in: {
    type: String,
  },
  check_out: {
    type: String,
  },
});

const Booking = mongoose.model<TBooking>("booking", bookingSchema);
export default Booking;
