import { Code, Twitter, Github, Linkedin, MessageSquare } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-[#0F172A] border-t border-[#334155] py-12 w-full mt-auto relative z-20">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center text-xl font-bold text-white mb-4">
                            <div className="bg-gradient-to-r from-green-400 to-emerald-600 p-1.5 rounded-md mr-2">
                                <Code className="h-5 w-5 text-white" />
                            </div>
                            SnipVault
                        </div>
                        <p className="text-gray-400 mb-4">The modern way to store and share code snippets.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <MessageSquare className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-white mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Changelog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Roadmap
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium text-white mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition">
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#334155] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400">© 2025 SnipVault. All rights reserved.</p>
                    <div className="mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition mr-4">
                            Terms
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition mr-4">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
