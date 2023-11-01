import axios from "axios";

export type hyEvent = {
  id?: string;
  title?: string;
  date?: string;
  start?: string;
  end?: string;
  force?: String;
};

export type hyDay = {
  date: string;
  events: hyEvent[];
  memo: string;
} | null;

export async function getHyDays() {
  const hydays = await axios.get(`${process.env.REACT_APP_BASEURL}/calendar`);
  return hydays.data;
}

export function createMemo(date: string, memo: string) {
  return axios.post(`${process.env.REACT_APP_BASEURL}/calendar/memo`, {
    date,
    memo,
  });
}

export function createEvent(date: string, events: hyEvent[]) {
  return axios.post(`${process.env.REACT_APP_BASEURL}/calendar/event`, {
    date,
    events,
  });
}

export function deleteDay(date: string) {
  return axios.delete(`${process.env.REACT_APP_BASEURL}/calendar/${date}`);
}
