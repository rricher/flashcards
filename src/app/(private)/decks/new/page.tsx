import { DeckForm } from "@/components/forms/DeckForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewDeckPage() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>New Deck</CardTitle>
      </CardHeader>
      <CardContent>
        <DeckForm />
      </CardContent>
    </Card>
  );
}
