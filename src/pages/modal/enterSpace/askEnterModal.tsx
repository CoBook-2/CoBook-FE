import React from "react";
import { useRouter } from "next/router";
import styles from "./askEnterModal.module.css";
import DefaultModal from "@/components/defaultModal";
import { users } from "@/mock/users"; // mock 데이터 가져오기

interface AskEnterModalProps {
  spaceName: string;
  spaceId: string;
  onClose: () => void;
}

export default function AskEnterModal({
  spaceName,
  spaceId,
  onClose,
}: AskEnterModalProps) {
  const router = useRouter();

  const handleConfirmClick = () => {
    // 선택한 스페이스 가져오기
    const selectedSpace = users
      .flatMap((user) => user.participatingSpaces)
      .find((space) => space.spaceId === spaceId);

    if (selectedSpace && selectedSpace.enterCode) {
      // 참여 코드가 필요한 경우 InputEnterCodeModal로 이동
      router.push(`/enterCode/${spaceId}`);
    } else {
      // 참여 코드가 필요 없는 경우 바로 페이지 이동
      router.push(`/spaceMainHome/${spaceId}`);
    }
  };

  return (
    <DefaultModal onClose={onClose} closeOnBackdropClick={false}>
      <div className={styles.container}>
        <h2>{spaceName}에 참가하시겠습니까?</h2>
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
