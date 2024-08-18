"use server";

import { getUserId } from "../action";
import { db } from "@/db";

export const getAuthStatus = async (cartItems: any) => {
  const userId = await getUserId();
  let isNewUser = false;

  if (!userId) {
    throw new Error("User not authenticated");
  }
  const existingUser = await db.user.findFirst({
    where: { id: userId.id },
  });
  if (!existingUser) {
    isNewUser = true;
    await db.user.create({
      data: {
        id: userId.id,
        email: userId.email,
        name: userId.name,
      },
    });
    for (const item of cartItems) {
      await db.cartItem.upsert({
        where: {
          cardId: {
            userId: userId,
            productId: item.productId,
          },
        },
        update: {
          quantity: { increment: item.quantity },
        },
        create: {
          userId: userId,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
  }
  return { success: true, isNewUser  };
};
