"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getSnippetById, deleteSnippet } from "../../actions/snippet"
import {
    ArrowLeft,
    Copy,
    Check,
    Edit,
    Trash2,
    Share2,
    Eye,
    EyeOff,
    FileCode,
    User,
    Clock,
    AlertTriangle,
} from "lucide-react"
import type { snippetType } from "../../lib/db/schema"
import { useUser } from "@clerk/nextjs"

export default function SnippetDetailPage({ id }: { id: string }) {
    const router = useRouter()
    const [snippet, setSnippet] = useState<snippetType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const snippetId = id

    const { user } = useUser()
    const userId = user?.id


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

    const copyToClipboard = () => {
        if (snippet) {
            navigator.clipboard.writeText(snippet.snippet)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleDelete = async () => {
        if (!snippet) return

        setIsDeleting(true)
        try {
            await deleteSnippet(snippet.id)
            router.push("/dashboard")
        } catch (err) {
            console.error("Error deleting snippet:", err)
            setError("Failed to delete snippet")
            setIsDeleting(false)
        }
    }

    const getLanguageIcon = (title: string) => {
        const extension = title?.split(".").pop()?.toLowerCase() || ""

        switch (extension) {
            case "js":
            case "jsx":
                return "bg-yellow-500"
            case "ts":
            case "tsx":
                return "bg-blue-500"
            case "py":
                return "bg-green-500"
            case "html":
                return "bg-orange-500"
            case "css":
                return "bg-purple-500"
            case "json":
                return "bg-gray-500"
            case "md":
                return "bg-teal-500"
            default:
                return "bg-emerald-500"
        }
    }

    const formatDate = (dateInput: string | Date | null | undefined) => {
        if (!dateInput) return ""

        const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

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
                        href="/dashboard"
                        className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Snippet Header */}
                <div className="bg-[#1E293B] rounded-t-xl p-6 border border-[#334155] border-b-0 shadow-lg">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex items-start space-x-4">
                            <div className={`flex-shrink-0 p-3 rounded-md ${getLanguageIcon(snippet.title)}`}>
                                <FileCode className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
                                <p className="text-gray-400 mt-2">{snippet.description || "No description provided"}</p>
                                <div className="flex items-center mt-3 text-sm text-gray-500">
                                    {snippet.userId === userId && (
                                        <>
                                            <User className="h-4 w-4 mr-1" />

                                            <span className="mr-4">
                                                You
                                            </span>
                                        </>
                                    )}
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>Created on {formatDate(snippet.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${snippet.visibility === "PRIVATE"
                                    ? "bg-gray-800 text-gray-300 border border-gray-700"
                                    : "bg-green-900/50 text-green-300 border border-green-800"
                                    }`}
                            >
                                {snippet.visibility === "PRIVATE" ? (
                                    <EyeOff className="mr-1.5 h-4 w-4" />
                                ) : (
                                    <Eye className="mr-1.5 h-4 w-4" />
                                )}
                                {snippet.visibility === "PRIVATE" ? "Private" : "Public"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Snippet Content */}
                <div className="bg-[#0D1117] border-x border-[#334155] overflow-hidden">
                    <div className="relative">
                        <pre className="p-6 text-sm md:text-base font-mono whitespace-pre-wrap text-gray-300 overflow-auto max-h-[70vh]">
                            {snippet.snippet}
                        </pre>
                    </div>
                </div>

                {/* Snippet Actions */}
                <div className="bg-[#1E293B] rounded-b-xl p-4 border border-[#334155] border-t-0 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={copyToClipboard}
                                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${copied
                                    ? "bg-green-900/50 text-green-300 border border-green-800"
                                    : "bg-[#0F172A] text-gray-300 border border-[#334155] hover:bg-[#2D3748] hover:text-white"
                                    }`}
                            >
                                {copied ? <Check className="mr-1.5 h-4 w-4" /> : <Copy className="mr-1.5 h-4 w-4" />}
                                {copied ? "Copied!" : "Copy Code"}
                            </button>
                            <button className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-[#0F172A] text-gray-300 border border-[#334155] hover:bg-[#2D3748] hover:text-white transition-colors">
                                <Share2 className="mr-1.5 h-4 w-4" />
                                Share
                            </button>
                        </div>
                        {snippet.userId === userId && (

                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href={`/snippets/${snippet.id}/edit`}
                                    className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                    <Edit className="mr-1.5 h-4 w-4" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                                    disabled={isDeleting}
                                >
                                    <Trash2 className="mr-1.5 h-4 w-4" />
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        )}

                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#1E293B] rounded-xl p-6 max-w-md w-full border border-[#334155] shadow-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Delete Snippet</h3>
                            <p className="text-gray-300 mb-6">
                                Are you sure you want to delete this snippet? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 border border-[#334155] text-gray-300 rounded-lg hover:bg-[#334155] transition-colors"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
