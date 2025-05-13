import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();
  if (userId != null) redirect('/decks')
  return <div className="text-center container my-4 mx-auto">
    <h1 className="text-4xl font-bold text-gray-800">Flashcards</h1>
    <div className="flex gap-2 justify-center">
      <Button asChild><SignInButton /></Button>
      <Button asChild><SignUpButton /></Button>
      <UserButton />
    </div>
  </div>;
}
