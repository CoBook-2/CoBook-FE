import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Space } from "@/types";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import SpaceHeaderNavbarLayout from "@/components/SpaceHeaderNavbarLayout";

export default function SpacePage() {
  const router = useRouter();
  const { spaceId } = router.query;
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

  return (
    <div>
      <h1>{space.name}</h1>
      <p>Space ID: {space.spaceId}</p>
      <p>Tags: {space.tags.join(", ")}</p>
      {/* 추가적인 스페이스 정보 표시 */}
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