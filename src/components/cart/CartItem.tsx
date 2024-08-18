import { MinusIcon, TrashIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { Prisma } from "@prisma/client";
import { useCart } from "../product/useCart";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export type CartItemProps = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
export default function CartItem({ product, quantity = 1 }: CartItemProps) {
  const { decrementCartProduct, incrementCartProduct, deleteCartProduct } = useCart();
  return (
    <motion.div layout className="flex items-center border-b border-[#252c32] py-4 px-2 gap-2">
      <div className="relative">
        <img
          src={product.image[0]}
          width={60}
          height={60}
          className="object-contain mr-4 rounded-md"
        />
        <Button className="absolute top-0 left-0 text-white rounded-full h-[30px] w-[30px] p-2 mt-[-10px] ml-[-3px] bg-[#252c32de]"
          onClick={() => deleteCartProduct(product.id)}
        >
          <TrashIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold max-w-[20ch] truncate">{product.name}</h3>
        <p className="text-white/75">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-stretch gap-1">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-[#252c32] rounded-full "
          onClick={() => decrementCartProduct(product.id)}
        >
          <MinusIcon className="w-4 h-4" />
        </motion.button>
        <span className="mx-2">{quantity}</span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-[#252c32] rounded-full"
          onClick={() => incrementCartProduct(product.id)}
        >
          <PlusIcon className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}
