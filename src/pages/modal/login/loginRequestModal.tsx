import styles from "./loginRequestModal.module.css";

interface Props {
  onClose: () => void;
}

export default function LoginRequestModal({ onClose }: Props): JSX.Element {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>로그인 요청</h2>
        <p>로그인 화면입니다.</p>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
