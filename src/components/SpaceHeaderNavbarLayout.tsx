import HeaderButton from "./HeaderButton";
import HeaderIcon from "./HeaderIcon";
import style from "./SpaceHeaderNavbarLayout.module.css";

export default function SpaceHeaderNavbarLayout(){
    return (
        <div className={`${style.header} `}>
          <HeaderButton/>
          <HeaderIcon />
        </div>
      );
}