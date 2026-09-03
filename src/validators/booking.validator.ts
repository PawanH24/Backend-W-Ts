import * as z from "zod";

export const bookingValidator = z.object({
  body: z
    .object({
      property_id: z.string(),
      check_in: z.coerce.date(),
      check_out: z.coerce.date(),
      payment_status: z.boolean().optional(),
    })
    .refine((data) => data.check_out > data.check_in, {
      message: "Checkout data must be after check-in date",
      path: ["check_out"],
    }),
});
