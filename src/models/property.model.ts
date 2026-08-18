import mongoose from "mongoose";
import { PropertyType, PriceType } from "../types/enum.types";

interface TProperty {
  host: string;
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
  rooms: string;
  property_type: PropertyType;
}

const propertySchema = new mongoose.Schema<TProperty>({
  host: {
    type: String,
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
    type: String,
  },
  property_type: {
    type: String,
    required: true,
    enum: Object.values(PropertyType),
  },
});

const Property = mongoose.model<TProperty>("property", propertySchema);
export default Property;
