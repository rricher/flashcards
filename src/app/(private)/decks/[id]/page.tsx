import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { CreditCard, Plus } from "lucide-react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) return redirectToSignIn();
  const { id: deckIdParam } = await params
  const flashcards = await db.query.FlashcardTable.findMany({
    where: ({ deckId }, { eq }) => eq(deckId, deckIdParam),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  })
  console.log(deckIdParam);

  return (
    <>
      <div className="flex gap-4 items-baseline">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">Decks</h1>
        <Button asChild>
          <Link href={`/decks/${deckIdParam}/new`}>
            <Plus className="mr-4 size-6" />New flashcard
          </Link>
        </Button>
      </div>
      {flashcards.length > 0 ? (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
          {flashcards.map((card) => (
            <div key={card.id}>
              <div className="grid-flow-row">
                <h2 className="text-lg font-semibold">{card.front}</h2>
              </div>
              <div className="grid-flow-row">
                <h2 className="text-lg font-semibold">{card.back}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CreditCard className="size-16 mc-auto" />
          <p className="text-lg text-center">You don&apos;t have any flash cards yet.</p>
          <Button size="lg" className="text-lg" asChild>
            <Link href={`/decks/${deckIdParam}/new`}>
              <Plus className="mr-4 size-6" />New flashcard
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}
