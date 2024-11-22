import HeaderButton from "./HeaderButton";
import HeaderIcon from "./HeaderIcon";
import style from "./HeaderNavbarLayout.module.css";

export default function HeaderNavbarLayout() {
  return (
    <div className={`${style.header} `}>
      <HeaderButton />
      <HeaderIcon />
    </div>
  );
}
