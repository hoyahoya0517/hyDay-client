import { hyEvent } from "../../api/calendar";
import Color from "../Color/Color";
import styles from "./EventInput.module.css";
import { useState, useEffect } from "react";

export default function EventInput({
  hyEvent,
  index,
  currentHyDayEvent,
  setCurrentHyDayEvent,
}: {
  hyEvent: hyEvent;
  index: number;
  currentHyDayEvent: hyEvent[];
  setCurrentHyDayEvent: React.Dispatch<React.SetStateAction<hyEvent[]>>;
}): JSX.Element {
  const [colorModal, setColorModal] = useState<boolean>(false);
  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const array = [...currentHyDayEvent];
    array[index].title = e.target.value;
    setCurrentHyDayEvent(array);
  };
  const colorModalHandle = () => {
    if (colorModal) setColorModal(false);
    else setColorModal(true);
  };
  return (
    <div className={styles.eventInput}>
      <div className={styles.eventInputMain}>
        <input value={hyEvent.title} onChange={changeHandle} />
      </div>
      <div
        className={styles.color}
        style={{ backgroundColor: hyEvent.backgroundColor }}
        onClick={colorModalHandle}
      ></div>
      {colorModal && (
        <Color
          colorModal={colorModal}
          setColorModal={setColorModal}
          index={index}
          currentHyDayEvent={currentHyDayEvent}
          setCurrentHyDayEvent={setCurrentHyDayEvent}
        />
      )}
    </div>
  );
}
