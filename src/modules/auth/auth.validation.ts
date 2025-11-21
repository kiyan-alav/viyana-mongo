import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string("first name is required"),
    lastName: z.string("last name is required"),
    mobile: z
      .string("mobile is required")
      .regex(/^(\+?98|0)9\d{9}$/, "Invalid mobile number"),
    email: z.email("email is required"),
    password: z
      .string("password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm: z
      .string("confirm password is required")
      .min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  identifier: z.string("identifier is required"),
  password: z.string("password is required"),
});
