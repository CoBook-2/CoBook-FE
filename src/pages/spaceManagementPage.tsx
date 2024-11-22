import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import styles from "./create.module.css";

export default function spaceManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  //useAuth로 받아오는 유저 정보가 초기화 되지 않고 계속 남아있는 현상이 발견되어 일단 useEffect 삭제 처리(main branch랑 비교해서 수정해볼 예정)

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
      스페이스 검색 및 생성 컴포넌트 띄울 예정
    </div>
  );
}

// 좌측 참여 스페이스 목록 & 상단 헤더 네비게이션바 레이아웃
spaceManagementPage.getLayout = (page: ReactNode) => {
  return (
    <SpaceListSidebarLayout>
      <div>
        <HeaderNavbarLayout />
        {page}
      </div>
    </SpaceListSidebarLayout>
  );
};
