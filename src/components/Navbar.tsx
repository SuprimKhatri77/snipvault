
import { ClerkLoaded, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';


export default function Navbar() {
    return (

        <nav className="border-b border-gray-800 backdrop-blur-md bg-gray-900/80 fixed top-0 w-full z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-emerald-500">
                            <i className="fas fa-code-branch mr-2"></i>
                            SnipVault
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="bg-transparent hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition">
                            Features
                        </button>
                        <button className="bg-transparent hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition">
                            Pricing
                        </button>
                        <button className="bg-transparent hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition">
                            Docs
                        </button>
                        <button className="bg-transparent hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition">
                            Blog
                        </button>
                        <ClerkLoaded>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                            <SignedOut>
                                <Link href="/sign-in" className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer">
                                    Sign In
                                </Link>

                            </SignedOut>
                        </ClerkLoaded>
                        <button className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-md text-sm font-medium transition">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}