'use client';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { deckFormSchema } from "@/schema/deck";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { createDeck } from "@/server/actions/deck";

export function DeckForm() {

  const form = useForm<z.infer<typeof deckFormSchema>>({
    resolver: zodResolver(deckFormSchema),
    defaultValues: {
      name: "",
    }
  });

  async function onSubmit(values: z.infer<typeof deckFormSchema>) {
    const data = await createDeck(values);
    if (data?.error) {
      form.setError("root", {
        message: "An error occurred. Please try again.",
      })
    }
  }
  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6 flex-col">
      {form.formState.errors.root && (
        <div className="text-destructive text-sm">
          {form.formState.errors.root.message}
        </div>
      )}
      <FormField control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Deck Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              The name of the flashcard deck.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-2 justify-end">
        <Button type="button" asChild variant="outline">
          <Link href="/decks">Cancel</Link>
        </Button>
        <Button type="submit">
          Save
        </Button>
      </div>
    </form>
  </Form>
}
