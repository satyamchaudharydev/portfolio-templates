"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const client = new QueryClient();

  useEffect(() => {
    const updateCart = async () => {
      try {
        const cartData = localStorage.getItem("cart");
        if (cartData && session) {
          await axios.post("/api/cart/update", { cartItems: JSON.parse(cartData) });
          localStorage.removeItem("cart");
          client.invalidateQueries({queryKey: ["cartData"]});
          router.push("/");
        } else if (session) {
          localStorage.removeItem("cart");
            client.invalidateQueries({queryKey: ["cartData"]});
          router.push("/");
        } else {
          setError("You need to be logged in to update the cart.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error updating cart:", err);
        setError("Error updating cart. Please try again.");
        setLoading(false);
      }
    };

    updateCart();
  }, [session, router]);

  if (loading) {
    return (
      <div className="text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        <h1>{error}</h1>
      </div>
    );
  }

  return null; // Render nothing after redirect or error message
}
