import SearchResult from "@/components/SearchResult";
import { getSnippet } from "./search-filter";
import { snippetType, userType } from "../../../lib/db/schema";

export type SnippetWithUser = {
    snippet: snippetType;
    user: userType;
}

export default async function SearchQuery({ searchParams }: { searchParams: Promise<{ query: string }> }) {
    const { query } = await searchParams;
    const snippets: SnippetWithUser[] = await getSnippet(query)
    if (!snippets) {
        throw new Error("Snippet not found!")
    }

    return <SearchResult snippets={snippets} query={query} />
}