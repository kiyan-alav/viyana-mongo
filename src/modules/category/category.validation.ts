import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string("category name is required"),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
});
