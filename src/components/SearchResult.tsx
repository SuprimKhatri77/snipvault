"use client"

import Link from "next/link"
import { Eye, EyeOff, FileCode, User, Clock, Copy, ExternalLink, Search } from "lucide-react"
import { useState } from "react"
import { SnippetWithUser } from "@/app/search/page"

export default function SearchResult({ snippets, query }: { snippets: SnippetWithUser[]; query: string }) {
    const [copied, setCopied] = useState<string>("")

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(""), 2000)
    }

    const getLanguageIcon = (title: string) => {
        const extension = title.split(".").pop()?.toLowerCase() || ""

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
        const now = new Date()

        if (date.toDateString() === now.toDateString()) {
            return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
        }

        const yesterday = new Date(now)
        yesterday.setDate(now.getDate() - 1)
        if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday"
        }

        return date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const highlightText = (text: string, query: string) => {
        if (!query) return text
        const regex = new RegExp(`(${query})`, "gi")
        const parts = text.split(regex)

        return parts.map((part, index) =>
            regex.test(part) ? (
                <span key={index} className="bg-yellow-500/30 text-yellow-200 px-1 rounded">
                    {part}
                </span>
            ) : (
                part
            ),
        )
    }

    if (!snippets || snippets.length === 0) {
        return (
            <div className="min-h-screen bg-[#0F172A] pt-20 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-12 text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#0F172A] mb-6">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-2">No snippets found</h3>
                        <p className="text-gray-400 text-lg">
                            No results found for "<span className="text-white font-medium">{query}</span>"
                        </p>
                        <p className="text-gray-500 mt-2">Try adjusting your search terms or browse all snippets</p>
                        <Link
                            href="/dashboard"
                            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Go To Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0F172A] pt-20 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Results Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
                    <p className="text-gray-400">
                        Found <span className="text-green-400 font-semibold">{snippets.length}</span> snippet
                        {snippets.length !== 1 ? "s" : ""} for "<span className="text-white font-medium">{query}</span>"
                    </p>
                </div>

                {/* Search Results Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {snippets.map((snippet) => (
                        <div
                            key={snippet.snippet.id}
                            className="group bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl border border-[#334155] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:border-[#475569] hover:scale-[1.02]"
                        >
                            {/* Card Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                                        <div className={`flex-shrink-0 p-2 rounded-md ${getLanguageIcon(snippet.snippet.title)}`}>
                                            <FileCode className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-xl text-white group-hover:text-green-400 transition-colors duration-200 truncate">
                                                {highlightText(snippet.snippet.title, query)}
                                            </h3>
                                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                                {snippet.snippet.description ? highlightText(snippet.snippet.description, query) : "No description provided"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${snippet.snippet.visibility === "PRIVATE"
                                                ? "bg-gray-800 text-gray-300 border border-gray-700"
                                                : "bg-green-900/50 text-green-300 border border-green-800"
                                                }`}
                                        >
                                            {snippet.snippet.visibility === "PRIVATE" ? (
                                                <EyeOff className="mr-1 h-3 w-3" />
                                            ) : (
                                                <Eye className="mr-1 h-3 w-3" />
                                            )}
                                            {snippet.snippet.visibility === "PRIVATE" ? "Private" : "Public"}
                                        </span>
                                    </div>
                                </div>

                                {/* Author and Date Info */}
                                <div className="flex items-center text-xs text-gray-400 mb-4">
                                    <User className="h-3 w-3 mr-1" />
                                    <span className="mr-3">{snippet.user.name} </span> {/* You'll need to add author data to your schema */}
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{formatDate(snippet.snippet.createdAt)}</span>
                                </div>
                            </div>

                            {/* Code Preview */}
                            <div className="px-6 pb-4">
                                <div className="relative rounded-lg bg-[#0D1117] border border-[#21262D] overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#161B22] to-transparent pointer-events-none z-10"></div>
                                    <pre className="p-4 text-sm font-mono whitespace-pre-wrap text-gray-300 overflow-hidden max-h-32">
                                        {(() => {
                                            const content = snippet.snippet.snippet.replace(/\r\n/g, '\n'); // normalize
                                            const truncated = content.length > 300 ? `${content.substring(0, 300)}...` : content;
                                            return truncated;
                                        })()}
                                    </pre>
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0D1117] to-transparent pointer-events-none z-10"></div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-6 py-4 bg-[#1A2234] border-t border-[#334155]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => copyToClipboard(snippet.snippet.snippet, snippet.snippet.id)}
                                            className={`px-3 py-1.5 rounded-md flex items-center text-xs font-medium transition-colors ${copied === snippet.snippet.id
                                                ? "bg-green-900/50 text-green-300"
                                                : "bg-[#0F172A] text-gray-400 hover:text-white hover:bg-[#1E293B]"
                                                }`}
                                        >
                                            {copied === snippet.snippet.id ? (
                                                <>
                                                    <span className="mr-1">✓</span>
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3 w-3 mr-1" />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <Link
                                        href={`/snippets/${snippet.snippet.id}`}
                                        className="px-4 py-1.5 rounded-md flex items-center text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors group"
                                    >
                                        <ExternalLink className="h-3 w-3 mr-1 group-hover:translate-x-0.5 transition-transform" />
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-400">
                        Showing {snippets.length} result{snippets.length !== 1 ? "s" : ""} for "{query}"
                    </p>
                </div>
            </div>
        </div>
    )
}
