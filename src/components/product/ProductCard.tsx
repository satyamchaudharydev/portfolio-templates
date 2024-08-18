"use client";
import { Product } from "@prisma/client";
import { useCart } from "@/components/product/useCart";
import Link from "next/link";
import CustomButton from "../CustomButton";
import { toast } from "../ui/use-toast";
import { itemVariants } from "@/lib/variants";
import { motion } from "framer-motion";

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
}: Product) {
  const { addCartProduct, hasProduct, deleteCartProduct } = useCart();

  const handleAddtoCart = () => {
    if (hasProduct(id)) {
      deleteCartProduct(id);
      toast({
        title: "Removed from cart",
        description: "Product removed from cart",
        variant: "destructive",
      })
    }
    else{
      addCartProduct(id);
      toast({
        title: "Added to cart",
        description: "Product added to cart",
        variant: "default",
        
      })
    }
  };

  return (
    <Link href={`product/${id}`} prefetch={true}>
      <motion.div variants={itemVariants} className="flex-col  h-full relative flex">
        <div className="rounded-lg shadow-md border border-white/[.08] overflow-hidden relative flex-1">
          <img
            src={image?.[0]}
            alt={name}
            className="w-full object-cover mb-4 absolute h-full"
          />
        </div>
        <div className="flex flex-row pt-2 gap-2 justify-between flex-wrap">
          <div className="flex-col justify-between items-center">
            <h2
              className="text-lg font-semibold
            max-w-[20ch] truncate
            "
            >
              {name}
            </h2>
            <p className="text-secondary">${price.toFixed(2)}</p>
          </div>
          <CustomButton
            handleClick={handleAddtoCart}
            className="right-[15px] top-0 w-10 h-10"
            isSelected={hasProduct(id)}
          />
        </div>
      </motion.div>
    </Link>
  );
}
