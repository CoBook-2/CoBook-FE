import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import styles from "./search.module.css";

export default function spaceSearchPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  if (user === undefined) {
    // 사용자 정보를 아직 로드 중인 상태이므로 로딩 화면을 표시합니다.
    return <div>로딩 중...</div>;
  }

  if (user === null) {
    // 로그인되지 않은 상태이며, 이미 useEffect에서 리디렉션을 처리하므로 null을 반환합니다.
    return null;
  }

  return (
    <div>
      <h1>검색창 추가 예정</h1>
    </div>
  );
}

// 좌측 참여 스페이스 목록 & 상단 헤더 네비게이션바 레이아웃
spaceSearchPage.getLayout = (page: ReactNode) => {
  return (
    <SpaceListSidebarLayout>
      <div>
        <HeaderNavbarLayout />
        {page}
      </div>
    </SpaceListSidebarLayout>
  );
};
