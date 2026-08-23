import * as z from "zod";
import { Role } from "../types/enum.types";

export const userValidator = z.object({
  body: z.object({
    fullName: z.string().trim().min(3),
    email: z.email().trim(),
    password: z.string().trim(),
    user: z.enum(Role, {
      message: "Invalid property type selection",
    }),
    phone: z.string().trim(),
  }),
});
