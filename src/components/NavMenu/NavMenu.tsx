import styles from "./NavMenu.module.css";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavStateType, navOff } from "../../redux/redux";
import { useNavigate } from "react-router-dom";

export default function NavMenu(): JSX.Element {
  const navigate = useNavigate();
  const navState = useSelector((state: NavStateType) => state.nav);
  const dispatch = useDispatch();
  const handleX = () => {
    dispatch(navOff());
  };
  return (
    <div className={navState ? `${styles.navMenu}` : `${styles.navMenuHidden}`}>
      <div className={styles.x}>
        <BsX size={35} onClick={handleX} className={styles.xIcon} />
      </div>
      <div className={styles.navMenuCenter}>
        <div
          className={styles.home}
          onClick={() => {
            navigate("./");
          }}
        >
          HOME
        </div>
        <div
          className={styles.calendar}
          onClick={() => {
            navigate("./calendar");
          }}
        >
          CALENDAR
        </div>
        <div className={styles.wishlist}>WISHLIST</div>
        <div className={styles.adult}>19</div>
        <div className={styles.setting}>SETTING</div>
        <div className={styles.information}>INFORMATION</div>
      </div>
      <div className={styles.navMenuFooter}>
        <div className={styles.phone}>Contact</div>
        <div className={styles.infoBox}>
          am 11:00 - pm 18:00
          <br />
          lunch pm 12:00 - 13:00
          <br />
          Sat, Sun, Holiday OFF
        </div>
      </div>
    </div>
  );
}
