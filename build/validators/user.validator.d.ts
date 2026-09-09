import * as z from "zod";
import { Role } from "../types/enum.types";
export declare const userValidator: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        user: z.ZodEnum<typeof Role>;
        phone: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=user.validator.d.ts.map