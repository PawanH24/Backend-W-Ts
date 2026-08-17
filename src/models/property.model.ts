import mongoose from "mongoose";

enum PropertyType {
  Apartment = "Apartment",
  House = "House",
  Banglow = "Banglow",
}

interface TProperty {
  host: string;
  name: string;
  description: string;
  price_type: {
    amount: number;
    rate_type: "per_hour" | "per_day" | "per_week" | "per_month";
  }[];
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
  price_type: {
    type: [
      {
        amount: { type: Number, required: true, min: 0 },
        rate_type: {
          type: String,
          required: true,
          enum: ["per_hour", "per_day", "per_week", "per_month"],
        },
      },
    ],
    required: true,
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
