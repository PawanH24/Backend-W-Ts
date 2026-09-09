import * as z from "zod";
export declare const loginValidator: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodEmail;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const registerValidator: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodString;
        email: z.ZodEmail;
        password: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        host: z.ZodOptional<z.ZodPipe<z.ZodEnum<{
            false: "false";
            true: "true";
        }>, z.ZodTransform<boolean, "false" | "true">>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const verifyForgotPasswordValidator: z.ZodObject<{
    body: z.ZodObject<{
        otp: z.ZodString;
        email: z.ZodString;
        new_password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const requestForgotPasswordOtpValidator: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=auth.validator.d.ts.map