import { NextRequest } from "next/server";
import { db } from "../../../../../lib/db";
import { userTable } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, username, email } = body;

    if (!id || !email) {
      return new Response("Missing required fields", { status: 400 });
    }

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    if (existingUser.length > 0) {
      await db
        .update(userTable)
        .set({
          name: username || "",
          email,
        })
        .where(eq(userTable.id, id));

      return new Response("User updated", { status: 200 });
    } else {
      await db.insert(userTable).values({
        id,
        name: username || "",
        email,
      });

      return new Response("User created", { status: 201 });
    }
  } catch (err) {
    console.error("Error syncing user:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
