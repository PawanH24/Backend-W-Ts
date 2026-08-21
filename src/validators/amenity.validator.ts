import * as z from "zod";
import { AmenitiesType } from "../types/enum.types";

export const amenityValidator = z.object({
  body: z.object({
    name: z.string().trim().min(3),
    category: z.enum(AmenitiesType),
    icon: z.string().trim(),
  }),
});
