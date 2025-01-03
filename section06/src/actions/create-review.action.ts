'use server';

import {revalidateTag} from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get('content')?.toString();
    const author = formData.get('author')?.toString();

    if (!bookId || !content || !author) {
        return {
            status: false,
            error: "리뷰 내용과 작성자를 입력해주세요"
        }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
            method: 'POST',
            body: JSON.stringify({bookId, content, author}),
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // // 특정 주소에 해당하는 페이지만 재검증 (재생성)
        // revalidatePath(`/book/${bookId}`);
        //
        // // 특정 경로의 모든 동적 페이지를 재검증
        // revalidatePath(`/book/[id]`, "page");
        //
        // // 특정 레이아웃을 갖는 모든 페이지 재검증
        // revalidatePath(`(with-searchbar)`, "layout");
        //
        // // 모든 데이터 재검증
        // revalidatePath(`/`, "layout");

        // 태그기준 데이터 캐시 재검증 - 첫번째 방법보다 효율적, 태그 달린 것만 재생성하기 때문
        revalidateTag(`review-${bookId}`);
        return {
            status: true,
            error: ""
        }
    } catch (e) {
        console.error(e);
        return {
            status: false,
            error: `리뷰 저장에 실패했습니다 : ${e}`
        }
    }
}
