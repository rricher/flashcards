"use server";

import { db } from "@/db/db";
import { FlashcardTable } from "@/db/schema";
import { flashcardFormSchema } from "@/schema/flashcard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createFlashcard(
  deckId: string,
  unsafeData: z.infer<typeof flashcardFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { userId } = await auth();
  const { success, data } = flashcardFormSchema.safeParse(unsafeData);
  if (!success || userId == null) {
    return { error: true };
  }

  await db.insert(FlashcardTable).values({ deckId: deckId, ...data });

  redirect(`/decks/${deckId}`);
}
