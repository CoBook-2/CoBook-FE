import HomeHeaderBar from "@/components/homeHeaderBar";
import styles from "./index.module.css";
import { useState, useEffect } from "react";
import LoginRequestModal from "./modal/login/loginRequestModal";

export default function Home(): JSX.Element {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showMainText, setShowMainText] = useState(false);

  // 로그인 모달 열기
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // 로그인 모달 닫기
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // 텍스트와 화살표 애니메이션 타이밍 설정
  useEffect(() => {
    const textTimer = setTimeout(() => setShowMainText(true), 200);

    return () => {
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <>
      <HomeHeaderBar />
      <div className={styles.container}>
        {/* 첫 번째 컨테이너 */}
        <section className={styles.mainSection}>
          <div
            className={`${styles.mainText} ${
              showMainText ? styles.visible : ""
            }`}
          >
            <h1>
              <span className={styles.highlight}>예산관리</span>를
              <br />
              빠르고
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
          <div className={styles.footerContent}>
            <div className={styles.footerTop}>
              <p>팀 Cobook</p>
              <p>대표 이메일 : lhb0126@kyonggi.ac.kr | 대표 : 이하빈</p>
              <p>
                개발 지원 : 경기대학교 소프트웨어중심대학사업단 | 팀원 : 유윤정
                이은수 이하빈 정지용 조참솔
              </p>
              <p>
                팀 GitHub 주소 :{" "}
                <a
                  href="https://github.com/CoBook-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerLink}
                >
                  https://github.com/CoBook-2
                </a>
              </p>
              <p>Copyright @Team Cobook All right reserved.</p>
            </div>
          </div>
        </section>
      </div>

      {/* 로그인 모달 */}
      {isLoginModalOpen && <LoginRequestModal onClose={closeLoginModal} />}
    </>
  );
}
