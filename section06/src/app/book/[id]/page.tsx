import style from "./page.module.css";
import {notFound} from "next/navigation";
import {createReviewAction} from "@/actions/create-review.action";
import {ReviewData} from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

// dynamicParams false일 경우:
// generateStaticParams에서 return해주는 값 외에는 다 파라미터가 존재하지 않아야 하는구나 (dynamic하지 않는구나)로 해석해서 외에는 다 404페이지로 보내준다
// export const dynamicParams = false;

async function BookDetail({bookId}: { bookId: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
    if (!response.ok) {
        if (response.status === 404) {
            notFound();
        }
        return <div>오류가 발생했습니다...</div>
    }
    const book = await response.json();
    const {id, title, subTitle, description, author, publisher, coverImgUrl} = book;

    return (
        <section>
            <div
                className={style.cover_img_container}
                style={{backgroundImage: `url('${coverImgUrl}')`}}
            >
                <img src={coverImgUrl}/>
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <div className={style.author}>
                {author} | {publisher}
            </div>
            <div className={style.description}>{description}</div>
        </section>
    );
}

export function generateStaticParams() {
    // 정적인 파라미터 생성하는 함수
    // 값은 문자열만 가능
    // static 페이지로 강제 설정됨 (cache 설정이 안되어있다고 하더라도)
    return [{id: "1"}, {id: "2"}, {id: "3"}]
}

async function ReviewList({bookId}: { bookId: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, {next: {tags: [`review-${bookId}`]}});
    if (!response.ok) {
        throw new Error(`Review fetch failed : ${response.statusText}`)
    }
    const reviews: ReviewData[] = await response.json();

    return <section>
        {reviews.map((review: ReviewData) => <ReviewItem key={`review-item-${review.id}`} {...review} />)}
    </section>
}

export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    return <div className={style.container}>
        <BookDetail bookId={id}/>
        <ReviewEditor bookId={id}/>
        <ReviewList bookId={id}/>
    </div>
}
