import { CartItemProps } from "@/components/cart/CartItem"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getTotalPrice = (data: CartItemProps[]) => {
    if (!data) return 0
    return data.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }