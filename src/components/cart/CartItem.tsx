// import { CartItem, useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { MinusIcon, TrashIcon } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import {Prisma } from '@prisma/client';
import { useCart } from '../product/useCart';
import { Button } from '../ui/button';

export type CartItemProps = Prisma.CartItemGetPayload<{
  include: { product: true }
}>
export default function CartItem({
  product,
  quantity = 1,
}: CartItemProps) {
  const {incrementMutation,decrementMutation} = useCart()

  // const {updateCartItemQuantity} = useCartStore((state) => state);
  return (
    <div className="flex items-center border-b border-[#252c32] py-4 px-2">
      <div className='relative'>
        <img src={product.image} width={60} height={60} className="object-contain mr-4 rounded-md" />
        <Button className="absolute top-0 left-0 text-white rounded-full h-[30px] w-[30px] p-2 mt-[-10px] ml-[-3px] bg-[#252c32de]">
          <TrashIcon className="w-5 h-5" />
      </Button>
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center justify-stretch gap-1">
        <button
          // onClick={() => updateCartItemQuantity(id, quantity - 1)}
          className="p-2 bg-[#252c32] rounded-full "
          onClick={() => decrementMutation.mutate(product.id)}
          disabled={quantity <= 1}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <span className="mx-2">{quantity}</span>
        <button
          // onClick={() => updateCartItemQuantity(id, quantity + 1)}
          className="p-2 bg-[#252c32] rounded-full"
          onClick={() => incrementMutation.mutate(product.id)}

        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
     
    </div>
  );
}