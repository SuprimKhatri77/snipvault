"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Zap, Users, Shield, Star, ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function PricingComponent() {
    const [isLoading, setIsLoading] = useState<string | null>(null)
    const router = useRouter()

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    const handleCheckout = async (priceId: string) => {
        try {
            setIsLoading(priceId)
            console.log("Starting checkout for price:", priceId)

            const res = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ priceId }),
            })

            const data = await res.json()

            if (!res.ok) {
                console.error("Failed to create checkout session:", data)
                alert("Failed to create checkout session. Please try again.")
                return
            }

            console.log("Checkout session created:", data)

            // Redirect to the URL provided by Stripe
            if (data.url) {
                window.location.href = data.url
            } else {
                console.error("No checkout URL returned")
                alert("Something went wrong. Please try again.")
            }
        } catch (error) {
            console.error("Error during checkout:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsLoading(null)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
            <motion.div
                className="text-center mb-16"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        Upgrade Your Snippet Experience
                    </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    Choose the plan that fits your needs and take your code snippets to the next level
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {/* Free Plan */}
                <motion.div
                    className="bg-[#1E293B] rounded-xl overflow-hidden border border-[#334155]"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-bold text-white">Free</h3>
                            <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Current Plan</span>
                        </div>
                        <p className="text-gray-400 mb-6">For individual developers</p>
                        <p className="text-4xl font-bold text-white mb-6">
                            $0<span className="text-gray-400 text-lg font-normal">/month</span>
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>50 snippets</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Basic search</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>5 tags</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Community support</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] border border-[#334155] rounded-lg transition text-white font-medium"
                        >
                            Continue with Free
                        </button>
                    </div>
                </motion.div>

                {/* Pro Plan */}
                <motion.div
                    className="bg-gradient-to-b from-[#0F766E]/30 to-[#1E293B] rounded-xl overflow-hidden relative transform lg:scale-105 shadow-xl shadow-green-500/10 border border-green-800/50"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-center py-2 text-sm font-medium text-emerald-950">
                        MOST POPULAR
                    </div>
                    <div className="p-6 pt-12">
                        <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                        <p className="text-gray-400 mb-6">For professionals and small teams</p>
                        <p className="text-4xl font-bold text-white mb-6">
                            $9<span className="text-gray-400 text-lg font-normal">/month</span>
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Unlimited snippets</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Advanced search</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Unlimited tags</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Team sharing (up to 5)</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Priority support</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Syntax highlighting</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleCheckout("price_1RLgZIHHy9yWdGH0yXoDaMdU")}
                            disabled={isLoading === "price_1RLgZIHHy9yWdGH0yXoDaMdU"}
                            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-lg transition text-white font-medium flex items-center justify-center"
                        >
                            {isLoading === "price_1RLgZIHHy9yWdGH0yXoDaMdU" ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Upgrade to Pro <Zap className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Team Plan */}
                <motion.div
                    className="bg-[#1E293B] rounded-xl overflow-hidden border border-[#334155]"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">Team</h3>
                        <p className="text-gray-400 mb-6">For larger teams and organizations</p>
                        <p className="text-4xl font-bold text-white mb-6">
                            $29<span className="text-gray-400 text-lg font-normal">/month</span>
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Everything in Pro</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Unlimited team members</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Advanced permissions</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Analytics & reporting</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>Dedicated support</span>
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                <span>SSO & SAML integration</span>
                            </li>
                        </ul>
                        <button
                            onClick={() => handleCheckout("price_1RLgdXHHy9yWdGH0qQrV5Ci9")}
                            disabled={isLoading === "price_1RLgdXHHy9yWdGH0qQrV5Ci9"}
                            className="w-full py-3 bg-[#0F172A] hover:bg-[#1E293B] border border-[#334155] rounded-lg transition text-white font-medium flex items-center justify-center"
                        >
                            {isLoading === "price_1RLgdXHHy9yWdGH0qQrV5Ci9" ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Upgrade to Team <Users className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Features Comparison */}
            <motion.div
                className="bg-[#1E293B] rounded-xl border border-[#334155] p-8 mb-16"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <h2 className="text-2xl font-bold text-white mb-8">Compare Features</h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#334155]">
                                <th className="text-left py-4 px-4 text-gray-400 font-medium">Feature</th>
                                <th className="text-center py-4 px-4 text-gray-400 font-medium">Free</th>
                                <th className="text-center py-4 px-4 text-gray-400 font-medium">Pro</th>
                                <th className="text-center py-4 px-4 text-gray-400 font-medium">Team</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[#334155]">
                                <td className="py-4 px-4 text-white">Snippets</td>
                                <td className="py-4 px-4 text-center text-gray-300">50</td>
                                <td className="py-4 px-4 text-center text-gray-300">Unlimited</td>
                                <td className="py-4 px-4 text-center text-gray-300">Unlimited</td>
                            </tr>
                            <tr className="border-b border-[#334155]">
                                <td className="py-4 px-4 text-white">Tags</td>
                                <td className="py-4 px-4 text-center text-gray-300">5</td>
                                <td className="py-4 px-4 text-center text-gray-300">Unlimited</td>
                                <td className="py-4 px-4 text-center text-gray-300">Unlimited</td>
                            </tr>
                            <tr className="border-b border-[#334155]">
                                <td className="py-4 px-4 text-white">Search</td>
                                <td className="py-4 px-4 text-center text-gray-300">Basic</td>
                                <td className="py-4 px-4 text-center text-gray-300">Advanced</td>
                                <td className="py-4 px-4 text-center text-gray-300">Advanced</td>
                            </tr>
                            <tr className="border-b border-[#334155]">
                                <td className="py-4 px-4 text-white">Team Members</td>
                                <td className="py-4 px-4 text-center text-gray-300">-</td>
                                <td className="py-4 px-4 text-center text-gray-300">Up to 5</td>
                                <td className="py-4 px-4 text-center text-gray-300">Unlimited</td>
                            </tr>
                            <tr className="border-b border-[#334155]">
                                <td className="py-4 px-4 text-white">Syntax Highlighting</td>
                                <td className="py-4 px-4 text-center text-gray-300">Basic</td>
                                <td className="py-4 px-4 text-center text-gray-300">Advanced</td>
                                <td className="py-4 px-4 text-center text-gray-300">Advanced</td>
                            </tr>
                            <tr className="border-b border-[#334155]">
                                <td className="py-4 px-4 text-white">Support</td>
                                <td className="py-4 px-4 text-center text-gray-300">Community</td>
                                <td className="py-4 px-4 text-center text-gray-300">Priority</td>
                                <td className="py-4 px-4 text-center text-gray-300">Dedicated</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-4 text-white">Analytics</td>
                                <td className="py-4 px-4 text-center text-gray-300">-</td>
                                <td className="py-4 px-4 text-center text-gray-300">Basic</td>
                                <td className="py-4 px-4 text-center text-gray-300">Advanced</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                className="mb-16"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">Can I upgrade or downgrade at any time?</h3>
                        <p className="text-gray-300">
                            Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately and your
                            billing will be prorated accordingly.
                        </p>
                    </div>

                    <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">How does the 7-day free trial work?</h3>
                        <p className="text-gray-300">
                            You can try the Pro plan for 7 days without being charged. If you decide to keep it, you'll be billed
                            after the trial period. You can cancel anytime during the trial.
                        </p>
                    </div>

                    <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">What payment methods do you accept?</h3>
                        <p className="text-gray-300">
                            We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also
                            support payment via PayPal.
                        </p>
                    </div>

                    <div className="bg-[#1E293B] rounded-xl border border-[#334155] p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">What happens to my data if I downgrade?</h3>
                        <p className="text-gray-300">
                            If you downgrade to a plan with limits (e.g., from Pro to Free), you'll still have access to all your
                            data, but you won't be able to add new snippets beyond your plan's limit.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-xl border border-green-800/50 p-8 text-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-white mb-4">Ready to take your snippets to the next level?</h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Join thousands of developers who trust SnipVault for their code snippet management. Upgrade today and
                    experience the difference.
                </p>
                <button
                    onClick={() => handleCheckout("price_1RLgZIHHy9yWdGH0yXoDaMdU")}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-lg transition text-white font-medium inline-flex items-center"
                >
                    Get Started with Pro <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </motion.div>
        </div>
    )
}
