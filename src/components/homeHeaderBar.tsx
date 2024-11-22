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
      <Image
          src="/CoBook Logo(nonBackground).png"
          alt="CoBook(nonBackground) Logo"
          width={100}
          height={40}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button_login} onClick={openLoginModal}>
          로그인
        </button>
        <button className={`${styles.button_signup}`} onClick={navigateToSignup}>
          회원가입
        </button>
      </div>
      {isLoginModalOpen && <LoginRequestModal onClose={closeLoginModal} />}
    </header>
  );
}