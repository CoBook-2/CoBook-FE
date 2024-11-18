import React from "react";

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontWeight: 700 }}>GmarketSans Bold (700)</h1>
      <h2 style={{ fontWeight: 500 }}>GmarketSans Medium (500)</h2>
      <p style={{ fontWeight: 300 }}>
        GmarketSans Light (300) 폰트가 적용된 예시 텍스트입니다.
      </p>
      <p>
        기본 폰트 설정으로 표시되는 텍스트입니다. 폰트 웨이트를 지정하지
        않았습니다.
      </p>
    </div>
  );
};

export default HomePage;
