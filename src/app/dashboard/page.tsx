"use client"

import { useState, useEffect, useRef } from "react"
import { useActionState } from "react"
import { addSnippet, type FormState } from "../../../actions/snippet"
import { getAllSnippets } from "../../../data/snippet"
import {
    Clipboard,
    Eye,
    EyeOff,
    X,
    Plus,
    Code,
    Search,
    Calendar,
    Filter,
    SortAsc,
    Trash2,
    Edit,
    Share2,
} from "lucide-react"
import type { snippetType } from "../../../lib/db/schema"
import { motion, AnimatePresence } from "framer-motion"

export default function Dashboard() {
    const initialState: FormState = { errors: {} }
    const [state, formAction, isPending] = useActionState<FormState, FormData>(addSnippet, initialState)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [snippets, setSnippets] = useState<snippetType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [copied, setCopied] = useState<string>("")
    const [activeFilter, setActiveFilter] = useState<string>("all")
    const [expandedSnippet, setExpandedSnippet] = useState<string | null>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                // Use the server action to get snippets
                const data = await getAllSnippets()
                setSnippets(data || [])
            } catch (error) {
                console.error("Error fetching snippets:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSnippets()
    }, [])

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(""), 2000)
    }

    const toggleExpandSnippet = (id: string) => {
        setExpandedSnippet(expandedSnippet === id ? null : id)
    }

    const filteredSnippets = snippets.filter(
        (snippet) =>
            snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snippet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            false,
    )

    const displaySnippets =
        activeFilter === "all"
            ? filteredSnippets
            : filteredSnippets.filter((snippet) => snippet.visibility === activeFilter.toUpperCase())

    return (
        <div className="relative bg-[#0F172A] text-gray-100">
            {/* Dashboard Layout */}
            <div className="flex flex-col lg:flex-row relative">
                {/* Sidebar Container - This will be relative positioned */}
                <div className="lg:w-64 relative">
                    <div
                        ref={sidebarRef}
                        className="lg:sticky lg:top-16 bg-[#1E293B] lg:h-[calc(100vh-16px)] lg:overflow-y-auto z-10"
                    >
                        <div className="flex flex-col h-full">
                            <div className="px-6 pt-6 pb-4">
                                <h2 className="text-lg font-semibold text-white">My Snippets</h2>
                                <p className="text-sm text-gray-400 mt-1">Manage your code snippets</p>
                            </div>
                            <nav className="mt-6 px-3 flex-1">
                                <div className="space-y-1">
                                    <button
                                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full ${activeFilter === "all"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-300 hover:bg-[#2D3748] hover:text-white"
                                            }`}
                                        onClick={() => setActiveFilter("all")}
                                    >
                                        <Code className="mr-3 h-5 w-5 flex-shrink-0" />
                                        All Snippets
                                    </button>
                                    <button
                                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full ${activeFilter === "public"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-300 hover:bg-[#2D3748] hover:text-white"
                                            }`}
                                        onClick={() => setActiveFilter("public")}
                                    >
                                        <Eye className="mr-3 h-5 w-5 flex-shrink-0" />
                                        Public
                                    </button>
                                    <button
                                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full ${activeFilter === "private"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-300 hover:bg-[#2D3748] hover:text-white"
                                            }`}
                                        onClick={() => setActiveFilter("private")}
                                    >
                                        <EyeOff className="mr-3 h-5 w-5 flex-shrink-0" />
                                        Private
                                    </button>
                                </div>
                            </nav>
                            <div className="p-4">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <Plus className="mr-2 h-5 w-5" />
                                    New Snippet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:flex-1">
                    {/* Top Navigation */}
                    <div className="sticky top-16 z-10 flex h-16 flex-shrink-0 bg-[#1E293B] shadow-md">
                        <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-1 items-center">
                                <div className="w-full max-w-2xl">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative text-gray-400 focus-within:text-gray-600">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Search className="h-5 w-5" />
                                        </div>
                                        <input
                                            id="search"
                                            className="block w-full rounded-md border-0 bg-[#0F172A] py-2 pl-10 pr-3 text-gray-200 placeholder:text-gray-400 focus:bg-[#1E293B] focus:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm"
                                            placeholder="Search for your snippets..."
                                            type="search"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ml-4 flex items-center gap-3 md:ml-6">
                                <button className="rounded-full bg-[#0F172A] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    <Filter className="h-5 w-5" />
                                </button>
                                <button className="rounded-full bg-[#0F172A] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    <SortAsc className="h-5 w-5" />
                                </button>
                                <div className="hidden md:block h-6 w-px bg-gray-600" />
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="hidden md:flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    <Plus className="mr-1 h-4 w-4" />
                                    New Snippet
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <main className="py-8 px-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-white">
                                {activeFilter === "all"
                                    ? "All Snippets"
                                    : activeFilter === "public"
                                        ? "Public Snippets"
                                        : "Private Snippets"}
                            </h1>
                            <p className="mt-1 text-sm text-gray-400">
                                {activeFilter === "all"
                                    ? "Manage and organize all your code snippets"
                                    : activeFilter === "public"
                                        ? "Snippets visible to everyone"
                                        : "Snippets only visible to you"}
                            </p>
                        </div>

                        {/* Create Snippet Form */}
                        <AnimatePresence>
                            {showForm && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="mb-8"
                                >
                                    <div className="bg-[#1E293B] rounded-xl p-6 border border-[#334155] shadow-lg">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-xl font-semibold text-white flex items-center">
                                                <Code className="mr-2 h-5 w-5 text-green-500" />
                                                Create New Snippet
                                            </h2>
                                            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    placeholder="file name with extension (e.g. helper.js)"
                                                    className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 px-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                                                    placeholder="What does this snippet do?"
                                                    className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 px-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                />
                                                {state.errors?.description && (
                                                    <p className="text-red-500 text-sm mt-1">{state.errors.description}</p>
                                                )}
                                            </div>

                                            <div className="md:col-span-2 space-y-2">
                                                <label htmlFor="snippet" className="block text-sm font-medium text-gray-300">
                                                    Code Snippet
                                                </label>
                                                <textarea
                                                    id="snippet"
                                                    name="snippet"
                                                    placeholder="Paste your code here"
                                                    rows={8}
                                                    className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 px-3 font-mono text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                />
                                                {state.errors?.snippet && <p className="text-red-500 text-sm mt-1">{state.errors.snippet}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="visibility" className="block text-sm font-medium text-gray-300">
                                                    Visibility
                                                </label>
                                                <select
                                                    name="visibility"
                                                    id="visibility"
                                                    defaultValue="PUBLIC"
                                                    className="w-full bg-[#0F172A] border border-[#334155] rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                >
                                                    <option value="PUBLIC">Public</option>
                                                    <option value="PRIVATE">Private</option>
                                                </select>
                                                {state.errors?.visibility && (
                                                    <p className="text-red-500 text-sm mt-1">{state.errors.visibility}</p>
                                                )}
                                            </div>

                                            <div className="md:col-span-2 flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowForm(false)}
                                                    className="px-4 py-2 border border-[#334155] text-gray-300 rounded-lg hover:bg-[#334155] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                    disabled={isPending}
                                                >
                                                    {isPending ? "Creating..." : "Create Snippet"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Snippets Grid */}
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="h-12 w-12 rounded-full border-l-2 border-t-2 border-green-500 animate-spin"></div>
                                <p className="mt-4 text-gray-400">Loading your snippets...</p>
                            </div>
                        ) : displaySnippets.length === 0 ? (
                            <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-8 text-center">
                                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#0F172A]">
                                    <Code className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="mt-4 text-xl font-medium text-white">No snippets found</h3>
                                <p className="mt-2 text-gray-400">
                                    {searchTerm ? "Try a different search term" : "Create your first snippet to get started"}
                                </p>
                                {!showForm && !searchTerm && (
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        <Plus className="mr-2 h-5 w-5" />
                                        Create Snippet
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {displaySnippets.map((snippet) => (
                                    <div
                                        key={snippet.id}
                                        className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                                    >
                                        <div className="p-4 border-b border-[#334155]">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 mr-4">
                                                    <h3 className="font-semibold text-lg text-white flex items-center">{snippet.title}</h3>
                                                    <p className="text-gray-400 text-sm mt-1">{snippet.description}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${snippet.visibility === "PRIVATE"
                                                            ? "bg-gray-700 text-gray-300"
                                                            : "bg-green-700 text-green-100"
                                                            }`}
                                                    >
                                                        {snippet.visibility === "PRIVATE" ? (
                                                            <EyeOff className="mr-1 h-3 w-3" />
                                                        ) : (
                                                            <Eye className="mr-1 h-3 w-3" />
                                                        )}
                                                        {snippet.visibility === "PRIVATE" ? "Private" : "Public"}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-4 text-xs text-gray-500">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                <span>{new Date(snippet.createdAt || "").toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div
                                            className={`p-4 bg-[#0F172A] ${expandedSnippet === snippet.id ? "max-h-96" : "max-h-32"} overflow-auto transition-all duration-200`}
                                        >
                                            <pre className="text-sm font-mono whitespace-pre-wrap text-gray-300">{snippet.snippet}</pre>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-[#1E293B] border-t border-[#334155]">
                                            <div className="flex space-x-1">
                                                <button className="p-1 text-gray-400 hover:text-white rounded-md hover:bg-[#334155]">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="p-1 text-gray-400 hover:text-white rounded-md hover:bg-[#334155]">
                                                    <Share2 className="h-4 w-4" />
                                                </button>
                                                <button className="p-1 text-gray-400 hover:text-red-500 rounded-md hover:bg-[#334155]">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => toggleExpandSnippet(snippet.id)}
                                                    className="px-2 py-1 text-xs text-gray-400 hover:text-white rounded-md hover:bg-[#334155]"
                                                >
                                                    {expandedSnippet === snippet.id ? "Show Less" : "Show More"}
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(snippet.snippet, snippet.id)}
                                                    className="px-2 py-1 text-xs bg-[#334155] text-gray-300 hover:text-white rounded-md hover:bg-[#475569] flex items-center"
                                                >
                                                    <Clipboard className="h-3 w-3 mr-1" />
                                                    {copied === snippet.id ? "Copied!" : "Copy"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
