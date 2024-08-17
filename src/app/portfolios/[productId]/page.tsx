import { useRouter } from "next/navigation";
import { getOrderItemDetails } from "./action";

export default async function Page({ params }: { params: { productId: string } }) {
    console.log(typeof params.productId);

    const data = await getOrderItemDetails(Number(params.productId));
    console.log(data, "data");
    return (
        <div>
        <h1>Portfolio Page</h1>
        </div>
    );
}