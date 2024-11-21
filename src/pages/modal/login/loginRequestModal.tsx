import { useState, useEffect } from "react";
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io5";
import { SiNaver, SiKakao } from "react-icons/si";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./loginRequestModal.module.css";
import DefaultModal from "@/components/defaultModal";
import { useAuth } from "@/context/AuthContext";

interface Props {
  onClose: () => void;
}

export default function LoginRequestModal({ onClose }: Props): JSX.Element {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShake(false); // 애니메이션 초기화

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        // AuthContext에 로그인 정보 설정
        login(data.data.userId, data.data.participatingSpaces);

        // 로그인 성공 시 spaceManagement 페이지로 이동
        router.push("/spaceManagement");
      } else {
        // 로그인 실패 시 오류 메시지 표시 및 애니메이션 트리거
        setError(data.message);
        setShake(true);
      }
    } catch (err) {
      console.error("로그인 요청 중 오류 발생:", err);
      setError("로그인 요청 중 오류가 발생했습니다.");
      setShake(true);
    }
  };

  // 애니메이션이 끝난 후 클래스 제거
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500); // 애니메이션 지속 시간과 일치
      return () => clearTimeout(timer);
    }
  }, [shake]);

  return (
    <DefaultModal onClose={onClose} closeOnBackdropClick={false}>
      <div className={styles.textCenter}>
        <p className={styles.title}>로그인</p>
        <p className={styles.subtitle}>
          로그인 후 CoBook의 강력한 예산 관리를 경험해보세요!
        </p>
      </div>
      <div className={styles.socialButtonsWrapper}>
        <button className={styles.socialButton}>
          <IoLogoGithub size={20} /> GitHub 아이디로 간편 로그인
        </button>
        <button className={styles.socialButton}>
          <IoLogoGoogle size={20} /> Google 아이디로 간편 로그인
        </button>
        <button className={styles.socialButton}>
          <SiNaver size={18} /> Naver 아이디로 간편 로그인
        </button>
        <button className={styles.socialButton}>
          <SiKakao size={18} /> Kakao 아이디로 간편 로그인
        </button>
      </div>
      <div className={styles.dividerWrapper}>
        <div className={styles.divider}></div>
        OR
        <div className={styles.divider}></div>
      </div>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <label htmlFor="id" className="sr-only">
          아이디
        </label>
        <input
          name="id"
          type="text" /* type="id" 에러 수정 */
          autoComplete="username"
          required
          className={`${styles.formInput} ${styles.idInput}`}
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <label htmlFor="password" className="sr-only">
          비밀번호
        </label>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={`${styles.formInput} ${styles.formInputMargin}`}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.errorContainer}>
          {error && (
            <p
              className={`${styles.errorMessage} ${shake ? styles.shake : ""}`}
            >
              {error}
            </p>
          )}
        </div>
        <div className={styles.resetPasswordWrapper}>
          <Link href="/findId" className={styles.link}>
            아이디 찾기
          </Link>
          <span className={styles.verticalBar}>|</span>
          <Link href="/findPassword" className={styles.link}>
            비밀번호 찾기
          </Link>
        </div>
        <button type="submit" className={styles.primaryButton}>
          로그인
        </button>
      </form>
      <div className={styles.signUpWrapper}>
        아직 계정이 없으신가요?
        <Link href="/signup" className={styles.link}>
          {" "}
          회원가입
        </Link>
      </div>
    </DefaultModal>
  );
}
