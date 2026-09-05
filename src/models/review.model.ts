import mongoose, { Document } from "mongoose";

export type TReviewDocument = {
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
} & Document;

const reviewSchema = new mongoose.Schema<TReviewDocument>(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
      required: [true, "property is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
      required: [true, "booking is required"],
      unique: [true, "this booking has already been reviewed"],
    },
    rating: {
      type: Number,
      required: [true, "rating is required"],
      min: [1, "rating must be at least 1"],
      max: [5, "rating cannot exceed 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxLength: [500, "comment cannot exceed 500 characters"],
    },
  },
  { timestamps: true },
);

const Review = mongoose.model<TReviewDocument>("review", reviewSchema);
export default Review;
