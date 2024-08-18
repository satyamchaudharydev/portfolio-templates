"use client";
import Carousel from "@/components/Carousel";
import { useCart } from "@/components/product/useCart";
import { Button, buttonVariants } from "@/components/ui/button";
import { EyeIcon, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { itemVariants, staggerItems } from "@/lib/variants";
import Link from "next/link";

export function ProductDetails({ product }: { product: any }) {
  const { addCartProduct } = useCart();
  return (
    <div>
      <motion.div
        variants={staggerItems}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8"
      >
        <motion.div variants={itemVariants}>
          <Carousel images={product.image} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <div className="text-white flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-base font-bold bg-secondary w-fit rounded-full p-2 px-4">
              $ {product.price}
            </p>
            <p className="text-lg text-gray">{product.description}</p>
            <div className="grid grid-cols-2 w-fit gap-5 mt-4">
              <Button
                variant="secondary"
                className="px-4 py-2 rounded-lg bg-[#222321]"
                asChild
              >
                <Link href={`/preview/${product.id}`}>
                  {" "}
                  <EyeIcon size={16} className="mr-3" />
                  Preview
                </Link>
              </Button>
              <Button
                variant="secondary"
                className="px-4 py-2 rounded-lg"
                onClick={() => addCartProduct(product.id)}
              >
                <ShoppingCart size={16} className="mr-3" />
                Add to Cart
              </Button>
            </div>
            <div className="mt-[40px]">
              <h2 className="text-white">Pages</h2>
              <div className="flex gap-4 mt-4">
                <div className={buttonVariants({ variant: "ghost" })}>Home</div>
                <div className={buttonVariants({ variant: "ghost" })}>
                  Contacts
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className={buttonVariants({ variant: "ghost" })}>
                  About
                </div>
                <div className={buttonVariants({ variant: "ghost" })}>Docs</div>
                <div className={buttonVariants({ variant: "ghost" })}>404</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* pagess */}
      </motion.div>
    </div>
  );
}
