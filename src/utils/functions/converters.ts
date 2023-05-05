import { Timestamp } from 'firebase/firestore';

export const getTimeFromTimestamp = (date: Timestamp) => {
  return date.toDate().getTime();
};

export const getMonthFromTimestamp = (date: Timestamp) => {
  return date.toDate().getMonth();
};

export const getFullYearFromTimestamp = (date: Timestamp) => {
  return date.toDate().getFullYear();
};
