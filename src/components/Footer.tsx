export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-12 bottom-0 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2">
                        <div className="text-xl font-bold text-emerald-500 mb-4">
                            <i className="fas fa-code-branch mr-2"></i>
                            SnipVault
                        </div>
                        <p className="text-gray-400 mb-4">
                            The modern way to store and share code snippets.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-discord"></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Changelog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Roadmap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">API Reference</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Guides</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400">© 2025 SnipVault. All rights reserved.</p>
                    <div className="mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition mr-4">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white transition mr-4">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>

    )
}