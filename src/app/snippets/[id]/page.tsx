import SnippetDetailPage from "@/components/SnippetDetailPage"

export default async function snippetEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) throw new Error("Snippet must contain a id.")
    return <SnippetDetailPage id={id} />
}