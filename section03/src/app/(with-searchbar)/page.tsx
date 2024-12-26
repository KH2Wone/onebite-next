import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스페이지
    </div>
  );
}

// 상호작용(with JS)이 필요하면: 클라이언트 컴포넌트
// 필요 없으면: 서버 컴포넌트