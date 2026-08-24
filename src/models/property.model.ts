import mongoose from "mongoose";
import { PropertyType, PriceType } from "../types/enum.types";

interface TProperty extends Document {
  host: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price_type: PriceType;
  amount: number;
  address: {
    country: string;
    city: string;
    street_name: string;
    zipcode: string;
  };
  rooms: number;
  property_type: PropertyType;
  main_image: mongoose.Types.ObjectId;
  gallery_images: mongoose.Types.ObjectId[];
}

const propertySchema = new mongoose.Schema<TProperty>({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price_type: {
    type: String,
    required: true,
    enum: Object.values(PriceType),
    default: PriceType.PER_DAY,
  },

  address: {
    type: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street_name: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    required: true,
  },
  rooms: {
    type: Number,
  },
  property_type: {
    type: String,
    required: true,
    enum: Object.values(PropertyType),
  },
  main_image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Image",
  },
  gallery_images: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Image",
  },
});

const Property = mongoose.model<TProperty>("property", propertySchema);
export default Property;
