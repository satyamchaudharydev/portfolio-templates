"use client"

import { Prisma } from "@prisma/client";
import axios from "axios";

type DataProps = Prisma.OrderItemGetPayload<{
  include: { product: true,  };
}>
export const getCart = async () => {
    try {
       
        // Fetch cart items for the user
        const cartItems = await axios.get('/api/cart')
    
        return cartItems.data as DataProps[];
      } catch (error) {
        console.error("Error fetching cart items:", error);
        throw new Error("Failed to fetch cart items");
      }
}