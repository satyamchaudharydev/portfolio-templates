"use client";
import { Product } from "@prisma/client";
import { useCart } from "@/components/product/useCart";

import { useSession } from "next-auth/react";
import Link from "next/link";
import CustomButton from "../CustomButton";

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
}: Product) {
  const { addCartProduct, hasProduct, deleteCartProduct } = useCart();
  const { data: session } = useSession();

  const handleAddtoCart = () => {
    if(hasProduct(id)){
      deleteCartProduct(id);
    }
    addCartProduct(id);
  };

  return (
    <Link href={`product/${id}`} prefetch={true}>
      <div
        className="flex-col max-h-[300px] h-full relative aspect-auto md:aspect-[0.833652/1]"
       
      >
        <div className="rounded-lg shadow-md border border-white/[.08] overflow-hidden relative aspect-auto md:aspect-[0.833652/1] h-full ">
          <img
            src={image?.[0]}
            alt={name}
            className="w-full object-cover mb-4 absolute h-full"
          />
        </div>
        <div className="flex flex-row pt-2 gap-2 justify-between">
          <div className="flex-col justify-between items-center">
            <h2 className="text-lg font-semibold
            max-w-[20ch] truncate
            ">{name}</h2>
            <p className="text-secondary">${price.toFixed(2)}</p>
          </div>
          <CustomButton handleClick={handleAddtoCart} className="right-[15px] top-0 w-10 h-10" isSelected={hasProduct(id)} />
        </div>
      </div>
    </Link>
  );
}
