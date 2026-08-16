import mongoose from "mongoose";

interface TReview {
  booking_id: string;
  user_id: string;
  property_id: string;
  host_id: String;
  comment: string;
  rating: number;
  user_name: string;
}

const reviewSchema = new mongoose.Schema<TReview>({
  booking_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    trim: true,
  },
  comment: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
  },
  property_id: {
    type: String,
    required: true,
  },
  host_id: {
    typeS: String,
    required: true,
  },
  user_name: {
    type: String,
  },
});

const Review = mongoose.model<TReview>("review", reviewSchema);
export default Review;
