import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pencil } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const navItems = ['Founder Stories', 'Finance', 'Industry Insights', 'Growth'];

export function Header() {
    const user = null;
    return (
        <nav className="sticky top-0 z-50 border-b bg-primary-200">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center text-xl font-bold">
                        <Image
                            alt="logo"
                            src="/images/logo.png"
                            width={200}
                            height={100}
                            className="w-40 md:w-48"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <div className="flex items-center gap-4 lg:gap-6 text-base font-normal">
                            {navItems.map((item) => (
                                <Button
                                    asChild
                                    key={item}
                                    variant="link"
                                    className="h-10 px-3 text-800 hover:text-500 text-sm lg:text-base"
                                >
                                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`}>
                                        {item}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Auth Section */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative cursor-pointer h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src="/path-to-user-image.jpg" alt="User" />
                                            <AvatarFallback>US</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                                    <DropdownMenuItem>
                                        <Link href="/create-post" className="w-full">Create a Post</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/profile" className="w-full">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/settings" className="w-full">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <button className="w-full text-left">Logout</button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                asChild
                                className="h-10 px-4 bg-primary-500 text-white hover:bg-primary-600 text-sm md:text-base"
                            >
                                <Link href="/start-up/login">Log In/Sign Up</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}