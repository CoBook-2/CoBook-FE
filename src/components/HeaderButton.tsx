import { useRouter } from "next/router";
import styles from "./HeaderButton.module.css";
import { Button } from "../types"; // 타입 import

export default function HeaderButton() {
  const router = useRouter();

  const buttonsForSpaceManagementPage: Button[] = [
    {
      label: "스페이스 검색",
      icon: "/search_space_0.png",
      path: "/spaceManagementPage?type=search",
    },
    {
      label: "스페이스 생성",
      icon: "/add_space_0.png",
      path: "/spaceManagementPage?type=create",
    },
  ];

  const buttonsForSpacePage: Button[] = [
    {
      label: "홈",
      icon: "/home_0.png",
      path: `/spacePage/${router.query.spaceId}?action=home`,
    },
    {
      label: "영수증 업로드",
      icon: "/upload_0.png",
      path: `/spacePage/${router.query.spaceId}?action=receipt`,
    },
    {
      label: "차트",
      icon: "/chart_0.png",
      path: `/spacePage/${router.query.spaceId}?action=chart`,
    },
    {
      label: "캘린더",
      icon: "/calendar_0.png",
      path: `/spacePage/${router.query.spaceId}?action=calendar`,
    },
    {
      label: "멤버 목록",
      icon: "/memberlist_0.png",
      action: () => {
        alert("멤버 목록 버튼 동작 구현 필요");
      },
    },
    {
      label: "공지사항 수정",
      icon: "/edit_0.png",
      path: `/spacePage/${router.query.spaceId}?action=noticeEdit`,
    },
    {
      label: "스페이스 관리",
      icon: "/setting_0.png",
      path: `/spacePage/${router.query.spaceId}?action=administer`,
    },
  ];

  const buttons: Button[] =
    router.pathname.startsWith("/spaceManagementPage")
      ? buttonsForSpaceManagementPage
      : router.pathname.startsWith("/spacePage")
      ? buttonsForSpacePage
      : [];

  const isActive = (path?: string) => path && router.asPath === path;

  return (
    <div>
      <div className={styles.controls}>
        {buttons.map((button) => {
          // 아이콘 경로를 활성화 상태에 따라 변경
          const icon = isActive(button.path)
            ? button.icon.replace("_0", "_1") // 활성화된 경우 "_0"을 "_1"로 변경
            : button.icon;

          return (
            <button
              key={button.label}
              className={`${styles.button} ${
                isActive(button.path) ? styles.activeButton : ""
              }`}
              onClick={() => {
                if (button.path) router.push(button.path);
                if (button.action) button.action();
              }}
            >
              {button.label}
              <img src={icon} alt={button.label} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
