"use server";
import { db } from "../lib/db";
import { SnippetInsertType, snippetTable } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import { snippetType } from "../lib/db/schema";
import { auth } from "@clerk/nextjs/server";

// create
export async function createSnippet(
  userId: string,
  data: Omit<SnippetInsertType, "userId">
) {
  await db.insert(snippetTable).values({ ...data, userId });
}

// read
export async function getAllSnippets() {
  const { userId } = await auth();
  if (!userId) return [];
  return await db
    .select()
    .from(snippetTable)
    .where(eq(snippetTable.userId, userId));
}
