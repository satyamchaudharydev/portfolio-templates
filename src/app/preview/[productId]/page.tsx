import { TemplatePreview } from "@/components/TemplatePreview";
import { db } from "@/db";

export default async function Page({params}: {
    params: {
        productId: string;
    }
}){
    const product = await db.product.findUnique({
        where: { id: Number(params.productId) },
        select: {
          templateHtml: true
        },
      });
    if(!product){
        return <div>Product not found</div>
    }
    return (
        <div style={{
            height: "100vh",
        }}>
            <TemplatePreview
                src={product.templateHtml}
            />
k        </div>
    )
}