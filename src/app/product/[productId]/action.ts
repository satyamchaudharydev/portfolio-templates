import { db } from "@/db";

export const getProduct = async (productId: number) => {
  return await db.product.findUnique({
    where: {
      id: productId,
    },
  });
};
