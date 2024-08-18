"use client";

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import SectionWrapper from "./SectionWrapper";
import CartButton from "./cart/CartButton";
import { CardDrawer } from "./cart/CardDrawer";
import { signIn, signOut, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* {session.user?.name} <br /> */}
        <Button variant="ghost" onClick={() => signOut()} className="bg-transparent">
          Signout
        </Button>
      </>
    );
  } else {
    return (
      <>
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
      </>
    );
  }
}

const Navbar = () => {

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full backdrop-blur-lg transition-all bg-primary text-white">
      <SectionWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex font-semibold">
            Port <span className="text-secondary ml-1">Folio.</span>
          </Link>
         
          <div className="flex gap-10 justify-center items-center">
            <Button variant="secondary" asChild>
            <Link href="/portfolios" className={"text-[16px]"}>
              My Portfolios
            </Link>
               </Button>
            <CartButton />
            <AuthButton />
          </div>

          <CardDrawer />
        </div>
      </SectionWrapper>
    </nav>
  );
};

export default Navbar;
