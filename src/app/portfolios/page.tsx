import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUserId } from "../action";
import { getPurchasedPortfolios } from "./action";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export default async function PurchasedPortfoliosPage() {
  const userId = await getUserId();

  if (!userId) {
    redirect("/auth/signin");
  }

  let portfolios: any[] = [];

  if (userId) {
    portfolios = await getPurchasedPortfolios(userId);
  }
  console.log("this is the portfolios", portfolios);

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Purchased Portfolios</h1>
      {portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio: any) => (
            <Link
              href={`/portfolios/${portfolio.cardItemId}`}
            >
              <div
                key={portfolio.productId}
                className="border p-4 rounded-lg text-white flex w-full h-full"
                // href={`/portfolios/${portfolio.productId}`}
              >
                <div key={portfolio.productId} >
                  <img
                    src={portfolio.image}
                    alt={portfolio.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-xl font-bold">{portfolio.name}</h2>
                  <p className="text-sm">{portfolio.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>No portfolios found.</div>
      )}
    </div>
  );
}
