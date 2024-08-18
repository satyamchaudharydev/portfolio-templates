import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getProducts } from "./action";
import HomeComponent from "@/components/Home";


export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product"],
    queryFn: () => getProducts(),
  });
 

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <HomeComponent />
     </HydrationBoundary>

  );
}
