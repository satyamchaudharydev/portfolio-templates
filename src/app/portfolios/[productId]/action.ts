import { getUserId } from "@/app/action";
import { db } from "@/db";

export const getOrderItemDetails = async (orderItemId: number) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  // Query the database for the specific OrderItem
  const orderItem = await db.orderItem.findUnique({
    where: {
      id: orderItemId,

    },
    include: {
      product: true, 
      order: true,  
    },
  });

  if (!orderItem) {
    throw new Error("Order item not found.");
  }

  // Optional: Verify that the order item belongs to the user
  if (orderItem.order.userId !== userId) {
    throw new Error("User is not authorized to view this order item.");
  }

  return orderItem;
};
