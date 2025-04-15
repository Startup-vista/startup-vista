import { Header } from "@/components/Header";
import React from 'react';
import {Footer} from "@/components/Footer";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className="remove-scrollbar">
            <Header />
            {children}
            <Footer />
        </body>
        </html>
    );
}