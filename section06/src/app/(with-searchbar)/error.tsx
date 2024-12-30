"use client";

import {startTransition, useEffect} from "react";
import {useRouter} from "next/navigation";

// error 적용은 해당 파일 동일 위치 및 동일 위치에 있는 폴더 내 컴포넌트들이 적용된다
// 그러나 layout.tsx는 같은 경로에 있는 layout만 적용됨, 그래서 필요하다면 각각 error.tsx 파일을 만들어 적용해주어야 한다

export default function Error({error, reset}: { error: Error; reset: () => void }) {
    const router = useRouter();

    useEffect(() => {
        console.error(error.message);
    }, [error]);

    return (<div>
        <h3>오류가 발생했습니다</h3>
        <button onClick={() => {
            startTransition(() => { // 아래 로직을 한몸처럼 동작하게 함
                router.refresh(); // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴 - 비동기 문제
                reset(); // 에러상태 초기화, 컴포넌트 다시 렌더링
            })
        }}>다시 시도
        </button>
    </div>)
}