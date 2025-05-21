import Stripe from "stripe";
import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db";
import { userTable } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  console.log("🚨 Incoming Stripe webhook");

  const rawBody = await req.text();
  const sig = req.headers.get("Stripe-Signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    console.log(`✔️ Verified signature. Event: ${event.type}`);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId) {
          console.warn("⚠️ No userId in session metadata");
          break;
        }

        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        if (!subscriptionId) {
          console.warn("⚠️ No subscription ID in session");
          break;
        }

        const sub = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = sub.items.data[0]?.price.id ?? "FREE";

        const plan =
          priceId === "price_1RLgZIHHy9yWdGH0yXoDaMdU"
            ? "GOLD"
            : priceId === "price_1RLgdXHHy9yWdGH0qQrV5Ci9"
            ? "DIAMOND"
            : "FREE";

        await db
          .update(userTable)
          .set({ plan, updatedAt: new Date() })
          .where(eq(userTable.id, userId));

        console.log(`✅ Updated user ${userId} to plan: ${plan}`);
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata.userId;

        if (!userId) {
          console.warn("⚠️ No userId in subscription metadata");
          break;
        }

        const priceId = sub.items.data[0]?.price.id ?? "FREE";

        const plan =
          event.type === "customer.subscription.deleted"
            ? "FREE"
            : priceId === "price_1RLgZIHHy9yWdGH0yXoDaMdU"
            ? "GOLD"
            : priceId === "price_1RLgdXHHy9yWdGH0qQrV5Ci9"
            ? "DIAMOND"
            : "FREE";

        await db
          .update(userTable)
          .set({ plan, updatedAt: new Date() })
          .where(eq(userTable.id, userId));

        console.log(
          `✅ Updated user ${userId} to plan: ${plan} due to ${event.type}`
        );
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("❌ Error handling webhook:", err);
    return new NextResponse("Webhook handler error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}
