"use client"

// Function to get cart from local storage
export const getLocalCart = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};
// Function to save cart to local storage
export const saveLocalCart = (cart: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
