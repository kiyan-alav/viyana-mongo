import { z } from "zod";

export const createMessageSchema = z.object({
  sender: z.string().optional(),
  email: z.email("email is required"),
  title: z.string("title is required"),
  text: z.string("text is required"),
});
