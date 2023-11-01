import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./Memo.module.css";
import { BsCheck } from "react-icons/bs";
import { createMemo, deleteDay, hyDay, hyEvent } from "../../api/calendar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LengthStateType, memoLengthCheck } from "../../redux/redux";
import { useDispatch } from "react-redux";

export default function Memo({
  hyDay,
  clickDay,
}: {
  hyDay: hyDay | undefined;
  clickDay: string;
}): JSX.Element {
  const queryClient = useQueryClient();
  const eventsLengthstate = useSelector(
    (state: LengthStateType) => state.eventsLength
  );
  const dispatch = useDispatch();
  const createMemoMutate = useMutation({
    mutationFn: ({ date, memo }: { date: string; memo: string }) =>
      createMemo(date, memo),
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
  const [memoValue, setMemoValue] = useState<string>("");
  useEffect(() => {
    setMemoValue(() => {
      if (hyDay?.memo) return hyDay.memo;
      return "";
    });
  }, [clickDay]);
  useEffect(() => {
    dispatch(memoLengthCheck(memoValue.length));
  }, [memoValue]);
  const handleCheck = () => {
    if (clickDay === "") {
      toastNotifyDayError();
      return;
    }
    const date = clickDay;
    const memo = memoValue;
    if (memo.trim().length === 0 && eventsLengthstate === 0) {
      deleteDayMutate.mutate({ date });
    } else createMemoMutate.mutate({ date, memo });
    dispatch(memoLengthCheck(memoValue.length));
  };
  const toastNotify = () =>
    toast.success("메모 저장 완료", {
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
    <div className={styles.memo}>
      <div className={styles.memoTop}>
        <div className={styles.memoTopLogo}>Memo</div>
        <div className={styles.memoTopMenu}>
          <BsCheck
            className={styles.memoTopMenuCheck}
            size={27}
            onClick={handleCheck}
          />
        </div>
      </div>
      <div className={styles.memoMain}>
        <TextareaAutosize
          className={styles.memoTextarea}
          minRows={4}
          value={memoValue}
          onChange={(ev) => setMemoValue(ev.target.value)}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
