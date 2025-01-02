import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import React, {ReactNode} from "react";
import {BookData} from "@/types";

async function Footer() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: 'force-cache'});
    if (!response.ok) {
        return <footer>제작 @강희원</footer>
    }

    const books: BookData[] = await response.json();
    const bookCount = books.length;

    return <footer>
        <div>제작 @강희원</div>
        <div>{bookCount}개의 도서가 등록되어 있습니다</div>
    </footer>
}

export default function RootLayout({
                                       children, modal
                                   }: Readonly<{
    children: React.ReactNode;
    modal: ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
        <body>
        <div className={style.container}>
            <header>
                <Link href={"/"}>📚 ONEBITE BOOKS</Link>
            </header>
            <main>{children}</main>
            <Footer/>
        </div>
        {modal}
        <div id="modal-root"></div>
        </body>
        </html>
    );
}