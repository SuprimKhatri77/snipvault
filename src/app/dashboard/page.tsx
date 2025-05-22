"use client"

import { useState, useEffect, useRef } from "react"
import { useActionState } from "react"
import { addSnippet, type FormState, getUserSnippetStats } from "../../../actions/snippet"
import { getAllSnippets } from "../../../actions/snippet"
import Link from "next/link"
import {
    Eye,
    EyeOff,
    X,
    Plus,
    Code,
    Search,
    Filter,
    SortAsc,
    Copy,
    Check,
    FileCode,
    User,
    Clock,
    ExternalLink,
    Zap,
} from "lucide-react"
import type { snippetType } from "../../../lib/db/schema"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import LimitReachedDialog from "@/components/LimitReachedDialog"
import UsageMeter from "@/components/UsageMeter"

export default function Dashboard() {
    const initialState: FormState = { errors: {} }
    const [state, formAction, isPending] = useActionState<FormState, FormData>(addSnippet, initialState)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [snippets, setSnippets] = useState<snippetType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [copied, setCopied] = useState<string>("")
    const [activeFilter, setActiveFilter] = useState<string>("all")
    const [showLimitDialog, setShowLimitDialog] = useState<boolean>(false)
    const [usageStats, setUsageStats] = useState({
        currentCount: 0,
        maxCount: 10,
        plan: "FREE",
    })
    const sidebarRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { isSignedIn, user } = useUser()
    const [synced, setSynced] = useState(false)

    useEffect(() => {
        if (isSignedIn && user && !synced) {
            fetch("/api/webhooks/clerk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user.id,
                    username: user.username,
                    email: user.primaryEmailAddress?.emailAddress,
                }),
            })
                .then(() => {
                    setSynced(true)
                })
                .catch((err) => {
                    console.error("Failed to sync the user: ", err)
                })
        }
    }, [isSignedIn, user, synced])

    // Fetch snippets and usage stats
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [snippetsData, statsData] = await Promise.all([getAllSnippets(), getUserSnippetStats()])

                setSnippets(snippetsData || [])
                setUsageStats({
                    currentCount: statsData.currentCount,
                    maxCount: statsData.maxCount,
                    plan: statsData.plan as string,
                })
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Check for limit reached in form submission response
    useEffect(() => {
        if (state.limitReached) {
            setShowLimitDialog(true)
            setShowForm(false)
        }

        if (state.success && state.currentCount !== undefined && state.maxCount !== undefined) {
            // Update usage stats after successful snippet creation
            setUsageStats({
                currentCount: state.currentCount,
                maxCount: state.maxCount,
                plan: usageStats.plan,
            })
        }
    }, [state])

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(""), 2000)
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

    useEffect(() => {
        if (state.success) {
            router.refresh()
        }
    }, [state.success, router])

    const handleNewSnippetClick = () => {
        // Check if user has reached their limit before showing the form
        if (usageStats.currentCount >= usageStats.maxCount) {
            setShowLimitDialog(true)
        } else {
            setShowForm(true)
        }
    }

    return (
        <div className="relative bg-[#0F172A] text-gray-100 max-w-[1600px] mx-auto w-full">
            {/* Limit Reached Dialog */}
            <LimitReachedDialog
                isOpen={showLimitDialog}
                onClose={() => setShowLimitDialog(false)}
                currentCount={usageStats.currentCount}
                maxCount={usageStats.maxCount}
                plan={usageStats.plan}
            />

            {/* Dashboard Layout */}
            <div className="flex flex-col lg:flex-row relative">
                {/* Sidebar */}
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

                            {/* Usage Meter */}
                            <div className="px-6 pb-4">
                                <UsageMeter />
                            </div>

                            <nav className="mt-2 px-3 flex-1">
                                <div className="space-y-1">
                                    <button
                                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full ${activeFilter === "all"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-300 hover:bg-[#2D3748] hover:text-white cursor-pointer"
                                            }`}
                                        onClick={() => setActiveFilter("all")}
                                    >
                                        <Code className="mr-3 h-5 w-5 flex-shrink-0" />
                                        All Snippets
                                    </button>
                                    <button
                                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full ${activeFilter === "public"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-300 hover:bg-[#2D3748] hover:text-white cursor-pointer"
                                            }`}
                                        onClick={() => setActiveFilter("public")}
                                    >
                                        <Eye className="mr-3 h-5 w-5 flex-shrink-0" />
                                        Public
                                    </button>
                                    <button
                                        className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg w-full ${activeFilter === "private"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-300 hover:bg-[#2D3748] hover:text-white cursor-pointer"
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
                                    onClick={handleNewSnippetClick}
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
                                <button className="rounded-full bg-[#0F172A] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer">
                                    <Filter className="h-5 w-5" />
                                </button>
                                <button
                                    className="rounded-full bg-[#0F172A] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                                    title="Order by Ascending"
                                >
                                    <SortAsc className="h-5 w-5" />
                                </button>
                                <div className="hidden md:block h-6 w-px bg-gray-600" />
                                <button
                                    onClick={handleNewSnippetClick}
                                    className="hidden md:flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
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

                            {/* Plan info */}
                            <div className="mt-2 flex items-center">
                                <span className="text-xs text-gray-400">
                                    {usageStats.currentCount} of {usageStats.maxCount} snippets used on your {usageStats.plan} plan
                                </span>
                                {usageStats.plan === "FREE" && (
                                    <Link
                                        href="/pricing"
                                        className="ml-3 inline-flex items-center text-xs text-green-400 hover:text-green-300"
                                    >
                                        <Zap className="h-3 w-3 mr-1" />
                                        Upgrade for more
                                    </Link>
                                )}
                            </div>
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
                                            <button
                                                onClick={() => setShowForm(false)}
                                                className="text-gray-400 hover:text-white cursor-pointer"
                                            >
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
                                                    placeholder="file name with extension (e.g. index.js)"
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
                                        onClick={handleNewSnippetClick}
                                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        <Plus className="mr-2 h-5 w-5" />
                                        Create Snippet
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {displaySnippets.map((snippet) => (
                                    <motion.div
                                        key={snippet.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="group flex flex-col bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-xl border border-[#334155] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:border-[#475569]"
                                    >
                                        {/* Card Header */}
                                        <div className="p-4 flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                <div className={`flex-shrink-0 p-2 rounded-md ${getLanguageIcon(snippet.title)}`}>
                                                    <FileCode className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-lg text-white group-hover:text-green-400 transition-colors duration-200">
                                                        {snippet.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                                        {snippet.description || "No description provided"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${snippet.visibility === "PRIVATE"
                                                        ? "bg-gray-800 text-gray-300 border border-gray-700"
                                                        : "bg-green-900/50 text-green-300 border border-green-800"
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

                                        {/* Code Preview */}
                                        <div className="flex-1 px-4 pb-2">
                                            <div className="relative rounded-lg bg-[#0D1117] max-h-32 overflow-hidden">
                                                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#161B22] to-transparent pointer-events-none z-10"></div>
                                                <pre className="p-3 text-sm font-mono whitespace-pre-wrap text-gray-300 overflow-hidden">
                                                    {snippet.snippet.length > 200 ? `${snippet.snippet.substring(0, 200)}...` : snippet.snippet}
                                                </pre>
                                                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0D1117] to-transparent pointer-events-none z-10"></div>
                                            </div>
                                        </div>

                                        {/* card footer */}
                                        <div className="px-4 py-3 bg-[#1A2234] border-t border-[#334155]">
                                            <div className="flex sm:flex-row sm:items-center gap-2">
                                                <div className="flex items-center text-xs text-gray-400 min-w-0 truncate">
                                                    <User className="h-3 w-3 flex-shrink-0 mr-1" />
                                                    <span className="mr-2 flex-shrink-0">You</span>
                                                    <Clock className="h-3 w-3 flex-shrink-0 mr-1" />
                                                    <span className="truncate">{formatDate(snippet.createdAt)}</span>
                                                </div>

                                                <div className="flex items-center gap-2 flex-shrink-0 sm:ml-auto">
                                                    <button
                                                        onClick={() => copyToClipboard(snippet.snippet, snippet.id)}
                                                        className={`cursor-pointer px-2 py-1.5 rounded-md flex items-center text-xs font-medium transition-colors ${copied === snippet.id
                                                            ? "bg-green-900/50 text-green-300"
                                                            : "bg-[#0F172A] text-gray-400 hover:text-white hover:bg-[#1E293B]"
                                                            }`}
                                                    >
                                                        {copied === snippet.id ? (
                                                            <>
                                                                <Check className="h-3 w-3 mr-1 flex-shrink-0" />
                                                                <span className="flex-shrink-0">Copied</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy className="h-3 w-3 mr-1 flex-shrink-0" />
                                                                <span className="flex-shrink-0">Copy</span>
                                                            </>
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/snippets/${snippet.id}`}
                                                        className="px-2 py-1.5 rounded-md flex items-center text-xs font-medium bg-green-600 text-white hover:bg-green-700 transition-colors"
                                                    >
                                                        <ExternalLink className="h-3 w-3 mr-1 flex-shrink-0" />
                                                        <span className="flex-shrink-0">View Details</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}
