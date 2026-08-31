import * as z from "zod";

export const bookingValidator = z.object({
  body: z.object({
    host_id: z.string(),
    user_id: z.string(),
    property_id: z.string(),
    total_price: z.number().min(1),
    payment_status: z.boolean(),
    check_in: z.string(),
    check_out: z.string(),
  }),
});
