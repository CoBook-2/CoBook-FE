import React, { useState } from "react";
import styles from "./JoinSpaceLayout.module.css";
import AskEnterModal from "@/pages/modal/enterSpace/askEnterModal";
import InputEnterCodeModal from "@/pages/modal/enterSpace/inputEnterCodeModal";
import { Space } from "@/types"; // 올바른 타입 가져오기

interface JoinSpaceLayoutProps {
  spaces: Space[];  // spaces는 Space[] 타입
}

export default function JoinSpaceLayout({ spaces }: JoinSpaceLayoutProps) {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 스페이스 클릭 처리 함수
  const handleClick = (spaceId: string) => {
    const foundSpace = spaces.find((space) => space.spaceId === spaceId);
    if (foundSpace) {
      setSelectedSpace(foundSpace);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpace(null);
  };

  return (
    <div className={styles.container}>
      {spaces.length === 0 ? (
        <p>참여한 스페이스가 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {spaces.map((space) => (
            <li key={space.spaceId}>
              <button
                className={`${styles.spaceButton} ${
                  selectedSpace?.spaceId === space.spaceId ? styles.selected : ""
                }`}
                onClick={() => handleClick(space.spaceId)}
                aria-label={`Join space ${space.name}`}
              >
                <div className={styles.spaceContainer}>
                  <div className={styles.title}>{space.name}</div>
                  <div className={styles.tagContainer}>
                    {space.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 모달 컴포넌트 */}
      {isModalOpen &&
        selectedSpace &&
        (selectedSpace.enterCode ? (
          <InputEnterCodeModal
            spaceName={selectedSpace.name}
            onClose={closeModal}
            spaceId={selectedSpace.spaceId} // spaceId 전달
            enterCode={selectedSpace.enterCode} // enterCode 전달
          />
        ) : (
          <AskEnterModal
            spaceName={selectedSpace.name}
            onClose={closeModal}
          />
        ))}
    </div>
  );
}
