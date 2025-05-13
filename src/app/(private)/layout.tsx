import { NavLink } from "@/components/ui/NavLink";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { ReactNode } from "react";

export default function privateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex py-2 border-b bg-card text-sm gap-6 container">
        <div className="flex items-center gap-2 font-semibold mr-auto">
          <CreditCard className="size-6" />
          <span className="sr-only md:not-sr-only">Flashcards</span>
        </div>
        <NavLink href="/decks">Decks</NavLink>
        <NavLink href="/cards">Flashcards</NavLink>
        <div className="ml-auto size-10"><UserButton appearance={{ elements: { userButtonAvatarBox: "size-full" } }} /></div>
      </header>
      <main className="container my-6">{children}</main>
    </>
  );
}
