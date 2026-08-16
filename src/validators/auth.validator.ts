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
