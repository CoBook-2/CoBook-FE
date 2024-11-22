import React from "react";
import styles from "./JoinSpaceLayout.module.css";
import { Space as SpaceType } from "@/types"; // 타입 이름 변경
import { useRouter } from "next/router";

interface JoinSpaceLayoutProps {
  spaces: SpaceType[];
}

export default function JoinSpaceLayout({ spaces }: JoinSpaceLayoutProps) {
  const router = useRouter();

  // 스페이스 클릭 처리 함수
  const handleClick = (spaceId: string) => {
    // 모달 없이 바로 해당 스페이스 페이지로 이동
    router.push(`/spaceMainHome/${spaceId}`);
  };

  return (
    <div className={styles.container}>
      {spaces.length === 0 ? (
        <p>참여한 스페이스가 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {spaces.map((space) => (
            <li key={space.spaceId}>
              <div
                className={styles.spaceContainer}
                onClick={() => handleClick(space.spaceId)}
                aria-label={`Join space ${space.name}`}
              >
                <div className={styles.title}>{space.name}</div>
                <div className={styles.tagContainer}>
                  {space.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
