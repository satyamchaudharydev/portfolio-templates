"use client"

import {  getProducts } from "@/app/action"
import { CartItemProps } from "@/components/cart/CartItem"
import { getCart } from "@/db/services/cart"
import { useQuery } from "@tanstack/react-query"

const useCartStore = () => {
  const cart = useQuery({
    queryKey: ["cartData"],
    queryFn: getCart,
  })
  
  return {
    cart: cart.data as CartItemProps[]
  }
}

export default useCartStore;