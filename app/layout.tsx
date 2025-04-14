import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import React from "react";


const font_Sans = Roboto({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["300","400","500","600","700"],
});


export const metadata: Metadata = {
    title: "Startup Vista",
    description: "A startup pariah",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn('min-h-screen font-sans bg-primary-200 antialiased',font_Sans.variable)}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
        >
            {children}
            <Toaster richColors/>
        </ThemeProvider>
        </body>
        </html>
    );
}