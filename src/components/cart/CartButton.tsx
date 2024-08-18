"use client";

import { ShoppingCart } from "lucide-react";
import { useUIStore } from "@/store/useUiStore";
import { useCart } from "../product/useCart";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Prisma } from "@prisma/client";
import { getTotalQuantity } from "@/lib/utils";
import { Button } from "../ui/button";

export default function CartButton() {
  const { cart } = useCart();
  const [count, setCount] = useState(0);
  const { toggleCart } = useUIStore((state) => state);
  useEffect(() => {
    if (cart && cart.length > 0) {
      setCount(() => getTotalQuantity(cart));
    } else {
      setCount(0);
    }
  }, [cart]);

  return (
    <Button
      variant={"default"}
      className="relative rounded-full border p-[8px] border-white/35"
      onClick={toggleCart}
    >
      <ShoppingCart size={18} />
      <AnimatePresence>
        {count > 0 && (
          <motion.p
            key={count}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-h-5 min-w-5 flex items-center justify-center"
          >
            {count}
          </motion.p>
        )}
      </AnimatePresence>
    </Button>
  );
}
