import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import SpaceSearchContents from "@/components/spaceSearchContents";
import SpaceCreateContents from "@/components/spaceCreateContents";
import styles from "./spaceManagementPage.module.css";

export default function spaceManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { type } = router.query; // 전달받은 쿼리 파라미터 (search 또는 create)

  // 로그인되지 않은 경우 홈으로 리디렉션
  useEffect(() => {
    if (user === null) {
      router.push("/"); // 홈으로 리디렉션
    }
  }, [user, router]);

  // 쿼리 파라미터가 없을 경우 기본값으로 초기화
  useEffect(() => {
    if (!type) {
      router.replace("/spaceManagementPage?type=search");
    }
  }, [type, router]);

  // 사용자 정보를 로드 중일 때 표시
  if (user === undefined) {
    return <div>로딩 중...</div>;
  }

  // 화면에 렌더링할 콘텐츠 결정
  let content;
  if (type === "search") {
    content = <SpaceSearchContents />;
  } else if (type === "create") {
    content = <SpaceCreateContents />;
  } else {
    content = <div>잘못된 요청입니다.</div>;
  }

  return <div className={styles.content}>{content}</div>;
}

// 레이아웃 설정
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
