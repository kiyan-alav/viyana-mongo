import { z } from "zod";
import { objectIdSchema } from "../../utils/auth";

export const createProductSchema = z.object({
  title: z.string("title is required"),
  price: z.number("price is required"),
  category: objectIdSchema,
  stock: z.number("stock is required"),
  discount: z.number().optional(),
  specifications: z.string("specifications is required"),
  details: z.string().optional(),
});

export const updateProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  category: objectIdSchema,
  stock: z.number(),
  discount: z.number().optional(),
  specifications: z.string(),
  details: z.string().optional(),
});
