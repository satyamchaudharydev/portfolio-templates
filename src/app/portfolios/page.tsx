import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUserId } from "../action";
import { getPurchasedPortfolios } from "./action";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";

export default async function PurchasedPortfoliosPage() {
  const userId = await getUserId();

  if (!userId) {
    redirect("/auth/signin");
  }

  let portfolios: any[] = [];

  if (userId) {
    portfolios = await getPurchasedPortfolios(userId);
  }

  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-8 text-white">
        <h1 className="text-2xl font-bold mb-8 text-white/75">Your Purchased Portfolios</h1>
        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio: any) => (
              <Link
                href={`/portfolios/${portfolio.cardItemId}`}
                key={portfolio.productId}
              >
                <div className="flex-col max-h-[300px] h-full relative aspect-auto md:aspect-[0.833652/1]">
                  <div className="rounded-lg shadow-md border border-white/[.08] overflow-hidden relative aspect-auto md:aspect-[0.833652/1] h-full ">
                    <img
                      src={portfolio?.image?.[0]}
                      alt={portfolio.name}
                      className="w-full object-cover mb-4 absolute h-full"
                    />
                  </div>
                  <div className="flex flex-row pt-2 gap-2 justify-between">
                    <div className="flex-col justify-between items-center">
                      <h2
                        className="text-lg font-semibold
              max-w-[20ch] truncate
              "
                      >
                        {portfolio.name}
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>No portfolios found.</div>
        )}
      </div>
    </SectionWrapper>
  );
}
