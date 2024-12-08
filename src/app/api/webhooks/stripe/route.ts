import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const signature = headers().get('stripe-signature')
    const event = stripe.webhooks.constructEvent(
        body,
        signature ?? "",
        process.env.STRIPE_WEBHOOK_SECRET ?? ""
    )

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const { userId } = session.metadata || { userId: null }
        
        if (!userId) {
            return new Response("Invalid metadata", { status: 400})
        }

        await db.user.update({
            where: { id: userId },
            data: {
                plan: "PRO"
            }
        })
    }

    return new Response("Ok", { status: 200})
}