import { ReactNode } from "react";
import styles from "./defaultModal.module.css";
import { IoClose } from "react-icons/io5";

interface Props {
  content?: string;
  onClose: () => void;
  children?: ReactNode;
  closeOnBackdropClick?: boolean /* 새로운 prop 추가 */;
}

export default function DefaultModal({
  onClose,
  children,
  closeOnBackdropClick = true /* 기본값 설정 */,
}: Props): JSX.Element {
  const handleBackdropClick = () => {
    console.log(
      "Backdrop clicked. closeOnBackdropClick:",
      closeOnBackdropClick
    );
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      {/* 모달 본체를 클릭했을 때 이벤트가 전파되지 않도록 stopPropagation 사용 */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <IoClose size={24} />
        </button>
        <div className={styles.childrenWrapper}>{children}</div>
      </div>
    </div>
  );
}
