import React, { useState } from "react";
import styles from "./inputEnterCodeModal.module.css";
import DefaultModal from "@/components/defaultModal";
import { useRouter } from "next/router";
import { users } from "@/mock/users"; // mock 데이터 가져오기

interface InputEnterCodeModalProps {
  spaceName: string;
  spaceId: string;
  onClose: () => void;
}

export default function InputEnterCodeModal({
  spaceName,
  spaceId,
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
      handleConfirmClick(); // Enter 키를 누르면 handleConfirmClick 호출
    }
  };

  const handleConfirmClick = () => {
    // 선택한 스페이스 가져오기
    const selectedSpace = users
      .flatMap((user) => user.participatingSpaces)
      .find((space) => space.spaceId === spaceId);

    if (selectedSpace) {
      if (inputCode.trim() === selectedSpace.enterCode.trim()) {
        // 참여 코드가 일치하면 다음 페이지로 이동
        router.push(`/spaceMainHome/${spaceId}`);
      } else {
        // 참여 코드가 일치하지 않으면 에러 메시지 표시
        setErrorMessage("참여 코드를 다시 입력해주세요.");
      }
    } else {
      setErrorMessage("스페이스 정보를 찾을 수 없습니다.");
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
          onKeyDown={handleKeyDown} // Enter 키 핸들러 추가
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
