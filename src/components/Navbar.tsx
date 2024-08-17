"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import SectionWrapper from "./SectionWrapper";
import CartButton from "./cart/CartButton";
import { CardDrawer } from "./cart/CardDrawer";
import { signIn, signOut, useSession} from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {/* {session.user?.name} <br /> */}
        <Button variant="secondary" onClick={() => signOut()}>
          Signout
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          variant="secondary"
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
  // const { getUser } = getKindeServerSession()
  // const user = await getUser()

  // const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full backdrop-blur-lg transition-all bg-primary text-white">
      <SectionWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            case<span className="text-green-600">cobra</span>
          </Link>
          {/* <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sign out
                </Link>
              
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sign up
                </Link>

                <Link
                  href='/api/auth/login'
                  className={buttonVariants({
                    size: 'sm',

                    variant: 'ghost',
                  })}>
                  Login
                </Link>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  Create case
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            )}
          </div> */}
          <div className="flex gap-10 justify-center items-center">
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
