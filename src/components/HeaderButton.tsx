import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./HeaderButton.module.css";
import { useSpaceContext } from "@/context/SpaceContext";

interface ButtonConfig {
  label: string;
  icon: string;
  path: (spaceId: string) => string; // spaceId를 받아 경로 생성
}

export default function HeaderButton() {
  const router = useRouter();
  const { spaceId } = useSpaceContext(); // 전역 상태에서 spaceId 가져오기

  // spaceId가 없을 경우 기본값 설정
  const currentSpaceId = spaceId || "1";

  // 버튼 설정
  const buttons: ButtonConfig[] = [
    { label: "스페이스 검색", icon: "/search_space_0.png", path: () => "/spaceManagement/search" },
    { label: "스페이스 생성", icon: "/add_space_0.png", path: () => "/spaceManagement/create" },
    { label: "홈", icon: "/home_0.png", path: (id) => `/spaceMainHome/${id}` },
    { label: "영수증 업로드", icon: "/upload_0.png", path: (id) => `/receiptScan/${id}` },
    { label: "차트", icon: "/chart_0.png", path: (id) => `/chart/${id}` },
    { label: "캘린더", icon: "/calendar_0.png", path: (id) => `/calendar/${id}` },
    { label: "멤버 목록", icon: "/memberlist_0.png", path: (id) => `/members/${id}` },
    { label: "공지사항 수정", icon: "/edit_0.png", path: (id) => `/noticeEdit/${id}` },
    { label: "스페이스 관리", icon: "/setting_0.png", path: (id) => `/administerSpace/administerSpaceEnter/${id}` },
  ];

  // 버튼 필터링 로직
  const filteredButtons = buttons.filter((button) => {
    if (router.pathname.startsWith("/spaceManagement")) {
      // /spaceManagement 링크일 경우 스페이스 검색, 스페이스 생성만 보이도록 설정
      return button.path("") === "/spaceManagement/search" || button.path("") === "/spaceManagement/create";
    } else {
      // 그 외의 경우 스페이스 검색, 스페이스 생성을 제외한 버튼만 보이도록 설정
      return button.path(currentSpaceId) !== "/spaceManagement/search" && button.path(currentSpaceId) !== "/spaceManagement/create";
    }
  });

  return (
    <div className={styles.controls}>
      {filteredButtons.map((button) => {
        const buttonPath = button.path(currentSpaceId);
        const isActive = router.asPath === buttonPath; // 현재 경로와 버튼 경로 비교
  
        // 아이콘 경로 동적 변경
        const activeIcon = isActive 
          ? button.icon.replace("_0.png", "_1.png") // 0을 1로 변경
          : button.icon;
  
        return (
          <Link
            href={buttonPath}
            key={button.label}
            className={`${styles.link} ${isActive ? styles.activeLink : ""}`}
          >
            <button className={`${styles.button} ${isActive ? styles.activeButton : ""}`}>
              {button.label}
              <img src={activeIcon} alt={button.label} />
            </button>
          </Link>
        );
      })}
    </div>
  );
}
