"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/db";
import { userTable, snippetTable } from "../lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, count } from "drizzle-orm";
import { z } from "zod";

export type FormState = {
  errors?: {
    title?: string[];
    description?: string[];
    snippet?: string[];
    visibility?: string[];
    id?: string[];
  };
  message?: string | null;
  success?: boolean;
  limitReached?: boolean;
  currentCount?: number;
  maxCount?: number;
};

const SnippetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  snippet: z.string().min(1, "Snippet code is required"),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
});

// Plan limits for snippets
const PLAN_LIMITS = {
  FREE: 2,
  GOLD: 100,
  DIAMOND: 400,
};

// Get user's plan and snippet count
async function getUserPlanAndSnippetCount(userId: string) {
  // Get user's plan
  const userResult = await db
    .select({ plan: userTable.plan })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);
  const userPlan = userResult.length > 0 ? userResult[0].plan : "FREE";

  // Count user's snippets
  const snippetCountResult = await db
    .select({ value: count() })
    .from(snippetTable)
    .where(eq(snippetTable.userId, userId));

  const snippetCount = snippetCountResult[0]?.value || 0;
  const maxSnippets =
    PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.FREE;

  return {
    plan: userPlan,
    snippetCount,
    maxSnippets,
    canCreateMore: snippetCount < maxSnippets,
  };
}

export async function addSnippet(prevState: FormState, formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {},
      message: "You must be logged in to create a snippet",
    };
  }

  // Check user's plan and snippet count
  const { snippetCount, maxSnippets, canCreateMore } =
    await getUserPlanAndSnippetCount(userId);

  // If user has reached their plan limit
  if (!canCreateMore) {
    return {
      errors: {},
      message: "You've reached your plan's snippet limit",
      limitReached: true,
      currentCount: snippetCount,
      maxCount: maxSnippets,
      success: false,
    };
  }

  const validatedFields = SnippetSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    snippet: formData.get("snippet"),
    visibility: formData.get("visibility"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  const { title, description, snippet, visibility } = validatedFields.data;

  try {
    await db.insert(snippetTable).values({
      title,
      description,
      snippet,
      visibility,
      userId,
    });

    revalidatePath("/dashboard");
    return {
      message: "Snippet created successfully",
      success: true,
      currentCount: snippetCount + 1,
      maxCount: maxSnippets,
    };
  } catch (error) {
    console.error("Error creating snippet:", error);
    return {
      errors: {},
      message: "Failed to create snippet",
    };
  }
}

export async function updateSnippetAction(
  prevState: FormState,
  formData: FormData
) {
  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {},
      message: "You must be logged in to update a snippet",
    };
  }

  const id = formData.get("id") as string;

  if (!id) {
    return {
      errors: { id: ["Snippet ID is required"] },
      message: "Invalid snippet ID",
    };
  }

  const validatedFields = SnippetSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    snippet: formData.get("snippet"),
    visibility: formData.get("visibility"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  const { title, description, snippet, visibility } = validatedFields.data;

  try {
    await db
      .update(snippetTable)
      .set({
        title,
        description,
        snippet,
        visibility: visibility as "PUBLIC" | "PRIVATE",
        updatedAt: new Date(),
      })
      .where(eq(snippetTable.id, id));

    revalidatePath("/dashboard");
    revalidatePath(`/snippets/${id}`);
    return { message: "Snippet updated successfully", success: true };
  } catch (error) {
    console.error("Error updating snippet:", error);
    return {
      errors: {},
      message: "Failed to update snippet",
    };
  }
}

export async function updateSnippet(data: {
  id: string;
  title: string;
  description?: string;
  snippet: string;
  visibility: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to update a snippet");
  }

  const validatedFields = SnippetSchema.safeParse({
    title: data.title,
    description: data.description,
    snippet: data.snippet,
    visibility: data.visibility,
  });

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { title, description, snippet, visibility } = validatedFields.data;

  try {
    await db
      .update(snippetTable)
      .set({
        title,
        description,
        snippet,
        visibility: visibility as "PUBLIC" | "PRIVATE",
        updatedAt: new Date(),
      })
      .where(eq(snippetTable.id, data.id));

    revalidatePath("/dashboard");
    revalidatePath(`/snippets/${data.id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating snippet:", error);
    throw new Error("Failed to update snippet");
  }
}

export async function getAllSnippets() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  try {
    const snippets = await db
      .select()
      .from(snippetTable)
      .where(eq(snippetTable.userId, userId));
    return snippets;
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return [];
  }
}

export async function getSnippetById(id: string) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const snippets = await db
      .select()
      .from(snippetTable)
      .where(eq(snippetTable.id, id))
      .limit(1);

    return snippets.length > 0 ? snippets[0] : null;
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return null;
  }
}

export async function deleteSnippet(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to delete a snippet");
  }

  try {
    await db.delete(snippetTable).where(eq(snippetTable.id, id));
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting snippet:", error);
    throw new Error("Failed to delete snippet");
  }
}

export async function getUserSnippetStats() {
  const { userId } = await auth();

  if (!userId) {
    return {
      currentCount: 0,
      maxCount: PLAN_LIMITS.FREE,
      percentage: 0,
      plan: "FREE",
    };
  }

  const { plan, snippetCount, maxSnippets } = await getUserPlanAndSnippetCount(
    userId
  );

  return {
    currentCount: snippetCount,
    maxCount: maxSnippets,
    percentage: Math.round((snippetCount / maxSnippets) * 100),
    plan,
  };
}
