import { NextResponse } from 'next/server';
import { db } from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(request: Request) {
  try {
    const userSession = await getServerSession(authOptions) as any;

    if (!userSession?.userId) {
      return NextResponse.json({ success: false, error: 'User not authenticated' });
    }

    const { cartItems } = await request.json();

    if (!Array.isArray(cartItems)) {
      return NextResponse.json({ success: false, error: 'Invalid cart items data' });
    }

    // Process cart items
    for (const item of cartItems) { 
      await db.cartItem.upsert({
        where: {
          cardId: {
            userId: userSession.userId,
            productId: item.productId,
          },
        },
        update: {
          quantity: { increment: item.quantity },
        },
        create: {
          userId: userSession.userId,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating cart data:', error);
    return NextResponse.json({ success: false, error: 'Failed to update cart data' });
  }
}
