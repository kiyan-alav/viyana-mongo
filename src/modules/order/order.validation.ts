import { z } from "zod";
import { objectIdSchema } from "../../utils/auth";

export const orderDataSchema = z.object({
  items: z
    .array(
      z.object({
        product: objectIdSchema,
        quantity: z.number().min(1),
      })
    )
    .min(1, "Order must contain at least one item"),
});
