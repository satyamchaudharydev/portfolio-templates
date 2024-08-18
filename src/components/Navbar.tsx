"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import SectionWrapper from "./SectionWrapper";
import CartButton from "./cart/CartButton";
import { CardDrawer } from "./cart/CardDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { itemVariants, staggerItems } from "@/lib/variants";
import AuthButton from "./AuthButton";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigation = usePathname();

  let menuItems = [
   {
      component: (
          <Button variant="secondary" asChild>
            <Link href="/portfolios" className={"text-[16px]"}>
              My Portfolios
            </Link>
          </Button>
      ),
      name: "portfolios",
   },
    {
      component: <CartButton />,
      name: "cart",

    },
    {
      component: <AuthButton />,
      name: "auth"
   }
  ];

  if (navigation.includes("/preview/")) {
    return null;
  }
  if(navigation.includes("/cart")){
      const newMenuItems = menuItems.filter(item => item.name !== "cart")
      menuItems = newMenuItems
    
  }
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full backdrop-blur-lg transition-all bg-primary text-white">
      <SectionWrapper>
        <div className="flex h-14 items-center justify-between">
          <motion.div>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={"show"}
            >
              <Link href="/" className="flex font-semibold">
                Port <span className="text-secondary ml-1">Folio.</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex gap-10 justify-center items-center"
            variants={staggerItems}
            initial="hidden"
            animate={"show"}
          >
            {menuItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                {item.component}
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden p-2"
            onClick={toggleMenu}
            whileTap={{ scale: 0.97 }}
          >
            <svg
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
                <motion.div
                  className="flex flex-col gap-4"
                  variants={staggerItems}
                  initial="hidden"
                  animate="show"
                >
                  {menuItems.map((item, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      {item.component}
                    </motion.div>
                  ))}
                </motion.div>
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
