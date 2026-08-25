import * as z from "zod";
import mongoose from "mongoose";

export const amenityValidator = z.object({
  body: z.object({
    name: z.string().trim().min(3),
    description: z.string().min(10),

    user: z
      .string()
      .refine(
        (value) => mongoose.Types.ObjectId.isValid(value),
        "Invalid user id",
      ),
  }),
});
