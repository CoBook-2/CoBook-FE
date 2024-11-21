import { ReactNode } from "react";
import styles from "./DefaultModal.module.css";
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
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <IoClose size={24} />
        </button>
        <div className={styles.childrenWrapper}>{children}</div>
      </div>
    </div>
  );
}
