import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";
import {Metadata} from "next";

// export const dynamic = 'auto'; // 권장되지는 않음
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// auto 기본값 아무것도 강제하지 않음
// force-dynamic 페이지를 강제로 dynamic페이지로 설정
// force-static 페이지를 강제로 static페이지로 설정
// error 페이지를 강제로 static 페이지로 설정 (static 페이지로 강제할 때 동적함수, 캐싱되지 않는 데이터 페칭 있을 경우 빌드 오류 발생시킴)

async function AllBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: "force-cache"});
    if (!response.ok) {
        return <div>오류가 발생했습니다 ...</div>
    }
    const allBooks: BookData[] = await response.json();

    return <div>
        {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

async function RecoBooks() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {next: {revalidate: 3}});
    // revalidate가 Dynamic은 아님
    if (!response.ok) {
        return <div>오류가 발생했습니다 ...</div>
    }
    const recoBooks: BookData[] = await response.json();

    return <div>
        {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

export const metadata: Metadata = {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    openGraph: {
        title: "한입 북스",
        description: "한입 북스에 등록된 도서를 만나보세요",
        images: ["/thumbnail.png"]
    }
}

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks/>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks/>
            </section>
        </div>
    );
}
