import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import AskEnterModal from "@/pages/modal/enterSpace/askEnterModal";
import styles from "./spaceManagement.module.css";

export default function SpaceManagementPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  // 모달 열기/닫기 함수
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`${styles.pageLayout} ${isModalOpen ? styles.dimmed : ""}`}>
      <SpaceListSidebarLayout>
        <div className={styles.mainSection}>
          <HeaderNavbarLayout isModalOpen={isModalOpen} />
          <div className={styles.contentContainer}>
            <h1>검색창 등 추가 패치 예정</h1>
          </div>
        </div>
        {isModalOpen && (
          <AskEnterModal spaceName="스페이스 이름" onClose={closeModal} />
        )}
      </SpaceListSidebarLayout>
    </div>
  );
}
