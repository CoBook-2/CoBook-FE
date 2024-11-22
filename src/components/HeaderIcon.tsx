import style from "./HeaderIcon.module.css";

export default function HeaderIcon(){
    return (
        <div className={style.icons}>
            <img src="/bell_1.png" alt="알림" />
            <img src="/user.png" alt="프로필" />
        </div>
      );
}