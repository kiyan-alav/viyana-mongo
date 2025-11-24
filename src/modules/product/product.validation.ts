import { z } from "zod";
import { objectIdSchema } from "../../utils/auth";

export const createProductSchema = z.object({
  title: z.string("title is required"),
  price: z.string("price is required"),
  category: objectIdSchema,
  stock: z.string("stock is required"),
  discount: z.string().optional(),
  specifications: z.string("specifications is required"),
  details: z.string().optional(),
});

export const updateProductSchema = z.object({
  title: z.string().optional(),
  price: z.string().optional(),
  category: objectIdSchema.optional(),
  stock: z.string().optional(),
  discount: z.string().optional(),
  specifications: z.string().optional(),
  details: z.string().optional(),
});
