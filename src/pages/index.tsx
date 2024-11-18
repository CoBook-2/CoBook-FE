import React from "react";
import styles from "./index.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.headingBlack}>홈페이지</h1>
      <h1 className={styles.headingBlack}>NotoSans Black (900)</h1>
      <h1 className={styles.headingExtraBold}>NotoSans ExtraBold (800)</h1>
      <h2 className={styles.headingBold}>NotoSans Bold (700)</h2>
      <h2 className={styles.headingSemiBold}>NotoSans SemiBold (600)</h2>
      <h3 className={styles.headingMedium}>NotoSans Medium (500)</h3>
      <h4 className={styles.headingRegular}>NotoSans Regular (400)</h4>
      <h5 className={styles.headingLight}>NotoSans Light (300)</h5>
      <h6 className={styles.headingExtraLight}>NotoSans ExtraLight (200)</h6>
      <p className={styles.textThin}>
        NotoSans Thin (100) 폰트가 적용된 예시 텍스트입니다.
      </p>
      <p>
        기본 폰트 설정으로 표시되는 텍스트입니다. 폰트 웨이트를 지정하지
        않았습니다.
      </p>
    </div>
  );
};

export default HomePage;
