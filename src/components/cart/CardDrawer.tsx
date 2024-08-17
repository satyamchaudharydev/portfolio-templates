"use client";

import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartItem from "./CartItem";
import { useUIStore } from "@/store/useUiStore";
import { useCart } from "../product/useCart";
import { getTotalPrice } from "@/lib/utils";
import { ShoppingCartIcon, SidebarCloseIcon, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/app/action";
import { useRouter } from "next/navigation";

export function CardDrawer({}: {}) {
  const { isCartOpen, toggleCart } = useUIStore((state) => state);
  const { cart } = useCart();
  const router = useRouter();

  const renderCardContent = () => {
    if (cart && cart.length > 0) {
      return cart.map((product) => (
        <CartItem key={product.productId} {...product} />
      ));
    } else {
      return (
        <DrawerDescription className="text-center flex items-center gap-6 text-2xl my-auto">
          <span>
            <ShoppingCartIcon size={32} />
          </span>
          Your cart is empty
        </DrawerDescription>
      );
    }
  };
  const {mutate: createPaymentSession} = useMutation({
    mutationFn: createCheckoutSession,
    mutationKey: ["get-checkout-session"],
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      }
      throw new Error("Error creating checkout session");
    },
    onError: (error) => {
      console.error("Error creating checkout session", error);
    }

  });
  return (
    <Drawer
      direction="right"
      shouldScaleBackground
      setBackgroundColorOnScale={false}
      open={isCartOpen}
      onClose={() => console.log("closing")}
      onOpenChange={(open) => {
        if (!open && isCartOpen) {
          toggleCart();
        }
      }}
    >
      <DrawerContent className="bg-primary flex flex-col rounded-t-[10px] h-full w-[380px] mt-24 fixed bottom-0  p-4  text-white">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle>Your Cart</DrawerTitle>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="rounded-full bg-transparent h-10 w-10 p-2 border-white/35"
              onClick={toggleCart}
            >
              <X size={30} />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-grow overflow-y-auto items-cente justify-stretch flex-col">
          {renderCardContent()}
        </div>

        <DrawerFooter className="border-t border-[#252c32]">
          <div className="flex justify-between">
            <p className="">Total</p>
            <p className="font-semibold">${getTotalPrice(cart).toFixed(2)}</p>
          </div>
          {/* <Button className="w-full mt-2" variant={"secondary"}>Go to Cart</Button> */}
          <Button className="w-full mt-2" variant={"secondary"} onClick={() => createPaymentSession({})}>
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
