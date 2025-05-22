import type { NextRequest } from "next/server";
import { db } from "../../../../../lib/db";
import { userTable } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, username, email, event } = body;

    if (!id) {
      return new Response("Missing user ID", { status: 400 });
    }

    switch (event) {
      case "user.deleted":
        await db.delete(userTable).where(eq(userTable.id, id));
        return new Response("User deleted", { status: 200 });

      case "user.updated":
        if (!email) {
          return new Response("Missing email for user update", { status: 400 });
        }

        const existingUser = await db
          .select()
          .from(userTable)
          .where(eq(userTable.id, id));

        if (existingUser.length === 0) {
          return new Response("User not found", { status: 404 });
        }

        await db
          .update(userTable)
          .set({
            name: username || existingUser[0].name || "",
            email,
            updatedAt: new Date(),
          })
          .where(eq(userTable.id, id));

        return new Response("User updated", { status: 200 });

      case "user.created":
      default:
        if (!email) {
          return new Response("Missing email for user creation", {
            status: 400,
          });
        }

        const userExists = await db
          .select()
          .from(userTable)
          .where(eq(userTable.id, id));

        if (userExists.length > 0) {
          await db
            .update(userTable)
            .set({
              name: username || userExists[0].name || "",
              email,
              updatedAt: new Date(),
            })
            .where(eq(userTable.id, id));

          return new Response("User updated", { status: 200 });
        } else {
          await db.insert(userTable).values({
            id,
            name: username || "",
            email,
            plan: "FREE",
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          return new Response("User created", { status: 201 });
        }
    }
  } catch (err) {
    console.error("Error syncing user:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
