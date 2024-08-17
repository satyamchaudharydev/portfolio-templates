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
      return new Error("Invalid signature");
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
        return new Error("Invalid email");
      }

      // Extract userId and orderIds from metadata
      const { userId, orderIds } = session.metadata || {
        userId: null,
        orderIds: null,
      };

      if (!userId || !orderIds) {
        return new Error("Invalid metadata");
      }

      // Split orderIds (they are passed as a string, so convert them into an array)
      const orderIdArray = orderIds.split(",");

      // Iterate through order IDs and update each order status
      for (const orderId of orderIdArray) {
        await db.order.update({
          where: { id: Number(orderId) },
          data: {
            paid: true 
          },
        });
      }


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
