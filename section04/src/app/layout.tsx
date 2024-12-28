import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body>
        <div className={style.container}>
            <header>
                <Link href={"/"}>📚 ONEBITE BOOKS</Link>
            </header>
            <main>{children}</main>
            <footer>제작 @강희원</footer>
        </div>
        </body>
        </html>
    );
}
