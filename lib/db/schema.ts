import {
  text,
  pgTable,
  pgEnum,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { InferInsertModel, relations } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm";

export const planEnum = pgEnum("plan", ["FREE", "GOLD", "DIAMOND"]);
export const visibilityEnum = pgEnum("visibility", ["PRIVATE", "PUBLIC"]);

export const userTable = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  plan: planEnum("plan").default("FREE"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const snippetTable = pgTable("snippets", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  snippet: text("snippet").notNull(),
  userId: text("user_id")
    .references(() => userTable.id)
    .notNull(),
  visibility: visibilityEnum("visibility").default("PUBLIC"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const userRelation = relations(userTable, ({ many }) => ({
  snippets: many(snippetTable),
}));

export const snippetRelation = relations(snippetTable, ({ one }) => ({
  user: one(userTable, {
    fields: [snippetTable.userId],
    references: [userTable.id],
  }),
}));

// export const snippetUserVisibilityIndex = index("user_visibility_index").on(
//   snippetTable.userId,
//   snippetTable.visibility
// );

export type userType = InferSelectModel<typeof userTable>;
export type snippetType = InferSelectModel<typeof snippetTable>;
export type SnippetInsertType = InferInsertModel<typeof snippetTable>;
