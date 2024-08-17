import { useRouter } from "next/navigation";
import { getOrderedPortfolioForProduct } from "./action";

export default async function Page({ params }: { params: { productId: string } }) {
    console.log(typeof params.productId);

    const data = await getOrderedPortfolioForProduct(Number(params.productId));
    console.log(data, "data");
    return (
        <div>
        <h1>Portfolio Page</h1>
        </div>
    );
}