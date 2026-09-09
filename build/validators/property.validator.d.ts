import * as z from "zod";
import { PriceType, PropertyType } from "../types/enum.types";
export declare const propertyValidator: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        amount: z.ZodCoercedNumber<unknown>;
        price_type: z.ZodEnum<typeof PriceType>;
        property_type: z.ZodEnum<typeof PropertyType>;
        address: z.ZodObject<{
            country: z.ZodString;
            city: z.ZodString;
            street_name: z.ZodString;
            zipcode: z.ZodString;
        }, z.core.$strip>;
        rooms: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const propertyUpdateValidator: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        amount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        price_type: z.ZodOptional<z.ZodEnum<typeof PriceType>>;
        property_type: z.ZodOptional<z.ZodEnum<typeof PropertyType>>;
        rooms: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        address: z.ZodOptional<z.ZodObject<{
            country: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            street_name: z.ZodOptional<z.ZodString>;
            zipcode: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=property.validator.d.ts.map