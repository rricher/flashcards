import { z } from "zod";

export const flashcardFormSchema = z.object({
  front: z.string().min(1, "required"),
  back: z.string().min(1, "required"),
});
