import { useState, useEffect } from "react";
import { createEvent, deleteDay, hyDay, hyEvent } from "../../api/calendar";
import EventInput from "../EventInput/EventInput";
import styles from "./Event.module.css";
import { BsPlus, BsCheck } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LengthStateType, eventsLengthCheck } from "../../redux/redux";

export default function Event({
  hyDay,
  clickDay,
}: {
  hyDay: hyDay | undefined;
  clickDay: string;
}): JSX.Element {
  const queryClient = useQueryClient();
  const memoLengthstate = useSelector(
    (state: LengthStateType) => state.memoLength
  );
  const dispatch = useDispatch();
  const [currentHyDayEvent, setCurrentHyDayEvent] = useState<hyEvent[]>([]);
  useEffect(() => {
    setCurrentHyDayEvent(() => {
      if (hyDay?.events) return hyDay.events;
      return [];
    });
  }, [clickDay]);
  useEffect(() => {
    dispatch(eventsLengthCheck(currentHyDayEvent.length));
  }, [currentHyDayEvent]);

  const createEventMutate = useMutation({
    mutationFn: ({ date, events }: { date: string; events: hyEvent[] }) =>
      createEvent(date, events),
    onSuccess() {
      toastNotify();
      queryClient.invalidateQueries({ queryKey: ["hyDays"] });
    },
  });
  const deleteDayMutate = useMutation({
    mutationFn: ({ date }: { date: string }) => deleteDay(date),
    onSuccess() {
      toastNotifyDelete();
      queryClient.invalidateQueries({ queryKey: ["hyDays"] });
    },
  });
  const handlePlus = () => {
    const array = [...currentHyDayEvent];
    if (clickDay.length > 10) {
      const start = clickDay.split("~")[0];
      const end = clickDay.split("~")[1];
      const fixEndDay = moment(end).add(1, "day").format("YYYY-MM-DD");
      array.unshift({
        id: Date.now().toString(),
        title: " ",
        start,
        end: fixEndDay,
      });
      setCurrentHyDayEvent(array);
    } else {
      array.unshift({
        id: Date.now().toString(),
        title: " ",
        date: clickDay,
      });
      setCurrentHyDayEvent(array);
    }
  };
  const handleCheck = () => {
    if (clickDay === "") {
      toastNotifyDayError();
      return;
    }
    const date = clickDay;
    let events = currentHyDayEvent;
    events = events.filter((event) => {
      return event.title?.trim().length !== 0;
    });
    // events = events.map((event) => {
    //   let newTitle = event.title!.trim();
    //   return { ...event, title: newTitle };
    // });
    if (events.length === 0 && memoLengthstate === 0) {
      deleteDayMutate.mutate({ date });
    } else createEventMutate.mutate({ date, events });
    dispatch(eventsLengthCheck(events.length));
  };
  const toastNotify = () =>
    toast.success("이벤트 저장 완료", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const toastNotifyDayError = () =>
    toast.error("날짜를 선택해 주세요", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const toastNotifyDelete = () => {
    toast.info("저장 완료", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className={styles.event}>
      <div className={styles.eventTop}>
        <div className={styles.eventTopLogo}>Event</div>
        <div className={styles.eventTopMenu}>
          <BsPlus
            className={styles.eventTopMenuPlus}
            onClick={handlePlus}
            size={27}
          />
          <BsCheck
            className={styles.eventTopMenuCheck}
            onClick={handleCheck}
            size={27}
          />
        </div>
      </div>
      <div className={styles.eventMain}>
        {currentHyDayEvent?.map((event: hyEvent, index) => {
          if (event.title?.length !== 0) {
            return (
              <EventInput
                hyEvent={event}
                index={index}
                currentHyDayEvent={currentHyDayEvent}
                setCurrentHyDayEvent={setCurrentHyDayEvent}
                key={index}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
