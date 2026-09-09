import * as z from "zod";
export declare const bookingValidator: z.ZodObject<{
    body: z.ZodObject<{
        property_id: z.ZodString;
        check_in: z.ZodCoercedDate<unknown>;
        check_out: z.ZodCoercedDate<unknown>;
        payment_status: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const bookingUpdateValidator: z.ZodObject<{
    body: z.ZodObject<{
        check_in: z.ZodCoercedDate<unknown>;
        check_out: z.ZodCoercedDate<unknown>;
        payment_status: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=booking.validator.d.ts.map