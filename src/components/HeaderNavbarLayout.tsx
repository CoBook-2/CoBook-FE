import style from "./HeaderNavbarLayout.module.css";

export default function HeaderNavbarLayout() {
  return (
    <div className={style.header}>
      <div className={style.controls}>
        <div className={style.search}>
          <button>
            스페이스 검색
            <img src="/search_space_0.png" alt="검색" />
          </button>
        </div>
        <div className={style.actions}>
          <button>
            스페이스 생성
            <img src="/add_space_0.png" alt="생성" />
          </button>
        </div>
      </div>
      <div className={style.icons}>
        <img src="/bell_1.png" alt="알림" />
        <img src="/user.png" alt="프로필" />
      </div>
    </div>
  );
}
