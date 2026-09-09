import * as z from "zod";
export declare const reviewValidator: z.ZodObject<{
    body: z.ZodObject<{
        booking_id: z.ZodString;
        property_id: z.ZodString;
        comment: z.ZodString;
        rating: z.ZodNumber;
        user_name: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const reviewUpdateValidator: z.ZodObject<{
    body: z.ZodObject<{
        booking_id: z.ZodOptional<z.ZodString>;
        property_id: z.ZodOptional<z.ZodString>;
        comment: z.ZodOptional<z.ZodString>;
        rating: z.ZodOptional<z.ZodNumber>;
        user_name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=review.validator.d.ts.map