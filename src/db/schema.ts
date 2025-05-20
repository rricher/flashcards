import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: t.timestamp("createdAt").notNull().defaultNow(),
  updatedAt: t.timestamp("updatedAt").notNull().defaultNow(),
};
const id = t.uuid("id").primaryKey().defaultRandom();

export const DeckTable = pgTable(
  "decks",
  {
    id,
    name: t.text().notNull(),
    clerkUserId: t.text("clerkUserId").notNull(),
    ...timestamps,
  },
  (table) => [t.index("clerkUserIdIndex").on(table.clerkUserId)]
);

export const deckRelations = relations(DeckTable, ({ many }) => ({
  flashcards: many(FlashcardTable),
}));

export const FlashcardTable = pgTable(
  "flashcards",
  {
    id,
    front: t.text(),
    back: t.text(),
    deckId: t
      .uuid("deckId")
      .notNull()
      .references(() => DeckTable.id, { onDelete: "cascade" }),
    ...timestamps,
  },
  (table) => [t.index("deckIdIndex").on(table.deckId)]
);

export const flashcardRelations = relations(FlashcardTable, ({ one }) => ({
  deck: one(DeckTable, {
    fields: [FlashcardTable.deckId],
    references: [DeckTable.id],
  }),
}));
