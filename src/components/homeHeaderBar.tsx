import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./homeHeaderBar.module.css";
import Image from "next/image";
import LoginRequestModal from "@/pages/modal/login/loginRequestModal";

export default function HomeHeaderBar(): JSX.Element {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter(); // useRouter 훅 추가

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const navigateToSignup = () => {
    router.push("/signup"); // signup 페이지로 이동
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/CoBook Logo(nonBackground).svg"
          alt="CoBook(nonBackground) Logo"
          width={120}
          height={40}
          className={styles.logo}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={openLoginModal}>
          로그인
        </button>
        <button className={styles.button} onClick={navigateToSignup}>
          회원가입
        </button>
      </div>
      {isLoginModalOpen && <LoginRequestModal onClose={closeLoginModal} />}
    </header>
  );
}