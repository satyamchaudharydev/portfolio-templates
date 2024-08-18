import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUserId } from "../action";
import { getPurchasedPortfolios } from "./action";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import SectionWrapper from "@/components/SectionWrapper";
import PaidFolios from "./PaidFolios";

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
          <PaidFolios portfolios={portfolios} />
        ) : (
          <div>No portfolios found.</div>
        )}
      </div>
    </SectionWrapper>
  );
}
