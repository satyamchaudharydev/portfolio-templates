"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "./action";

export default function Page() {
  const router = useRouter();

  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
  const {data} = useQuery({
    queryKey: ["auth"],
    queryFn: async () => await getAuthStatus(cartData),
    retry: true,
    retryDelay: 500,
  })

  
  if(data?.success){
    localStorage.removeItem("cart");
    router.push("/");
  }

  else{
    return (
      <div className="text-white/65 text-center text-3xl ">
        <h1 className="mt-5">
          {data?.isNewUser ? "Updating cart..." : "Redirecting..."}
        </h1>
      </div>
    );
  }

}
