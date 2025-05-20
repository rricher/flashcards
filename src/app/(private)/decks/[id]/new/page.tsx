import { FlashcardForm } from "@/components/forms/FlashcardForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NewFlashcardPage() {
  // const { id: deckIdParam } = await params
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>New Flashcard</CardTitle>
      </CardHeader>
      <CardContent>
        <FlashcardForm />
      </CardContent>
    </Card>
  );
}
