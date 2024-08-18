"use client"
import { Product } from '@prisma/client';
import { useState } from 'react';
import { useCart } from './useCart';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProductCard({ id, name, price, image, description }: Product) {
  const { addMutation, updateLocalCart, hasProduct } = useCart()
  const { data: session } = useSession()
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddtoCart = () => {

    if (!session) {
      updateLocalCart(id, 1)
    } else {
      addMutation.mutate(id);
    }
  }

  return (
    <Link href={`product/${id}`} prefetch={true}>
      <div className='flex-col max-h-[300px] h-full'>
        <div className="rounded-lg shadow-md border border-white/[.08] overflow-hidden relative aspect-auto md:aspect-[0.833652/1] h-full ">
          <img src={image?.[0]} alt={name}  className="w-full object-cover mb-4 absolute h-full" />
        </div>
        <div className='flex flex-row pt-2 gap-1 justify-between items-center'>
          <div className='flex-col justify-between items-center'>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-secondary">${price.toFixed(2)}</p>
          </div>
          <Button
            onClick={handleAddtoCart}
            variant={"ghost"}
            className='w-10 h-10 rounded-full p-0 relative right-3 bottom-6'
          >
            <ShoppingCart size={20} fill='white'/>
            
          </Button>
        </div>
      </div>
    </Link>
  );
}