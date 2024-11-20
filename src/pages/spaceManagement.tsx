import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import { ReactNode } from "react";

export default function SpaceManagementPage() {
  return (
    <div>
      SpaceManagementPage 내용
    </div>
  );
}

SpaceManagementPage.getLayout = (page: ReactNode) => {
  return (
    <SpaceListSidebarLayout>
      <div>
        <HeaderNavbarLayout /> {/* 여기에서만 HeaderNavbarLayout을 추가 */}
        {page}
      </div>
    </SpaceListSidebarLayout>
  )
};