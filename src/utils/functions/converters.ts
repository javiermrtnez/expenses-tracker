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

export const convertDateToTimestampWithoutTime = (date: Date | null | undefined) => {
  const day = date?.getDate();
  const month = date?.getMonth();
  const year = date?.getFullYear();

  return Timestamp.fromDate(new Date(year, month, day));
};
