import { z } from "zod";

export const deckFormSchema = z.object({
  name: z.string().min(1, "Required"),
});
