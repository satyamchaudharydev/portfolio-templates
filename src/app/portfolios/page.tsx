import { getUserId } from "../action";
import { getPurchasedPortfolios } from "./action";
import SectionWrapper from "@/components/SectionWrapper";
import PaidFolios from "./PaidFolios";

export default async function PurchasedPortfoliosPage() {
  const userId = await getUserId();

  if (!userId) {
    return <div className="text-white m-8">
      You need to be logged in to view this page. 
    </div>
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
