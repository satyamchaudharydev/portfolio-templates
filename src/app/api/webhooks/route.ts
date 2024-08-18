import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      throw new Error("Invalid signature");
    }

    // Verify Stripe event signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.customer_details?.email) {
        throw new Error("Invalid email");
      }

      // Extract fields from metadata
      const { userId, orderIds, productIds } = session.metadata || {
        userId: null,
        orderIds: null,
        productIds: null,
      };

      if (!userId || !orderIds || !productIds) {
        throw new Error("Invalid metadata");
      }

      // Split orderIds and productIds into arrays
      const orderIdArray = orderIds.split(",").map(Number);
      const productIdArray = productIds.split(",").map(Number);

      await db.$transaction(async (transaction) => {
        // Batch delete cart items for all productIds
        await transaction.cartItem.deleteMany({
          where: {
            userId: userId,
            productId: { in: productIdArray },
          },
        });

        // Batch update orders to mark them as paid
        await transaction.order.updateMany({
          where: { id: { in: orderIdArray } },
          data: { paid: true },
        });
      });

      return new Response("success", { status: 200 });
    }
  } catch (error) {
    console.error("Error processing webhook event", error);
    return NextResponse.json(
      { message: "Error processing webhook event", ok: false },
      { status: 500 }
    );
  }
}
