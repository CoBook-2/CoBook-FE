import React, { useState } from "react";
import styles from "./JoinSpaceLayout.module.css";
import AskEnterModal from "@/pages/modal/enterSpace/askEnterModal";

interface Space {
  name: string;
  tags: string[];
}

interface JoinSpaceLayoutProps {
  spaces: Space[];
}

export default function JoinSpaceLayout({ spaces }: JoinSpaceLayoutProps) {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = (spaceName: string) => {
    setSelectedSpace(spaceName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpace(null);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {spaces.map((space) => (
          <li key={space.name} className={styles.listItem}>
            <button
              className={`${styles.spaceButton} ${
                selectedSpace === space.name ? styles.selected : ""
              }`}
              onClick={() => handleClick(space.name)}
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
      {isModalOpen && selectedSpace && (
        <AskEnterModal spaceName={selectedSpace} onClose={closeModal} />
      )}
    </div>
  );
}
