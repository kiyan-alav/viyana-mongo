import { z } from "zod";
import { objectIdSchema } from "../../utils/auth";

export const commentDataSchema = z.object({
  rate: z.number().optional(),
  commentBody: z.string("commentBody is required"),
  email: z.string("email is required"),
  product: objectIdSchema,
});
