"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createSnippet } from "../data/snippet";

type Errors = {
  title?: string;
  description?: string;
  snippet?: string;
  visibility?: string;
};

export type FormState = {
  errors: Errors;
};

export async function addSnippet(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated");

  const formFields = Object.fromEntries(formData);

  const SnippetData = z.object({
    title: z
      .string()
      .max(70, { message: "Title must be less than 255 characters" })
      .nonempty({ message: "Title is required" }),
    description: z.string(),
    snippet: z.string().nonempty({ message: "Snippet is required" }),
    visibility: z.enum(["PUBLIC", "PRIVATE"]).default("PUBLIC"),
  });

  const validateFields = SnippetData.safeParse(formFields);
  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;

    return {
      errors: {
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
        snippet: fieldErrors.snippet?.[0],
        visibility: fieldErrors.visibility?.[0],
      },
    };
  }
  await createSnippet(userId, validateFields.data);

  return { errors: {} };
}
