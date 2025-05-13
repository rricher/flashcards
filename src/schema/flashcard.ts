import { z } from "zod";

export const deckFormSchema = z.object({
  front: z.string().min(1, "required"),
  back: z.string().min(1, "required"),
});
