import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import { ReactNode } from "react";

export default function SpaceManagementPage() {
  return <div>이곳에 주요 콘텐츠가 표시됩니다.</div>;
}

SpaceManagementPage.getLayout = (page: ReactNode) => {
  return <SpaceListSidebarLayout>{page}</SpaceListSidebarLayout>;
};