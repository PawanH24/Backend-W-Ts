import mongoose from "mongoose";
import imageSchema from "../models/image.model";

interface TAmenities {
  name: string;
  description: string;
  icon: { path: string; public_id: string };
  user: mongoose.Types.ObjectId;
}

const amenitiesSchema = new mongoose.Schema<TAmenities>(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "amenity already exists"],
      trim: true,
    },
    // category: {
    //   type: String,
    //   enum: Object.values(AmenitiesType),
    //   required: true,
    // },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [10, "at least 10 characters required"],
    },
    icon: {
      type: imageSchema,
      default: null,
      _id: false,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user is required"],
      ref: "user",
    },
  },
  { timestamps: true },
);

const Amenities = mongoose.model<TAmenities>("Amenities", amenitiesSchema);
export default Amenities;
