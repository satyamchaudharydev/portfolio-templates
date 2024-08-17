import { db } from "@/db";
import { getUserId } from "../action"

export const getPurchasedPortfolios = async (userId: string) => {
    if(!userId){
        throw new Error("User not authenticated")
    }
    const paidOrders = await db.order.findMany({
        where: {
          userId: userId,
          paid: true,
        },
        include: {
            products: {
                include: {
                product: true,
                },
            },
        },
      });
      const purchasedPortfolios = paidOrders.flatMap((order) =>
      order.products.map((orderItem) => ({
        productId: orderItem.productId,
        name: orderItem.product.name,
        price: orderItem.product.price,
        description: orderItem.product.description,
        image: orderItem.product.image,
        cardItemId: orderItem.id,
      }))
    );
      return purchasedPortfolios;
        
}