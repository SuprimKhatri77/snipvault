"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useActionState } from "react"
import { type FormState, getSnippetById, updateSnippetAction } from "../../actions/snippet"
import { ArrowLeft, Save, X, AlertTriangle } from "lucide-react"
import type { snippetType } from "../../lib/db/schema"

export default function EditSnippetPage({ id }: { id: string }) {
    const router = useRouter()
    const [snippet, setSnippet] = useState<snippetType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const snippetId = id

    const initialState: FormState = { errors: {} }
    const [state, formAction, isPending] = useActionState<FormState, FormData>(updateSnippetAction, initialState)

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const data = await getSnippetById(snippetId)
                if (data) {
                    setSnippet(data)
                } else {
                    setError("Snippet not found")
                }
            } catch (err) {
                console.error("Error fetching snippet:", err)
                setError("Failed to load snippet")
            } finally {
                setLoading(false)
            }
        }

        fetchSnippet()
    }, [snippetId])

    useEffect(() => {
        if (state.success) {
            router.push(`/snippets/${snippetId}`)
        }
    }, [state.success, router, snippetId])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F172A] pt-20 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full border-l-2 border-t-2 border-green-500 animate-spin"></div>
                    <p className="mt-4 text-gray-400">Loading snippet...</p>
                </div>
            </div>
        )
    }

    if (error || !snippet) {
        return (
            <div className="min-h-screen bg-[#0F172A] pt-20 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-md w-full bg-[#1E293B] rounded-xl p-8 border border-[#334155] shadow-lg text-center">
                    <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-xl font-bold text-white mb-2">Error</h1>
                    <p className="text-gray-400 mb-6">{error || "Snippet not found"}</p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0F172A] pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        href={`/snippets/${snippet.id}`}
                        className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Snippet
                    </Link>
                </div>

                {/* Edit Form */}
                <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155] shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white">Edit Snippet</h1>
                    </div>

                    <form action={formAction} className="space-y-6">
                        {state.message && !state.success && (
                            <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md">
                                {state.message}
                            </div>
                        )}

                        <input type="hidden" name="id" value={snippetId} />

                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                defaultValue={snippet.title}
                                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 px-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            {state.errors?.title && <p className="text-red-500 text-sm mt-1">{state.errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                defaultValue={snippet.description || ""}
                                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 px-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            {state.errors?.description && <p className="text-red-500 text-sm mt-1">{state.errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="snippet" className="block text-sm font-medium text-gray-300">
                                Code Snippet
                            </label>
                            <textarea
                                id="snippet"
                                name="snippet"
                                defaultValue={snippet.snippet}
                                rows={15}
                                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 px-3 font-mono text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                required
                            />
                            {state.errors?.snippet && <p className="text-red-500 text-sm mt-1">{state.errors.snippet}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="visibility" className="block text-sm font-medium text-gray-300">
                                Visibility
                            </label>
                            <select
                                id="visibility"
                                name="visibility"
                                defaultValue={snippet.visibility || "Public"}
                                className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="PUBLIC">Public</option>
                                <option value="PRIVATE">Private</option>
                            </select>
                            {state.errors?.visibility && <p className="text-red-500 text-sm mt-1">{state.errors.visibility}</p>}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link
                                href={`/snippets/${snippet.id}`}
                                className="px-4 py-2 border border-[#334155] text-gray-300 rounded-lg hover:bg-[#334155] transition-colors"
                            >
                                <span className="flex items-center">
                                    <X className="mr-1.5 h-4 w-4" />
                                    Cancel
                                </span>
                            </Link>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center whitespace-nowrap"
                                disabled={isPending}
                            >
                                <Save className="mr-1.5 h-4 w-4" />
                                {isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
