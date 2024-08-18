import SectionWrapper from "@/components/SectionWrapper";

import { getProduct } from "./action";
import { ProductDetails } from "./ProductDetail";

export default async function product({params}: {
  params: {
    productId: string;
  };
}) {
  const productId = params.productId;
  const product = await getProduct(parseInt(productId));
  if(!product) {
    return <div>Product not found</div>
  }
  return (
    <SectionWrapper className="py-10">
      <ProductDetails product={product} />
    </SectionWrapper>
  );
}
