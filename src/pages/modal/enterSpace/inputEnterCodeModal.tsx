import React, { useState } from "react";
import styles from "./inputEnterCodeModal.module.css";
import DefaultModal from "@/components/defaultModal";
import { useRouter } from "next/router";

interface InputEnterCodeModalProps {
  spaceName: string;
  spaceId: string;
  enterCode?: string; // enterCode prop 추가
  onClose: () => void;
}

export default function InputEnterCodeModal({
  spaceName,
  spaceId,
  enterCode,
  onClose,
}: InputEnterCodeModalProps) {
  const [inputCode, setInputCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirmClick();
    }
  };

  const handleConfirmClick = () => {
    if (inputCode.trim() === enterCode?.trim()) {
      // 참여 코드가 일치하면 다음 페이지로 이동
      router.push(`/spaceMainHome/${spaceId}`);
    } else {
      // 참여 코드가 일치하지 않으면 에러 메시지 표시
      setErrorMessage("참여 코드를 다시 입력해주세요.");
    }
  };

  return (
    <DefaultModal onClose={onClose} closeOnBackdropClick={false}>
      <div className={styles.container}>
        <h2>{spaceName}의 참여 코드를 입력해주세요.</h2>
        <input
          name="enterCode"
          type="password"
          autoComplete="current-password"
          required
          className={`${styles.formInput} ${styles.formInputMargin}`}
          placeholder="참여 코드를 입력해주세요."
          value={inputCode}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
        />
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <div className={styles.buttons}>
          <button className={styles.confirmButton} onClick={handleConfirmClick}>
            입력
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </DefaultModal>
  );
}
