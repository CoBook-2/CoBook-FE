import HomeHeaderBar from "@/components/homeHeaderBar";
import styles from "./index.module.css";
import { useState } from "react";
import LoginRequestModal from "./modal/login/loginRequestModal";

export default function Home(): JSX.Element {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 로그인 모달 열기
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // 로그인 모달 닫기
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <HomeHeaderBar />
      <div className={styles.container}>
        {/* 첫 번째 컨테이너 */}
        <section className={styles.mainSection}>
          <div className={styles.mainText}>
            <h1>
              예산관리를
              <br />
              <span className={styles.highlight}>빠르고</span>
              <br />
              쉽게.
            </h1>
            <p>사진 한 장으로 예산 관리 끝.</p>
          </div>
          <button className={styles.startButton} onClick={openLoginModal}>
            예산관리 시작하기
          </button>
        </section>

        {/* 두 번째 컨테이너 */}
        <section className={styles.programIntroductionSection}>
          <h2>두 번째 섹션</h2>
          <p>이 섹션은 홈페이지의 중간 내용입니다.</p>
        </section>

        {/* 세 번째 컨테이너 */}
        <section className={styles.imageProtoTypeSection}>
          <h2>세 번째 섹션</h2>
          <p>이 섹션은 홈페이지의 마지막 내용입니다.</p>
        </section>

        {/* 네 번째 컨테이너 */}
        <section className={styles.footerSection}>
          <h3>네 번째 섹션</h3>
          <p>이 섹션은 전체 페이지의 마지막 부분입니다.</p>
        </section>
      </div>

      {/* 로그인 모달 */}
      {isLoginModalOpen && <LoginRequestModal onClose={closeLoginModal} />}
    </>
  );
}
