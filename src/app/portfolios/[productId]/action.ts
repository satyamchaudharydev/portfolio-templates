"use server";

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

export const updateTemplateFields = async ({orderItemId,updateTemplateFields}:{orderItemId: number, updateTemplateFields: object}) => {
  // const userId = await getUserId();

  // if (!userId) {
  //   throw new Error("User not authenticated");
  // }
  console.log(updateTemplateFields, "updateTemplateFields");
  const res = await db.orderItem.update({
    where: {
      id: orderItemId,
    },
    data: {
      userTemplateFields: updateTemplateFields,
      
    },
  });
  console.log(res, "res");
  return {
    success: true,
  }
}

