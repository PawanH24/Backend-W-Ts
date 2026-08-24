import * as z from "zod";

export const amenityValidator = z.object({
  body: z.object({
    name: z.string().trim().min(3),
    description: z.string().min(10),
    icon: z.string().trim(),
  }),
});
