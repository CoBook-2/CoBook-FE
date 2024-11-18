import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Noto_Sans_KR } from "next/font/google";

const notoSans = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // 필요한 폰트 두께 선택
  subsets: ["latin"], // 필요한 서브셋 선택
  variable: "--font-noto-sans-kr", // CSS 변수 이름 지정 (선택 사항)
  display: "swap", // 폰트 로딩 전략 설정 (선택 사항)
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={notoSans.className}>
      <Component {...pageProps} />
    </div>
  );
}
