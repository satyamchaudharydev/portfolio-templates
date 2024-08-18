"use client";

import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart } from "@/db/services/cart";
import { addOrUpdateCartItem, incrementCartItem, decrementCartItem, deleteCartItem } from "@/app/action";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CartItemProps } from "../cart/CartItem";

export function useCart() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [localCart, saveLocalCart] = useLocalStorage("cart", []);

  const { data: cartData = [] } = useQuery({
    queryKey: ["cartData"],
    queryFn: getCart,
    enabled: !!session,
    initialData: session ? undefined : localCart,
  });

  const updateCartData = (updater: (oldCart: any) => any) => {
    const updatedCart = updater(cartData);
    queryClient.setQueryData(["cartData"], updatedCart);
    if (!session) saveLocalCart(updatedCart);
    return updatedCart;
  };

  const useCreateMutation = (
    mutationFn: (productId: number) => Promise<any>,
    updater: (oldCart: any, productId: number) => any
  ) => {
    return useMutation({
      mutationFn,
      onMutate: async (productId: number) => {
        await queryClient.cancelQueries({ queryKey: ["cartData"] });
        const previousCart = queryClient.getQueryData(["cartData"]);
        updateCartData((oldCart) => updater(oldCart, productId));
        return { previousCart };
      },
      onError: (_, __, context) => {
        queryClient.setQueryData(["cartData"], context?.previousCart);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["cartData"] });
      },
    });
  };

  const { mutate: addMutation } = useCreateMutation(
    (productId) => addOrUpdateCartItem(productId, 1),
    (oldCart, productId) => {
      const existingItem = oldCart.find((item: any) => item.productId === productId);
      if (existingItem) {
        return oldCart.map((item: any) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const products = queryClient.getQueryData<any[]>(["product"]) || [];
        const product = products.find((p) => p.id === productId);
        return [...oldCart, { product, userId: "", productId, quantity: 1 }];
      }
    }
  );

  const { mutate: incrementMutation } = useCreateMutation(
    incrementCartItem,
    (oldCart, productId) =>
      oldCart.map((item: any) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
  );

  const { mutate: decrementMutation } = useCreateMutation(
    decrementCartItem,
    (oldCart, productId) =>
      oldCart
        .map((item: any) =>
          item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item: any) => item.quantity > 0)
  );

  const { mutate: deleteMutation } = useCreateMutation(
    deleteCartItem,
    (oldCart, productId) => oldCart.filter((item: any) => item.productId !== productId)
  );

  const hasProduct = (productId: number) =>
    cartData.some((item) => item.productId === productId);

  return {
    cart: cartData as CartItemProps[] | [],
    addCartProduct: session ? addMutation : (productId: number) => updateCartData((oldCart) => addMutation(productId) as any),
    deleteCartProduct: session ? deleteMutation : (productId: number) => updateCartData((oldCart) => oldCart.filter((item: any) => item.productId !== productId)),
    incrementCartProduct: session ? incrementMutation : (productId: number) => updateCartData((oldCart) => incrementMutation(productId) as any),
    decrementCartProduct: session ? decrementMutation : (productId: number) => updateCartData((oldCart) => decrementMutation(productId) as any),
    hasProduct,
  };
}
