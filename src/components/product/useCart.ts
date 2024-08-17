"use client";

import {
  addOrUpdateCartItem,
  incrementCartItem,
  decrementCartItem,
} from "@/app/action";
import { getCart } from "@/db/services/cart";
import { getUser } from "@/lib/getClientUser";
import { getLocalCart, saveLocalCart } from "@/lib/localCart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartItemProps } from "../cart/CartItem";
import { useSession } from "next-auth/react";

export function useCart() {
  const queryClient = useQueryClient();
  const {data: session} = useSession()
  const cart = useQuery({
    queryKey: ["cartData"],
    queryFn: getCart,
    enabled: !!session,
  });
  
  const updateLocalCart = (productId: number, quantity: number) => {
    // get the local cart
    const cart = getLocalCart();
    // find the product in the cart
    const products = queryClient.getQueryData(["product"]) as any;
    const product = products.find((product: any) => product.id === productId);
    const existingItem = cart.find((item: any) => item.productId === productId);
    // if the product is already in the cart, update the quantity
    if (existingItem) {
      const updatedCart = cart.map((item: any) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      queryClient.setQueryData(["cartData"], updatedCart);
      saveLocalCart(updatedCart);
    } else {
      // if the product is not in the cart, add it
      const updatedCart = [
        ...cart,
        {
          product: product,
          userId: "",
          productId: productId,
          quantity: quantity,
        },
      ];
      saveLocalCart(updatedCart);
      
    }
    return cart;

  }
  const addMutation = useMutation({
    mutationFn: (productId: number) => addOrUpdateCartItem(productId, 1),
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: ["cartData"] });
      const previousCart = queryClient.getQueryData(["cartData"]);
      const products = queryClient.getQueryData(["product"]) as any;
      const product = products.find((product: any) => product.id === productId);

      const updateCart = (oldCart: any) => {
        const existingItem = oldCart.find(
          (item: any) => item.productId === productId
        );
        if (existingItem) {
          return oldCart.map((item: any) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [
            ...oldCart,
            {
              product: product,
              userId: "",
              productId: productId,
              quantity: 1,
            },
          ];
        }
      };

      queryClient.setQueryData(["cartData"], updateCart);
      return { previousCart };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(["cartData"], context?.previousCart);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["cartData"] });
    },
  });

  const incrementMutation = useMutation({
    mutationFn: (productId: number) => incrementCartItem(productId),
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: ["cartData"] });
      const previousCart = queryClient.getQueryData(["cartData"]);
      queryClient.setQueryData(["cartData"], (oldCart: any) => {
        return oldCart.map((item: any) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      });
      return { previousCart };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(["cartData"], context?.previousCart);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["cartData"] });
    },
  });

  const decrementMutation = useMutation({
    mutationFn: (productId: number) => decrementCartItem(productId),
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: ["cartData"] });
      const previousCart = queryClient.getQueryData(["cartData"]);
      queryClient.setQueryData(["cartData"], (oldCart: any) => {
        const existingItem = oldCart.find(
          (item: any) => item.productId === productId
        );
        if (existingItem && existingItem.quantity > 1) {
          return oldCart.map((item: any) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return oldCart.filter((item: any) => item.productId !== productId);
        }
      });
      return { previousCart };
    },
    onError: (err, productId, context) => {
      queryClient.setQueryData(["cartData"], context?.previousCart);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["cartData"] });
    },
  });

  const cartData = session ? cart.data : getLocalCart();
  return {
    cart: cartData as CartItemProps[],
    addMutation,
    updateLocalCart,
    incrementMutation,
    decrementMutation,
  };
}
