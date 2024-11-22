import React, { ReactNode } from "react";
import styles from "./SpaceListSidebarLayout.module.css";
import Link from "next/link";
import JoinSpaceLayout from "./JoinSpaceLayout";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function SpaceListSidebarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <Link href="/spaceManagement">
          <Image
            src="/CoBook Logo(nonBackground).png"
            alt="CoBook Logo"
            width={100}
            height={40}
          />
        </Link>
        <div>
          <div className={styles.spaceTitle}>참여 스페이스 목록</div>
          {user && user.participatingSpaces ? (
            <JoinSpaceLayout spaces={user.participatingSpaces} />
          ) : (
            <p>참여한 스페이스가 없습니다.</p>
          )}
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
