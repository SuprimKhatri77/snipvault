"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Zap, Trash2 } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

type LimitReachedDialogProps = {
    isOpen: boolean
    onClose: () => void
    currentCount: number
    maxCount: number
    plan: string
}

export default function LimitReachedDialog({ isOpen, onClose, currentCount, maxCount, plan }: LimitReachedDialogProps) {
    const [isVisible, setIsVisible] = useState(isOpen)

    useEffect(() => {
        setIsVisible(isOpen)
    }, [isOpen])

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/70 z-50"
                        onClick={onClose}
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                    >
                        <div className="bg-[#1E293B] border border-[#334155] rounded-xl shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-[#0F172A] px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-amber-600/20 p-2 rounded-full">
                                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <h3 className="ml-3 text-lg font-semibold text-white">Snippet Limit Reached</h3>
                                </div>
                                <button onClick={onClose} className="text-gray-400 hover:text-white">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-5">
                                <p className="text-gray-300">
                                    You've reached the maximum number of snippets allowed on your current plan ({plan}).
                                </p>

                                <div className="mt-4 bg-[#0F172A] rounded-lg p-4 border border-[#334155]">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-400">Snippets used</span>
                                        <span className="text-sm font-medium text-white">
                                            {currentCount} / {maxCount}
                                        </span>
                                    </div>
                                    <div className="w-full bg-[#334155] rounded-full h-2.5">
                                        <div
                                            className="bg-amber-500 h-2.5 rounded-full"
                                            style={{ width: `${Math.min(100, (currentCount / maxCount) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="flex flex-col">
                                        <h4 className="text-white font-medium mb-2">To create more snippets, you can:</h4>
                                        <ul className="space-y-3 text-gray-300">
                                            <li className="flex items-start">
                                                <Zap className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Upgrade your plan to increase your snippet limit</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Trash2 className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                                <span>Delete some existing snippets to free up space</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-[#0F172A]/50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-[#334155] text-white rounded-lg hover:bg-[#475569] transition-colors"
                                >
                                    Continue Browsing
                                </button>
                                <Link
                                    href="/pricing"
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors flex items-center justify-center"
                                >
                                    <Zap className="h-4 w-4 mr-2" />
                                    Upgrade Plan
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
