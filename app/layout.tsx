import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import React from "react";


const font_Sans = Roboto({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
    title: "StartupVista - India's #1 Startup Community Platform",
    description: "Connect, share & grow with StartupVista - a powerful platform for startups to post updates, achievements & news. Stay informed, inspired, and ahead.",
    keywords: [
        "Startup community",
        "Startup platform India",
        "Startup updates",
        "Founder network",
        "Startup achievements",
        "StartupVista",
        "Entrepreneur news",
        "Startup hub",
        "Startup ecosystem",
        "Business news"
    ],
    authors: [{ name: "Anirudh Das", url: "https://portfolio.anirudh-das.in" }],
    creator: "StartupVista",
    publisher: "StartupVista",
    openGraph: {
        title: "StartupVista - India's #1 Startup Community Platform",
        description: "Connect, share & grow with StartupVista - a powerful platform for startups to post updates, achievements & news. Stay informed, inspired, and ahead.",
        url: "https://www.startupvista.in/",
        siteName: "StartupVista",
        locale: "en_US",
        type: "website",
    },
    alternates: {
        canonical: "https://www.startupvista.in/",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn('min-h-screen remove-scrollbar font-sans bg-primary-200 antialiased', font_Sans.variable)}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                >
                    {children}
                    <Toaster richColors />
                    <Analytics />
                    <SpeedInsights />
                </ThemeProvider>
            </body>
        </html>
    );
}