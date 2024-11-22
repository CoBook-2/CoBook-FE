import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import styles from "./spaceManagement.module.css";

export default function SpaceManagementPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.pageLayout}>
      <SpaceListSidebarLayout>
        <div className={styles.mainSection}>
          <HeaderNavbarLayout isModalOpen={false} />
          <div className={styles.contentContainer}>
            <h1>검색창 추가 예정</h1>
          </div>
        </div>
      </SpaceListSidebarLayout>
    </div>
  );
}
