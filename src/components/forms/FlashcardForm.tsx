'use client';
import { flashcardFormSchema } from "@/schema/flashcard"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createFlashcard } from "@/server/actions/flashcard";

export function FlashcardForm() {
  const params = useParams<{ id: string }>()
  // console.log(params);
  const form = useForm<z.infer<typeof flashcardFormSchema>>({
    resolver: zodResolver(flashcardFormSchema),
    defaultValues: {
      front: "",
      back: ""
    }
  })

  async function onSubmit(values: z.infer<typeof flashcardFormSchema>) {
    const data = await createFlashcard(params.id, values);
    if (data?.error) {
      form.setError("root", {
        message: "An error occurred. Please try again.",
      })
    }
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}
      className="flex gap-6 flex-col">
      <FormField
        control={form.control}
        name="front"
        render={({ field }) => (
          <FormItem>
            <FormLabel>front</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormDescription>The front of the flashcard</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="back"
        render={({ field }) => (
          <FormItem>
            <FormLabel>back</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormDescription>The back of the flashcard</FormDescription>
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
