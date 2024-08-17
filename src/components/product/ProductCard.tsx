"use client"

import { Product } from '@prisma/client';
import { useState } from 'react';
import { useCart } from './useCart';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '../ui/button';



export default function ProductCard({ id, name, price, image,description }: Product) {
  const {addMutation, updateLocalCart} = useCart()

  const [optismiticIsAdded, setOptimisticIsAdded] = useState(false);
  const {data: session} = useSession() 
  const handleAddtoCart = () => {
    if(!session){
      updateLocalCart(id, 1)
    }
    else{
      addMutation.mutate(id);
    }
  }

  return (
      <div className='flex-col'>
        <div className="rounded-lg shadow-md border border-white/[.08] overflow-hidden relative aspect-[0.833652/1]">
            <img src={image} alt={name} height={200} width={140} className="w-full object-cover mb-4 absolute h-full" />
            
        </div>
        <div className='flex flex-row pt-2 gap-1 justify-between items-center'>
          <div className='flex-col justify-between items-center'>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-secondary">${price.toFixed(2)}</p>
          </div>
          <Button
            onClick={handleAddtoCart}
            variant={"ghost"}

            // className={`rounded ${
            //   optismiticIsAdded ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
            // } transition-colors duration-300`}
          >
            {optismiticIsAdded ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    
  );
}