import { db } from "@/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET(){
    const user = await getServerSession(authOptions) as any;
    console.log(user, "user")
    if(!user) {
        return NextResponse.json({message: "User not found", ok: false}, {status: 404});
    }
  try {
    // Fetch cart items for the user
    const cartItems = await db.cartItem.findMany({
      where: { userId: user.userId },
      include: {
        product: true, // Include product details if needed
      },
    });

    return NextResponse.json(cartItems);

  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items");
}
}