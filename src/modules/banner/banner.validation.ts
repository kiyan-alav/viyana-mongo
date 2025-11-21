import { z } from "zod";

export const createBannerSchema = z.object({
  link: z
    .string("banner link is required")
    .regex(/^(https?:\/\/)([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/, "invalid url"),
  type: z.enum(["SQUARE", "RECTANGLE"], "must be SQUARE/RECTANGLE"),
});

export const updateBannerSchema = z.object({
  link: z
    .string()
    .regex(/^(https?:\/\/)([\w\-]+\.)+[\w\-]{2,}(\/[^\s]*)?$/, "invalid url")
    .optional(),
  type: z.enum(["SQUARE", "RECTANGLE"]).optional(),
});
