import { and, eq, ilike, or } from "drizzle-orm";
import { db } from "../../../lib/db";
import { snippetTable, userTable } from "../../../lib/db/schema";

export async function getSnippet(query?: string) {
  if (query) {
    return db
      .select({
        snippet: snippetTable,
        user: userTable,
      })
      .from(snippetTable)
      .innerJoin(userTable, eq(snippetTable.userId, userTable.id))
      .where(
        and(
          eq(snippetTable.visibility, "PUBLIC"),
          or(
            ilike(snippetTable.title, `%${query}%`),
            ilike(snippetTable.description, `%${query}%`)
          )
        )
      );
  }
  return [];
}
