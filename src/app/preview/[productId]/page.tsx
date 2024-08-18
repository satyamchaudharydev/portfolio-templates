import { db } from "@/db";
import { PreviewPage } from "./PreviewPage";

export default async function Page({params}: {
    params: {
        productId: string;
    }
}){
    const product = await db.product.findUnique({
        where: { id: Number(params.productId) },
        select: {
          templateHtml: true,
          templateFields: true,
          
        },
      });
    if(!product){
        return <div>Product not found</div>
    }

    return (
        <PreviewPage templateFields={product.templateFields} templateHtml={product.templateHtml}  />
    )
}