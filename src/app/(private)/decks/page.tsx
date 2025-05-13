import { Button } from "@/components/ui/button";
import { db } from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { CreditCard, Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const { userId, redirectToSignIn } = await auth();

  if (userId == null) return redirectToSignIn();

  const decks = await db.query.DeckTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ updatedAt }, { desc }) => desc(updatedAt),
  })

  return (
    <>
      <div className="flex gap-4 items-baseline">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6">Decks</h1>
        <Button asChild>
          <Link href="/decks/new">
            <Plus className="mr-4 size-6" />New Deck
          </Link>
        </Button>
      </div>
      {decks.length > 0 ? (
        <div className="grid gap-4 grid-cols-[repeate(auto-fill,minmax(400px,1fr))]">
          {decks.map((deck) => (
            <DeckCard key={deck.id}>
              <Link key={deck.id} href={`/decks/${deck.id}`}>
                <a className="p-4 bg-card rounded-md shadow-md flex gap-4 items-center">
                  <CreditCard className="size-16" />
                  <div>
                    <h2 className="text-lg font-semibold">{deck.name}</h2>
                    <p className="text-sm text-neutral-500">Created {new Date(deck.createdAt).toLocaleDateString()}</p>
                  </div>
                </a>
              </Link>
            </DeckCard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CreditCard className="size-16 mc-auto" />
          <p className="text-lg text-center">You don&apos;t have any decks yet.</p>
          <Button size="lg" className="text-lg" asChild>
            <Link href="/decks/new">
              <Plus className="mr-4 size-6" />New Deck
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}

type DeckCardProps = {
  id: string
  name: string
  clerkUserId: string
}

function DeckCard({ id, name, clerkUserId }: DeckCardProps) {
  return (
    <div className="bg-card rounded-md shadow-md">
      {deck}
    </div>
  );
}
