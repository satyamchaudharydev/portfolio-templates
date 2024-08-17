import Carousel from "@/components/Carousel";
import SectionWrapper from "@/components/SectionWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { EyeIcon, ShoppingCart } from "lucide-react";

export default function product() {
  return (
    <SectionWrapper className="py-10">
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <Carousel
            images={[
              "https://www.framer.com/marketplace/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46791%2FImage_01-F77B2KLFzJTPBURH95fH8iXsTr1dJY.jpg&w=640&q=90",
              "https://www.framer.com/marketplace/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46791%2FImage_01-F77B2KLFzJTPBURH95fH8iXsTr1dJY.jpg&w=640&q=90",
              "https://www.framer.com/marketplace/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46791%2FImage_01-F77B2KLFzJTPBURH95fH8iXsTr1dJY.jpg&w=640&q=90",
              "https://www.framer.com/marketplace/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Ftemplates%2F46791%2FImage_01-F77B2KLFzJTPBURH95fH8iXsTr1dJY.jpg&w=640&q=90",
            ]}
          />
          <div className="text-white flex flex-col gap-4">
            <h1 className="text-4xl font-bold">
              TodoFusion — Creative Professional Website
            </h1>
            <p className="text-base font-bold bg-secondary w-fit rounded-full p-2 px-4">
              $100.00
            </p>
            <p className="text-lg text-gray">
              TodoFusion boosts productivity with seamless task management and
              real-time collaboration. This scalable, user-friendly Framer
              template offers comprehensive features for efficient workflow
              integration.
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
