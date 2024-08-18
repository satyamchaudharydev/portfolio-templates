import Carousel from "@/components/Carousel";
import SectionWrapper from "@/components/SectionWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { EyeIcon, ShoppingCart } from "lucide-react";
import { getProduct } from "./action";

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
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <Carousel
            images={product.image }
          />
          <div className="text-white flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>
            <p className="text-base font-bold bg-secondary w-fit rounded-full p-2 px-4">
              $ {product.price}
            </p>
            <p className="text-lg text-gray">
              {product.description}
            </p>
            <div className="grid grid-cols-2 w-fit gap-5 mt-4">
              <Button
                variant="secondary"
                className="px-4 py-2 rounded-lg bg-[#222321]"
              >
                <EyeIcon size={16} className="mr-3" />
                Preview
              </Button>
              <Button variant="secondary" className="px-4 py-2 rounded-lg">
                <ShoppingCart size={16} className="mr-3" />
                Add to Cart
              </Button>
            </div>
            <div className="mt-[40px]">
              <h2 className="text-white">Pages</h2>
              <div className="flex gap-4 mt-4">
                <div className={buttonVariants({ variant: "ghost" })}>Home</div>
                <div className={buttonVariants({ variant: "ghost" })}>
                  Contacts
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className={buttonVariants({ variant: "ghost" })}>
                  About
                </div>
                <div className={buttonVariants({ variant: "ghost" })}>Docs</div>
                <div className={buttonVariants({ variant: "ghost" })}>404</div>
              </div>
            </div>
          </div>

          {/* pagess */}
        </div>
      </div>
    </SectionWrapper>
  );
}
