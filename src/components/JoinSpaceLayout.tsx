import React, { useState } from "react";
import styles from "./JoinSpaceLayout.module.css";
import AskEnterModal from "@/pages/modal/enterSpace/askEnterModal";
import InputEnterCodeModal from "@/pages/modal/enterSpace/inputEnterCodeModal";


interface Space {
  name: string;
  tags: string[];
  spaceId: string; // spaceId 추가
  enterCode?: string;
}

interface JoinSpaceLayoutProps {
  spaces: Space[];
}

export default function JoinSpaceLayout({ spaces }: JoinSpaceLayoutProps) {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      <ul className={styles.list}>
        {spaces.map((space) => (
          <li key={space.spaceId} className={styles.listItem}>
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
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* 모달 컴포넌트 */}
      {isModalOpen &&
        selectedSpace &&
        (selectedSpace.enterCode ? (
          <InputEnterCodeModal
            spaceName={selectedSpace.name}
            onClose={closeModal}
          />
        ) : (
          <AskEnterModal spaceName={selectedSpace.name} onClose={closeModal} />
        ))}
    </div>
  );
}
