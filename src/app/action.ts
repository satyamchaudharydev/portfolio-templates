"use server";

import { db } from "@/db";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { stripe } from "@/lib/stripe";
import { authOptions } from "@/lib/authOptions";

export async function getUserId() {
  const userSession = (await getServerSession(authOptions)) as any;
  return userSession?.["userId"] || "";
}
export async function addOrUpdateCartItem(productId: number, quantity: number) {
  const userId = await getUserId();
  const prisma = new PrismaClient();

  try {
    const existingCartItem = await db.cartItem.upsert({
      where: {
        cardId: {
          userId,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId,
        productId,
        quantity,
      },
    });
    return existingCartItem;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
}
export async function getProducts() {
  const products = await db.product.findMany();
  return products;
}

export async function getCart() {

  try {
    // Fetch cart items for the user
    const cartItems = await axios.get("/api/cart");
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items");
  }
}

export async function incrementCartItem(productId: number) {
  const userId = await getUserId();

  try {
    await db.cartItem.update({
      where: {
        cardId: {
          userId: userId,
          productId: productId,
        },
      },
      data: {
        quantity: { increment: 1 },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error incrementing cart item:", error);
    throw new Error("Failed to increment cart item");
  }
}

export async function decrementCartItem(productId: number) {
  const userId = await getUserId();

  try {
    const cartItem = await db.cartItem.findUnique({
      where: {
        cardId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    if (cartItem.quantity > 1) {
      await db.cartItem.update({
        where: {
          cardId: {
            userId: userId,
            productId: productId,
          },
        },
        data: {
          quantity: { decrement: 1 },
        },
      });
    } else {
      await db.cartItem.delete({
        where: {
          cardId: {
            userId: userId,
            productId: productId,
          },
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error decrementing cart item:", error);
    throw new Error("Failed to decrement cart item");
  }
}

export const deleteCartItem = async (productId: number) => {
  const userId = await getUserId();
  if(!userId) throw new Error("You must be logged in to delete a cart item");
  try {
    console.log("Deleting cart item", productId);
    await db.cartItem.delete({
      where: {
        cardId: {
          userId: userId,
          productId: productId,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw new Error("Failed to delete cart item");
  }
}
const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export const createCheckoutSession = async ({
  configId,
}: {
  configId?: string;
}) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("You must be logged in to create a checkout session");
  }

  // Fetch active products from Stripe
  let activeProducts = await getActiveProducts();
  
  // Fetch user's cart products from DB
  const cartProducts = await db.cartItem.findMany({
    where: {
      userId,
    },
    include: {
      product: true,
    },
  });

  if (cartProducts.length === 0) {
    throw new Error("No products in the cart");
  }

  let orderIds: string[] = []; // Store order IDs to pass in metadata

  // Iterate through cart products
  for (const cartProduct of cartProducts) {
    const { product, quantity } = cartProduct;
    
    // Check if the product is already created in Stripe
    let stripeProduct = activeProducts?.find(
      (stripeProduct: any) =>
        stripeProduct?.name?.toLowerCase() == product?.name?.toLowerCase()
    );

    if (!stripeProduct) {
      // Create product in Stripe if not found
      stripeProduct = await stripe.products.create({
        name: product.name,
        images: [product.image],
        default_price_data: {
          unit_amount: product.price * 100, // Make sure the price is in cents
          currency: "usd",
        },
      });

      // Update active products list after creating a new product
      activeProducts = await getActiveProducts();
    }

    // Create order for each product in DB
    const newOrder = await db.order.create({
      data: {
        userId,
        total: product.price * quantity,
        stripeId: stripeProduct.id,
        products: {
          create: {
            productId: product.id,
             userTemplateFields: product.templateFields || {},
            quantity,
          },
        },
      },
    });

    // Store order ID for passing into metadata
    orderIds.push(newOrder.id.toString());
  }

  let stripeItems: any = [];

  // Build Stripe line items
  for (const cartProduct of cartProducts) {
    const { product, quantity } = cartProduct;

    const stripeProduct = activeProducts?.find(
      (prod: any) => prod?.name?.toLowerCase() == product?.name?.toLowerCase()
    );

    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct.default_price,
        quantity: quantity,
      });
    }
  }

  // Create Stripe Checkout Session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?orderId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    payment_method_types: ["card"],
    mode: "payment",
    metadata: {
      userId,
      orderIds: orderIds.join(','), // Pass all order IDs as metadata
    },
    line_items: stripeItems,
  });

  return { url: stripeSession.url };
};

