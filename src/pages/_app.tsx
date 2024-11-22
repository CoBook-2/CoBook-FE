import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext"; // AuthProvider 임포트
import { SpaceProvider } from "@/context/SpaceContext";



type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthProvider>
      {/* AuthProvider로 애플리케이션 래핑 */}
      <SpaceProvider>
        {/* SpaceProvider 추가로 감싸기 */}
        <div>{getLayout(<Component {...pageProps} />)}</div>
      </SpaceProvider>
    </AuthProvider>
  );
}
