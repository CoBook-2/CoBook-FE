import React, { useState } from "react";
import styles from "./inputEnterCodeModal.module.css";
import DefaultModal from "@/components/defaultModal";
import { useRouter } from "next/router";

interface InputEnterCodeModalProps {
  spaceName: string;
  spaceId: string; // 스페이스 ID 추가
  onClose: () => void;
  enterCode: string; // 참가 코드
}

export default function InputEnterCodeModal({
  spaceName,
  spaceId,
  enterCode,
  onClose,
}: InputEnterCodeModalProps) {
  const [inputCode, setInputCode] = useState(""); // 입력된 참가 코드를 관리할 상태
  const router = useRouter();

  // 참가 코드 입력 핸들러
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  // 참가 코드 확인 핸들러
  const handleConfirmClick = () => {
    if (String(inputCode) === String(enterCode)) {
      alert(`${spaceName}에 참여하셨습니다.`);
      router.push(`/spaceMainHome/${spaceId}`); // 다음 페이지로 이동 (스페이스 ID에 맞게 페이지 경로 설정)
    } else {
      alert("참가 코드가 일치하지 않습니다. 다시 입력해주세요.");
    }
  };

  return (
    <DefaultModal onClose={onClose} closeOnBackdropClick={false}>
      <div className={styles.container}>
        <h2>{spaceName}의 참가 코드를 입력해주세요.</h2>
        <input
          name="enterCode"
          type="password" // 입력값 숨김 처리
          autoComplete="current-password"
          required
          className={`${styles.formInput} ${styles.formInputMargin}`}
          placeholder="참가 코드를 입력해주세요."
          value={inputCode}
          onChange={handleCodeChange}
        />
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={handleConfirmClick}>
            예
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            아니오
          </button>
        </div>
      </div>
    </DefaultModal>
  );
}
