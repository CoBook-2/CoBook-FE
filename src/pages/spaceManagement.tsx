import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
// import styles from "./spaceManagement.module.css"; // styles import 제거

export default function SpaceManagementPage() {
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
      <SpaceListSidebarLayout>
        <div>
          <HeaderNavbarLayout />
          <div>
            <h1>검색창 추가 예정</h1>
          </div>
        </div>
      </SpaceListSidebarLayout>
    </div>
  );
}
