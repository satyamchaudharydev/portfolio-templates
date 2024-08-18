import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function AuthButton() {
    const { data: session } = useSession();
    if (session) {
      return (
        <Button variant="ghost" onClick={() => signOut()} className="bg-transparent">
          Signout
        </Button>
      );
    } else {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            signIn("google", {
              callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/auth-callback`,
            })
          }
        >
          Sign In
        </Button>
      );
    }
  }