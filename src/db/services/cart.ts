"use client"

import { getLocalCart } from "@/lib/localCart";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getCart = async () => {
    try {
        const session = getSession()
        console.log(session, "session")
       
        // Fetch cart items for the user
        const cartItems = await axios.get('/api/cart')
    
        return cartItems.data;
      } catch (error) {
        console.error("Error fetching cart items:", error);
        throw new Error("Failed to fetch cart items");
      }
}