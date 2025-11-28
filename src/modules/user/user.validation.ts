import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm) {
      ctx.addIssue({
        code: "custom",
        path: ["confirm"],
        message: "Passwords do not match",
      });
    }

    if (data.password === data.currentPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["password"],
        message: "New password must be different from current password",
      });
    }
  });

export const changeUserInfoSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),

  mobile: z
    .string()
    .regex(/^(\+?98|0)9\d{9}$/, "Invalid mobile number")
    .optional(),

  email: z.email("Invalid email format").optional(),
});
