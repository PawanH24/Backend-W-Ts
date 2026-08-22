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

    email: z.email("Invalid email format").trim(),

    password: z.string().min(6, "Password must contain at least 6 characters"),

    phone: z.string().optional(),
  }),
});

export const changePasswordValidator = z.object({
  body: z.object({
    email: z.email().trim(),
    password: z.string(),
    new_password: z
      .string()
      .min(6, "Password must contain atleast 6 characters"),
  }),
});
