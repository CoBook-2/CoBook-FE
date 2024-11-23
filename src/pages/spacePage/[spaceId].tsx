import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Space } from "@/types";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import SpaceHeaderNavbarLayout from "@/components/SpaceHeaderNavbarLayout";

// Import 각 동작에 맞는 컴포넌트들
import MainHomeContents from "@/components/mainHomeContents";
import ReceiptScanContents from "@/components/receiptScanContents";
import ChartContents from "@/components/chartContents";
import CalendarContents from "@/components/calendarContents";
import NoticeEditContents from "@/components/noticeEditContents";
import AdministerSpaceContents from "@/components/administerSpaceContents";

export default function SpacePage() {
  const router = useRouter();
  const { spaceId, action } = router.query; // action 쿼리 추가
  const { user } = useAuth();
  const [space, setSpace] = useState<Space | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    if (spaceId && typeof spaceId === "string") {
      const foundSpace = user.participatingSpaces.find(
        (s) => s.spaceId === spaceId
      );
      if (foundSpace) {
        setSpace(foundSpace);
      } else {
        setSpace(null);
      }
    }
  }, [spaceId, user, router]);

  if (!space) {
    return <div>해당 스페이스를 찾을 수 없습니다.</div>;
  }

  // 동작에 따라 컴포넌트를 동적으로 렌더링
  const renderContent = () => {
    switch (action) {
      case "home":
        return <MainHomeContents />;
      case "receipt":
        return <ReceiptScanContents />;
      case "chart":
        return <ChartContents />;
      case "calendar":
        return <CalendarContents />;
      case "noticeEdit":
        return <NoticeEditContents />;
      case "administer":
        return <AdministerSpaceContents />;
      default:
        return <div>올바르지 않은 요청입니다.</div>;
    }
  };

  return (
    <div>
      {/* 동적 콘텐츠 렌더링 */}
      {renderContent()}
    </div>
  );
}

// 좌측 참여 스페이스 목록 & 상단 헤더 네비게이션바 레이아웃
SpacePage.getLayout = (page: ReactNode) => {
  return (
    <SpaceListSidebarLayout>
      <div>
        <SpaceHeaderNavbarLayout />
        {page}
      </div>
    </SpaceListSidebarLayout>
  );
};
