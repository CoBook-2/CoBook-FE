import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import styles from "./spaceManagement.module.css";

export default function SpaceManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  //useAuth로 받아오는 유저 정보가 초기화 되지 않고 계속 남아있는 현상이 발견되어 일단 useEffect 삭제 처리(main branch랑 비교해서 수정해볼 예정)

  return (
    <div>
      검색창 등 추가 패치 예정
    </div>
  );
}

// 좌측 참여 스페이스 목록 & 상단 헤더 네비게이션바 레이아웃
SpaceManagementPage.getLayout = (page: ReactNode) => {
  return (
    <SpaceListSidebarLayout>
      <div>
        <HeaderNavbarLayout />
        {page}
      </div>
    </SpaceListSidebarLayout>
  );
};
