import * as z from "zod";

export const reviewValidator = z.object({
  body: z.object({
    comment: z.string().trim().min(3),
    rating: z.number(),
    user_name: z.string().trim(),
  }),
});
