import EditSnippetPage from "@/components/EditForm"

export default async function snippetEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    if (!id) throw new Error("Snippet must contain a id.")
    return <EditSnippetPage id={id} />
}