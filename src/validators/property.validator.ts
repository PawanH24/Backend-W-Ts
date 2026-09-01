import * as z from "zod";
import { PriceType, PropertyType } from "../types/enum.types";

const propertyValidator = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    amount: z.coerce
      .number("Amount is required")
      .positive("Amount must be a positive number"),
    price_type: z.enum(PriceType, {
      message:
        "Price type must be one of: per_hour, per_day, per_week, per_month",
    }),
    property_type: z.enum(PropertyType, {
      message: "Invalid property type selection",
    }),
    address: z.object({
      country: z.string().trim().min(1, "Country is required"),
      city: z.string().trim().min(1, "City is required"),
      street_name: z.string().trim().min(1, "Street name is required"),
      zipcode: z.string().trim().min(1, "Zipcode is required"),
    }),
    rooms: z.coerce.number(),
  }),
});

export default propertyValidator;
