import SearchableLayout from "@/components/searchable-layout";
import {ReactNode, useEffect, useState} from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import {useRouter} from "next/router";
import {BookData} from "@/types";

// export const getStaticProps = async (context: GetStaticPropsContext) => {
//     const q = context.query.q;
//     const books = await fetchBooks(q as string);
//     return {
//         props: {books}
//     }


// 쿼리스트링을 받아서 처리하는 부분을 SSG로 처리하려면, Next.js에서 아무것도 설정을 안할 시 디폴트 값이 SSG이므로
// 그 무엇도 설정하지 않은 채 쿼리스트링이 들어와서 클라이언트측에서 컨트롤해야할 경우 그 부분만 클라이언트에서 렌더링할 수 있도록 (useEffect 등)
// 코드를 작성해주면 된다. (기본 React방식과 동일)

// npm run build (Static - 빈 원형으로 나타남)
// npm run start (네트워크탭에서 렌더링된 결과를 보면 쿼리스트링 없이 겉 화면만 가져온 것을 확인할 수 있음)

export default function Page() {
    const [books, setBooks] = useState<BookData[]>([]);
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResults = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(() => {
        if (q) {
            fetchSearchResults();
        }
    }, [q]);

    return <div>
        {books.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}