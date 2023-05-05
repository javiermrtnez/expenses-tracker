import { Timestamp } from 'firebase/firestore';

export const getTimeFromTimestamp = (timestamp: Timestamp) => {
  return timestamp.toDate().getTime();
};

export const getMonthFromTimestamp = (timestamp: Timestamp) => {
  return timestamp.toDate().getMonth();
};

export const getFullYearFromTimestamp = (timestamp: Timestamp) => {
  return timestamp.toDate().getFullYear();
};
