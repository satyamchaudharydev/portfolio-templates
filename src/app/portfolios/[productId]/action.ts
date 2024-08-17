import { getUserId } from "@/app/action";
import { db } from "@/db"; 

export const getOrderedPortfolioForProduct = async (productId: number) => {
    const userId = await getUserId()
  // Query the database for orders where the user has paid and the order includes the specific productId
  const orderedPortfolio = await db.orderItem.findMany({
    where: {
      order: {
        userId: userId,
        paid: true, // Only get orders where payment has been completed
      },
      productId: productId, 
    },
    include: {
      product: true, 
      order: true,  
    },
  });

  return orderedPortfolio?.[0];
};
