"use client";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthStatus } from "./action";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
  const { data } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getAuthStatus(cartData),
    retry: true,
    retryDelay: 500,
  });

  const shouldUpdateCart = data?.isNewUser && cartData.length > 0;

  if (data?.success) {
    queryClient.invalidateQueries({ queryKey: ["cartData"] });
    localStorage.removeItem("cart");
    router.push(shouldUpdateCart ? "/cart" : "/");
  }

  return (
    <div className="text-white/65 text-center text-3xl">
      <h1 className="mt-5">
        {shouldUpdateCart ? "Updating cart..." : "Redirecting..."}
      </h1>
    </div>
  );
}