import * as z from "zod";

export const loginValidator = z.object({
  //body
  body: z.object({
    email: z.email(),
    password: z.string(),
    //   .min(6, "password must contain at least 6 characters")
    //   .regex(/[A-Z]/, "password must contain atleast 1 uppercase"),
  }),
  //params
  //query
});

export const registerValidator = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name cannot exceed 50 characters")
      .trim(),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .trim(),

    password: z.string().min(6, "Password must contain at least 6 characters"),

    phone: z.string().optional(),
  }),
});
