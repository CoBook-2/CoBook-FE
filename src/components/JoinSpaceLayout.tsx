import React, { useState, useEffect } from "react";
import styles from "./JoinSpaceLayout.module.css";
import { Space as SpaceType } from "@/types";
import { useRouter } from "next/router";
import { useSpaceContext } from "@/context/SpaceContext";

interface JoinSpaceLayoutProps {
  spaces: SpaceType[];
}

export default function JoinSpaceLayout({ spaces }: JoinSpaceLayoutProps) {
  const router = useRouter();
  const { setSpaceId } = useSpaceContext(); // 전역 상태를 업데이트할 함수 가져오기
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null); // 활성화된 spaceId 상태 추가

  // URL 경로 감지 및 상태 초기화
  useEffect(() => {
    if (!router.pathname.startsWith("/spacePage")) {
      setSelectedSpaceId(null); // /spacePage로 시작하지 않으면 상태 초기화
    }
  }, [router.pathname]);

  // 스페이스 클릭 처리 함수
  const handleClick = (spaceId: string) => {
    setSpaceId(spaceId); // 전역 상태에 spaceId 저장
    setSelectedSpaceId(spaceId); // 클릭된 spaceId 저장
    router.push(`/spacePage/${spaceId}?action=home`); // 동적 링크로 이동
  };

  return (
    <div className={styles.container}>
      {spaces.length === 0 ? (
        <p>참여한 스페이스가 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {spaces.map((space) => (
            <li
              key={space.spaceId}
              className={selectedSpaceId === space.spaceId ? styles.selected : ""}
            >
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
