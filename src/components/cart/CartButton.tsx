"use client";

import { ShoppingCart } from 'lucide-react';
import { useUIStore } from '@/store/useUiStore';
import { useCart } from '../product/useCart';
import { useEffect, useState } from 'react';

export default function CartButton() {
  const {cart} = useCart()
  const [count, setCount] = useState(0)
  const {toggleCart} = useUIStore((state) => state);
  useEffect(() => {
    if(cart && cart.length > 0) {
      setCount(cart.length)
    }
  }, [cart])

  return (
    <div className='relative rounded-full border p-[8px] border-white/35' onClick={toggleCart}>
        <ShoppingCart size={18} />
        {/* {count} */}
        {count > 0 && (
          <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {count}
          </p>
        )}
    </div>
  );
}