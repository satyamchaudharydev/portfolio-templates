"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import SectionWrapper from "./SectionWrapper";
import CartButton from "./cart/CartButton";
import { CardDrawer } from "./cart/CardDrawer";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function AuthButton() {
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full backdrop-blur-lg transition-all bg-primary text-white">
      <SectionWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex font-semibold">
            Port <span className="text-secondary ml-1">Folio.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 justify-center items-center">
            <Button variant="secondary" asChild>
              <Link href="/portfolios" className={"text-[16px]"}>
                My Portfolios
              </Link>
            </Button>
            <CartButton />
            <AuthButton />
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden p-2"
            onClick={toggleMenu}
            whileTap={{ scale: 0.97 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute top-14 left-0 right-0 bg-primary p-5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col gap-4">
                  <Button variant="secondary" asChild>
                    <Link href="/portfolios" className={"text-[16px]"}>
                      My Portfolios
                    </Link>
                  </Button>
                  <CartButton />
                  <AuthButton />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <CardDrawer />
        </div>
      </SectionWrapper>
    </nav>
  );
};

export default Navbar;