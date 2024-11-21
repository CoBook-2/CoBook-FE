import React from "react";
import styles from "./askEnterModal.module.css";
import DefaultModal from "@/components/defaultModal";

interface AskEnterModalProps {
  spaceName: string;
  onClose: () => void;
}

export default function AskEnterModal({
  spaceName,
  onClose,
}: AskEnterModalProps) {
  return (
    <DefaultModal onClose={onClose} closeOnBackdropClick={false}>
      <div className={styles.container}>
        <h2>{spaceName}에 참가하시겠습니까?</h2>
        <div className={styles.buttons}>
          <button
            className={styles.confirmButton}
            onClick={() => alert(`${spaceName}에 참여하셨습니다.`)}
          >
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
