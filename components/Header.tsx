// src/components/layout/TopNavbar.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const navItems = [
    "Founder Stories",
    "Finance",
    "Industry Insights",
    "Growth",
];

export const Header: React.FC = (props) => {
    return (
        <nav className="sticky top-0 z-50 border-b bg-primary-200">
            <div className="container flex h-16 items-center justify-between p-1">
                <Link href="/" className="flex items-center gap-6 text-xl font-bold">
                    <Image alt="logo" src="/images/logo.png" width={200} height={100} />
                </Link>
                <div className="hidden md:flex">
                    <nav className="flex items-center pr-60 gap-2 text-base font-normal">
                        {navItems.map((item) => (
                            <Button
                            asChild
                            key={item}
                            variant="link"
                            className="h-10 px-3 text-800 hover:text-500"
                        >
                            <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                        </Button>
                        ))}
                    </nav>
                </div>
                
                <Button 
                    asChild
                    className=" h-10 px-4 bg-primary-500 text-white hover:bg-primary-600"
                    >
                    <Link href="/start-up/login">Log In/Sign Up</Link>
                </Button>
            </div>
        </nav>
    );
};