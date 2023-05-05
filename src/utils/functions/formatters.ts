import { Timestamp } from 'firebase/firestore';

export const amountFormatter = (number: number) =>
  `${Intl.NumberFormat('es-ES').format(number).toString()} €`;

export const fromTimestampToFormattedDate = (date: Timestamp) => {
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
  };

  return date.toDate().toLocaleDateString('es-ES', DATE_OPTIONS);
};
