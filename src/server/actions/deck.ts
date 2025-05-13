"use server";

import { db } from "@/db/db";
import { DeckTable } from "@/db/schema";
import { deckFormSchema } from "@/schema/deck";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import "use-server";
import { z } from "zod";

export async function createDeck(
  unsafeData: z.infer<typeof deckFormSchema>
): Promise<{ error: boolean } | undefined> {
  const { userId } = await auth();
  const { success, data } = deckFormSchema.safeParse(unsafeData);
  if (!success || userId == null) {
    return { error: true };
  }

  await db.insert(DeckTable).values({ ...data, clerkUserId: userId });

  redirect("/decks");
}
