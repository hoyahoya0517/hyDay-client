import { hyEvent } from "../../api/calendar";
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
  const [eventInput, setEventInput] = useState<string>("");
  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const array = [...currentHyDayEvent];
    array[index].title = e.target.value;
    setCurrentHyDayEvent(array);
  };
  // useEffect(() => {
  //   setEventInput(() => {
  //     if (hyEvent.title) return hyEvent.title;
  //     return "";
  //   });
  // }, [hyEvent]);
  return (
    <div className={styles.eventInput}>
      <input value={hyEvent.title} onChange={changeHandle} />
    </div>
  );
}
