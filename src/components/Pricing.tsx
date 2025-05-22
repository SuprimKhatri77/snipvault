"use clinet"
import { motion } from "framer-motion"

export default function Pricing() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    return (
        <section className="py-24 bg-gray-900 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-gray-900 opacity-50"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                            Simple, Transparent Pricing
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Choose the plan that's right for you
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <motion.div
                        className="bg-gray-800 rounded-xl overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">Free</h3>
                            <p className="text-gray-400 mb-6">For individual developers</p>
                            <p className="text-4xl font-bold mb-6">$0<span className="text-gray-400 text-lg font-normal">/month</span></p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>50 snippets</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Basic search</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>5 tags</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Community support</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                                Get Started
                            </button>
                        </div>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
                        className="bg-gradient-to-b from-emerald-900/40 to-gray-800 rounded-xl overflow-hidden relative transform lg:scale-105 shadow-xl shadow-emerald-500/20"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-center py-2 text-sm font-medium">
                            MOST POPULAR
                        </div>
                        <div className="p-6 pt-12">
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <p className="text-gray-400 mb-6">For professionals and small teams</p>
                            <p className="text-4xl font-bold mb-6">$9<span className="text-gray-400 text-lg font-normal">/month</span></p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Unlimited snippets</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Advanced search</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Unlimited tags</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Team sharing (up to 5)</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Priority support</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-lg transition">
                                Buy It Now
                            </button>
                        </div>
                    </motion.div>

                    {/* Team Plan */}
                    <motion.div
                        className="bg-gray-800 rounded-xl overflow-hidden"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-2">Team</h3>
                            <p className="text-gray-400 mb-6">For larger teams and organizations</p>
                            <p className="text-4xl font-bold mb-6">$29<span className="text-gray-400 text-lg font-normal">/month</span></p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Everything in Pro</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Unlimited team members</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Advanced permissions</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Analytics & reporting</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>Dedicated support</span>
                                </li>
                                <li className="flex items-center">
                                    <i className="fas fa-check text-emerald-500 mr-2"></i>
                                    <span>SSO & SAML integration</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                                Contact Sales
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>

    )
}