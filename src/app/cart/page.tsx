"use client";

import CouponCode from "@/components/CouponCode";
import SectionWrapper from "@/components/SectionWrapper";
import CartItem from "@/components/cart/CartItem";
import { useCart } from "@/components/product/useCart";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { getCart } from "@/db/services/cart";
import useSize from "@/hooks/useSize";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Confetti from "react-confetti";
import { createCheckoutSession } from "../action";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import AnimatedLoader from "@/components/AnimationLoader";
import { ArrowRight } from "lucide-react";
import { discounts, getTotalPrice } from "@/lib/utils";

// hardcoded for now
const discountCode = "SUMMER20";
const discount = discounts.find((d) => d.code === discountCode);

export default function Page() {
  const { data, error, isPending } = useQuery({
    queryKey: ["cartData"],
    queryFn: getCart,
  });
  const router = useRouter();
  const { data: session } = useSession();
  const { cart } = useCart();
  const { width, height } = useSize();

  const [couponApplied, setCouponApplied] = useState(false);
  const { mutate: createPaymentSession, isPending: paymentPending } =
    useMutation({
      mutationFn: createCheckoutSession,
      mutationKey: ["get-checkout-session"],
      onSuccess: ({ url }) => {
        if (url) {
          router.push(url);
        }
      },
      onError: (error) => {
        toast({
          title: "Error Occurred",
          variant: "destructive",
          description: error.message,
        });
      },
    });
  const paymentHandleer = () => {
    if (session) {
      createPaymentSession(discount?.value);
    } else {
      signIn();
    }
  };
  if (isPending) {
    return <SectionWrapper className="flex justify-center items-center text-white"><Loader className="text-white" /></SectionWrapper>
  }
  if (error || !data) {
    return <SectionWrapper className="flex justify-center items-center text-white">Error loading cart</SectionWrapper>
  }
  if (data.length === 0) {
    return <SectionWrapper className="flex justify-center items-center text-white">No items in cart</SectionWrapper>
  }
  const handleCouponApply = () => {
    setCouponApplied(true);
  };

  const totalPrice = getTotalPrice(
    cart,
    couponApplied ? discount?.value : undefined
  );
  return (
    <SectionWrapper className="flex justify-center items-center">
      <h1>Cart</h1>
      <div className="text-white w-full">
        {cart.map((product) => {
          return <CartItem key={product.productId} {...product} />;
        })}
      </div>
      <div className="fixed  bottom-0 h-20 w-full">
        <SectionWrapper className="bg-secondary rounded-t-[30px] flex justify-between items-center px-3 p-3 md:p-3">
          <div>
            <CouponCode handleClick={handleCouponApply} code={discountCode} />
          </div>
          <Button className="p-6 rounded-full  w-[160px] overflow-hidden" onClick={paymentHandleer}>
            <AnimatedLoader
              isLoading={paymentPending}
              loadingContent={<Loader className="w-6 h-6" />}
            >
              <span className="flex gap-2">
                {session
                  ? `Buy for ${totalPrice.toFixed(2)}`
                  : "Login to Checkout"}
                <ArrowRight size={20} />
              </span>
            </AnimatedLoader>
          </Button>
        </SectionWrapper>
      </div>

      {couponApplied && (
        <Confetti width={width} height={height} recycle={false} />
      )}
    </SectionWrapper>
  );
}
