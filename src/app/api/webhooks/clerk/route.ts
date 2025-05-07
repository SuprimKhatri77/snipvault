import { NextRequest } from "next/server";
import { UserJSON } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { db } from "../../../../../lib/db";
import { userTable } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created" || eventType === "user.updated") {
      const user = evt.data as UserJSON;
      const userName = user.username;
      const primaryEmailId = user.primary_email_address_id;
      const emailAddresses = user.email_addresses;

      const primaryEmail = emailAddresses.find(
        (emailObj) => emailObj.id === primaryEmailId
      )?.email_address;

      if (!primaryEmail) {
        console.warn("User doesn't have a primary email address.");
      }

      if (eventType === "user.created") {
        await db.insert(userTable).values({
          id: user.id,
          name: userName || "",
          email: primaryEmail || "",
        });
        console.log("User created in the DB");
        return new Response("User has been created", { status: 200 });
      }

      if (eventType === "user.updated") {
        await db
          .update(userTable)
          .set({
            name: userName || "",
            email: primaryEmail || "",
          })
          .where(eq(userTable.id, user.id));
        console.log("User updated in the DB");
        return new Response("User has been updated", { status: 200 });
      }
      if (eventType === "user.deleted") {
        try {
          await db.delete(userTable).where(eq(userTable.id, user.id));
          console.log(`User with ID ${user.id} deleted from DB.`);
          return new Response("User has been deleted", { status: 200 });
        } catch (err) {
          console.error("Error deleting user:", err);
          return new Response("Failed to delete user!", { status: 500 });
        }
      }
    }

    console.log(`Received webhook with ID ${id} and type ${eventType}`);
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
