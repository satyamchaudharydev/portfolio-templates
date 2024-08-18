"use client";

import {
  addOrUpdateCartItem,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
} from "@/app/action";
import { getCart } from "@/db/services/cart";
import { getUser } from "@/lib/getClientUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartItemProps } from "../cart/CartItem";
import { useSession } from "next-auth/react";
import product from "@/app/product/[productId]/page";
import { getLocalCart, saveLocalCart } from "@/lib/localCart";

export function useCart() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const localCart = getLocalCart();
  const cart = useQuery({
    queryKey: ["cartData"],
    queryFn: getCart,
    enabled: !!session,
    initialData: session ? undefined : localCart,
  });
  console.log("localCart", localCart);

  const updateLocalCart = (productId: number, quantity: number) => {
    // get the local cart
    const cart = localCart;
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
      saveLocalCart(updatedCart as any);
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
      saveLocalCart(updatedCart as any);
    }
    return cart;
  };
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

  const { mutate: incrementMutation } = useMutation({
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

  const { mutate: decrementMutation } = useMutation({
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
  const { mutate: deletMuation } = useMutation({
    mutationFn: deleteCartItem,
    mutationKey: ["deleteCartItem"],
    onMutate: async (productId: number) => {
      await queryClient.cancelQueries({ queryKey: ["cartData"] });
      const previousCart = queryClient.getQueryData(["cartData"]);
      queryClient.setQueryData(["cartData"], (oldCart: any) => {
        return oldCart.filter((item: any) => item.productId !== productId);
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
  const cartData = cart.data

  const hasProduct = (productId: number) => {
    if (!cartData) return false;
    return cartData.some((item: any) => item.productId === productId);
  };

  const deleteLocalCart = (productId: number) => {
    const updatedCart = cart.data.filter(
      (item: any) => item.productId !== productId
    );
    queryClient.setQueryData(["cartData"], updatedCart);
    saveLocalCart(updatedCart);
    return updatedCart;
  };
  const incrementLocalCart = (
    productId: number,
  ) => {
    const updatedCart = cart.data.map((item: any) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    queryClient.setQueryData(["cartData"], updatedCart);
    saveLocalCart(updatedCart as any);
    return updatedCart;
  };
  const decrementLocalCart = (
    productId: number,
  ) => {
    const updatedCart = cart.data.map((item: any) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    queryClient.setQueryData(["cartData"], updatedCart);
    saveLocalCart(updatedCart as any);
    return updatedCart;
  };

  const deleteCartProduct = session ? deletMuation : deleteLocalCart;
  const incrementCartProduct = session ? incrementMutation : incrementLocalCart;
  const decrementCartProduct = session ? decrementMutation : decrementLocalCart;
  return {
    cart: cartData as CartItemProps[],
    addMutation,
    updateLocalCart,
    deleteCartProduct,
    incrementMutation: incrementCartProduct,
    decrementMutation: decrementCartProduct,
    hasProduct,
  };
}
