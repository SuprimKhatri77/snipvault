import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"
import { Search, Menu, Home, BookOpen, FileText, PlusCircle, Settings, LogOut } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default async function Navbar() {
    const { userId } = await auth()

    return (
        <nav className="bg-[#0F172A] border-b border-[#334155] fixed top-0 w-full z-50">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="bg-gradient-to-r from-green-400 to-emerald-600 p-1.5 rounded-md">
                                <span className="text-white font-bold">SV</span>
                            </div>
                            <span className="ml-2 text-xl font-bold text-white">SnipVault</span>
                        </Link>
                    </div>

                    {/* Mobile menu */}
                    <div className="md:hidden flex items-center py-5 px-3">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-[#1E293B]">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-[#0F172A] border-[#334155] text-white w-72 p-0">
                                <SheetHeader className="px-6 pt-6 pb-2">
                                    <SheetTitle className="text-white flex items-center">
                                        <div className="bg-gradient-to-r from-green-400 to-emerald-600 p-1.5 rounded-md">
                                            <span className="text-white font-bold">SV</span>
                                        </div>
                                        <span className="ml-2 text-xl font-bold">SnipVault</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <Separator className="bg-[#334155]" />

                                {!userId ? (
                                    <div className="flex flex-col p-6 space-y-6">
                                        <div className="space-y-1">
                                            <Link href="/" className="flex items-center space-x-3 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-[#1E293B] transition">
                                                <Home className="h-5 w-5" />
                                                <span>Home</span>
                                            </Link>
                                            <Link href="#features" className="flex items-center space-x-3 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-[#1E293B] transition">
                                                <PlusCircle className="h-5 w-5" />
                                                <span>Features</span>
                                            </Link>
                                            <Link href="#pricing" className="flex items-center space-x-3 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-[#1E293B] transition">
                                                <FileText className="h-5 w-5" />
                                                <span>Pricing</span>
                                            </Link>
                                        </div>
                                        <Separator className="bg-[#334155]" />
                                        <div className="space-y-4">
                                            <Link
                                                href="/sign-up"
                                                className="block bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white font-medium transition-colors text-center"
                                            >
                                                Get Started
                                            </Link>
                                            <Link
                                                href="/sign-in"
                                                className="block bg-[#1E293B] hover:bg-[#2D3748] px-4 py-2 rounded-md text-white font-medium transition-colors text-center"
                                            >
                                                Sign In
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col h-full">
                                        <div className="p-6 pb-4">
                                            <div className="relative mb-4">
                                                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                                                <input
                                                    type="text"
                                                    placeholder="Search snippets..."
                                                    className="bg-[#1E293B] border border-[#334155] rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm
                                                    placeholder:text-gray-400 focus:text-gray-300"

                                                    name="search"
                                                />
                                            </div>
                                        </div>

                                        <Separator className="bg-[#334155]" />

                                        <div className="p-6 flex-1">
                                            <div className="space-y-1">
                                                <Link href="/dashboard" className="flex items-center space-x-3 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-[#1E293B] transition">
                                                    <Home className="h-5 w-5" />
                                                    <span>Dashboard</span>
                                                </Link>
                                                <Link href="/snippets" className="flex items-center space-x-3 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-[#1E293B] transition">
                                                    <FileText className="h-5 w-5" />
                                                    <span>My Snippets</span>
                                                </Link>
                                                <Link href="/docs" className="flex items-center space-x-3 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-[#1E293B] transition">
                                                    <BookOpen className="h-5 w-5" />
                                                    <span>Documentation</span>
                                                </Link>
                                            </div>

                                            <Separator className="my-4 bg-[#334155]" />

                                            <div className="space-y-1">
                                                <Link href="/settings" className="flex items-center space-x-3 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-[#1E293B] transition">
                                                    <Settings className="h-5 w-5" />
                                                    <span>Settings</span>
                                                </Link>
                                                <Link href="/sign-out" className="flex items-center space-x-3 px-2 py-2 rounded-md text-gray-300 hover:text-white hover:bg-[#1E293B] transition">
                                                    <LogOut className="h-5 w-5" />
                                                    <span>Sign Out</span>
                                                </Link>
                                            </div>
                                        </div>

                                        <SheetFooter className="p-6 pt-0 mt-auto">
                                            <div className="flex items-center space-x-3 bg-[#1E293B] rounded-lg p-3">
                                                <ClerkLoaded>
                                                    <SignedIn>
                                                        <UserButton
                                                            appearance={{
                                                                elements: {
                                                                    userButtonAvatarBox: "border-2 border-green-500",
                                                                },
                                                            }}
                                                        />
                                                    </SignedIn>
                                                </ClerkLoaded>
                                                <div className="text-sm">
                                                    <p className="font-medium text-white">User Account</p>
                                                    <p className="text-gray-400 text-xs">Manage profile</p>
                                                </div>
                                            </div>
                                        </SheetFooter>
                                    </div>
                                )}
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {!userId ? (
                            <>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white hover:bg-[#1E293B] px-3 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Features
                                </Link>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white hover:bg-[#1E293B] px-3 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="/sign-up"
                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium text-white transition order-2"
                                >
                                    Get Started
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white hover:bg-[#1E293B] px-3 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Docs
                                </Link>
                                <Link
                                    href="#"
                                    className="text-gray-300 hover:text-white hover:bg-[#1E293B] px-3 py-2 rounded-md text-sm font-medium transition"
                                >
                                    Blog
                                </Link>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search snippets..."
                                        className="bg-[#1E293B] border border-[#334155] rounded-lg py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400 focus:text-gray-300"
                                        name="search"
                                    />
                                    <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                                </div>
                            </>
                        )}
                        <ClerkLoaded>
                            <SignedIn>
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "border-2 border-green-500",
                                        },
                                    }}
                                />
                            </SignedIn>
                            <SignedOut>
                                <Link
                                    href="/sign-in"
                                    className="bg-[#1E293B] hover:bg-[#2D3748] px-3 py-2 rounded-md text-sm font-medium text-white transition cursor-pointer mr-3"
                                >
                                    Sign In
                                </Link>
                            </SignedOut>
                        </ClerkLoaded>
                    </div>
                </div>
            </div>
        </nav>
    )
}