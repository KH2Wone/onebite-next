import React, {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from './searchable-layout.module.css';

export default function GlobalLayout({children}: { children: ReactNode }) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const q = router.query.q as string;

    useEffect(() => {
        setSearch(q || "");
    }, [q]);

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const onSubmit = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`);
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }

    return <div>
        <div className={style.searchbar_container}>
            <input onKeyDown={onKeyDown} value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요 ..."/>
            <button onClick={onSubmit}>검색</button>
        </div>
        {children}
    </div>
}
