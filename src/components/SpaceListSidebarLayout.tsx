import React, { ReactNode } from "react";
import styles from "./SpaceListSidebarLayout.module.css";
import Link from "next/link";
import JoinSpaceLayout from "./JoinSpaceLayout";
import { users } from "@/mock/users";
import { User } from "@/types";
import Image from "next/image";

export default function SpaceListSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 현재 사용자를 지정 (예: 첫 번째 사용자)
  const currentUser: User = users[0];

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Link href="/spaceManagement">
          <Image
            src="/CoBook Logo(nonBackground).png"
            alt="CoBook Logo"
            width={120}
            height={40}
            className={styles.logo}
          />
        </Link>
        <div>
          <div className={styles.spaceTitle}>참여 스페이스 목록</div>
          <JoinSpaceLayout spaces={currentUser.participatingSpaces} />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
