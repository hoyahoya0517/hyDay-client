import styles from "./Plan.module.css";
import { hyDay } from "../../api/calendar";
import Event from "../Event/Event";
import Memo from "../Memo/Memo";

export default function Plan({
  hyDay,
  clickDay,
}: {
  hyDay: hyDay;
  clickDay: string;
}): JSX.Element {
  return (
    <div className={styles.plan}>
      <div className={styles.planDay}>{clickDay}</div>
      <div className={styles.planMain}>
        <Event hyDay={hyDay} clickDay={clickDay} />
        <Memo hyDay={hyDay} clickDay={clickDay} />
      </div>
    </div>
  );
}
