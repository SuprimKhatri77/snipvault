"use client"

import { useState, useEffect } from "react"
import { getUserSnippetStats } from "../../actions/snippet"

export default function UsageMeter() {
    const [stats, setStats] = useState({
        currentCount: 0,
        maxCount: 10,
        percentage: 0,
        plan: "FREE",
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const result = await getUserSnippetStats()
                // Ensure plan is never null by providing a default value
                setStats({
                    currentCount: result.currentCount,
                    maxCount: result.maxCount,
                    percentage: result.percentage,
                    plan: result.plan || "FREE", // Use "FREE" as fallback if plan is null
                })
            } catch (error) {
                console.error("Error fetching snippet stats:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155] animate-pulse">
                <div className="h-4 bg-[#334155] rounded w-1/2 mb-3"></div>
                <div className="h-2.5 bg-[#334155] rounded w-full"></div>
            </div>
        )
    }

    // Determine color based on usage percentage
    const getColorClass = () => {
        if (stats.percentage >= 90) return "bg-red-500"
        if (stats.percentage >= 75) return "bg-amber-500"
        return "bg-green-500"
    }

    return (
        <div className="bg-[#1E293B] rounded-lg p-4 border border-[#334155]">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Snippet Usage</span>
                <span className="text-sm font-medium text-white">
                    {stats.currentCount} / {stats.maxCount}
                </span>
            </div>
            <div className="w-full bg-[#334155] rounded-full h-2.5">
                <div
                    className={`${getColorClass()} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(100, stats.percentage)}%` }}
                ></div>
            </div>
            {stats.percentage >= 80 && (
                <p className="mt-2 text-xs text-amber-400">You're approaching your plan limit. Consider upgrading soon.</p>
            )}
        </div>
    )
}
