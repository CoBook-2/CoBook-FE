// src/pages/spaceManagement.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import HeaderNavbarLayout from "@/components/HeaderNavbarLayout";
import SpaceListSidebarLayout from "@/components/SpaceListSidebarLayout";
import styles from "./spaceManagement.module.css";
import { ReactNode } from "react";

export default function SpaceManagementPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // 사용자가 로그인하지 않았다면 홈 페이지로 이동
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null; // 사용자가 없을 경우 아무것도 렌더링하지 않음
  }

  return (
    <div className={styles.container}>
      <h1>{user.id}님의 참여 스페이스 목록</h1>
      <ul className={styles.spaceList}>
        {user.participatingSpaces.map((space) => (
          <li key={space.name} className={styles.spaceItem}>
            <h2>{space.name}</h2>
            <div className={styles.tags}>
              {space.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
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
  );
};
