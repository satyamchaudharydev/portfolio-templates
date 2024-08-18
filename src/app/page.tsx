import SectionWrapper from "@/components/SectionWrapper";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts } from "./action";
import ProductList from "@/components/ProductList";
import GradientBackground from "@/components/GradientBackground";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product"],
    queryFn: () => getProducts(),
  });

  return (
    <div className="flex flex-col text-white">
      <div
        className="relative  flex flex-col items-center overflow-hidden px-5 p-[40px] text-center md:px-[30px] md:pb-[80px] md:pt-[60px] lg:pb-[80px] lg:pt-[40px] bg-primary"
        style={{
          backgroundImage:
            "radial-gradient(70% 80% at 50% 110%, #abddff 0%, rgba(0, 141, 255, 0.8) 35%, rgba(0, 111, 255, 0.4) 65%, rgb(0, 0, 0) 100%)",
        }}
      >
        <h1
          className="bg-clip-text heading font-bold heading"
          style={{
            WebkitTextFillColor: "transparent",
            backgroundImage:
              "linear-gradient(10deg, #ffffff 0%, rgba(255, 255, 255, 1) 70%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          Start Building Your <br /> Own Portfolio.
        </h1>
        <p className="text-xl text-balance text-white/70 mt-2">
          Customizable portfolio with one click!
        </p>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 mix-blend-overlay">
          <GradientBackground />
        </div>
      </div>
      <div className="bg-black py-6">
        <SectionWrapper>
          {/* <h2 className="text-[20px] font-semibold text-white/85  mb-8">
             Templates
          </h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-[300px] ">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <ProductList />
            </HydrationBoundary>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
