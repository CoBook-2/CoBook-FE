import styles from "./JoinSpaceLayout.module.css";

interface Space {
  title: string;
  tags: string[];
}

export default function JoinSpaceLayout({ spaces }: { spaces: Space[] }) {
  const handleClick = (title: string) => {
    // 추가적인 로직을 여기에 작성 (예: 페이지 이동, API 호출 등)
  };
  return (
    <div>
      <ul className={styles.list}>
        {spaces.map((space, index) => (
          <li key={index}>
            <div
              className={styles.spaceContainer}
              onClick={() => handleClick(space.title)}
            >
              <div className={styles.title}>{space.title}</div>
              <div className={styles.tagContainer}>
                {space.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
