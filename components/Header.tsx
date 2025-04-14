"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { auth } from "@/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { authService } from "@/services/authService"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const navItems = ['Founder Stories', 'Finance', 'Industry Insights', 'Growth'];

export function Header() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const isVerified = await authService.checkUserVerification(user.uid);
                    setIsVerified(isVerified);
                    setUser({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        isVerified
                    });
                } catch (error) {
                    console.error("Error checking verification:", error);
                    await handleSignOut();
                }
            } else {
                setUser(null);
                setIsVerified(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIsVerified(false);
            router.push("/");
        } catch (error) {
            toast.error("Failed to sign out");
        }
    };

    const handleProfileClick = () => {
        if (!isVerified) {
            toast.error("Please verify your account to access profile");
            return;
        }
        router.push("/profile");
    };

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
                    {/* <div className="hidden md:flex md:items-center md:space-x-8">
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
                    </div> */}

                    {/* Auth Section */}
                    <div className="flex items-center gap-4">
                        {loading ? (
                            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
                        ) : user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative cursor-pointer h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.photoURL || "/default-avatar.jpg"} alt="User" />
                                            <AvatarFallback>
                                                {user.email?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        {!isVerified && (
                                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                                    {!isVerified && (
                                        <DropdownMenuItem className="text-red-500">
                                            Account not verified
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem>
                                        <Link href="/create-post" className="w-full">Create a Post</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleProfileClick}>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/settings" className="w-full">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleSignOut}>
                                        <span className="w-full text-left">Logout</span>
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