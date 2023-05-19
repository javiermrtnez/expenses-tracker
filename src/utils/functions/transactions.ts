import { Timestamp } from 'firebase/firestore';
import {
  getFullYearFromTimestamp,
  getMonthFromTimestamp,
  getTimeFromTimestamp,
} from './converters';
import {
  Transaction,
  TransactionCategoryAmount,
  TransactionDateAmount,
} from '../interfaces/transaction.interface';
import { MonthYearFilter } from '../interfaces/filter.interface';

export const getMonthTransactions = (
  transactions: Transaction[],
  monthYearFilter: MonthYearFilter
) => {
  const { month, year } = monthYearFilter;

  return transactions
    .filter(
      (value) =>
        getMonthFromTimestamp(value.date) === month && getFullYearFromTimestamp(value.date) === year
    )
    .sort((a, b) => b.date.toMillis() - a.date.toMillis());
};

export const getMonthTransactionsTotalAmount = (transactions: Transaction[]) => {
  return transactions.reduce((acc, curr) => acc + curr.amount, 0);
};

const getNormalizedTransactions = (transactions: Transaction[]) => {
  return transactions.map((transaction) => ({
    amount: transaction.amount,
    date: transaction.date,
  }));
};

const getTransactionsGroupedByDay = (normalizedTransactions: TransactionDateAmount[]) => {
  return normalizedTransactions.reduce((accTransactions: TransactionDateAmount[], transaction) => {
    const { date, amount } = transaction;

    // Find an existing object in the accumulator with the same date
    const existingObject = accTransactions.find(
      (obj) => getTimeFromTimestamp(obj.date) === getTimeFromTimestamp(date)
    );

    if (existingObject) {
      existingObject.amount += amount;
    } else {
      // Create a new object with the date and amount
      accTransactions.push({ date, amount });
    }

    return accTransactions;
  }, []);
};

const populateEmptyTransactions = (
  transactionsGroupedByDay: TransactionDateAmount[],
  monthYearFilter: MonthYearFilter
) => {
  const { year, month } = monthYearFilter;
  const transactionsByDay = [];

  // Create a new Date object for the first day of the month
  const startDate = new Date(year, month, 1);
  // Create a new Date object for the last day of the month
  const endDate = new Date(year, month + 1, 0);

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = Timestamp.fromDate(new Date(date));

    const index = transactionsGroupedByDay.findIndex(
      (transaction) =>
        getTimeFromTimestamp(transaction.date) === getTimeFromTimestamp(formattedDate)
    );

    if (index >= 0) {
      transactionsByDay.push(transactionsGroupedByDay[index]);
    } else {
      transactionsByDay.push({ date: formattedDate, amount: 0 });
    }
  }

  return transactionsByDay;
};

export const getMonthTransactionsByDay = (
  transactions: Transaction[],
  monthYearFilter: MonthYearFilter
) => {
  const normalizedTransactions = getNormalizedTransactions(transactions);
  const transactionsGroupedByDay = getTransactionsGroupedByDay(normalizedTransactions);

  return populateEmptyTransactions(transactionsGroupedByDay, monthYearFilter);
};

export const getMonthTransactionsByCategory = (transactions: Transaction[]) => {
  const normalizedTransactions = transactions.map((transaction) => ({
    amount: transaction.amount,
    category: transaction.category,
  }));

  const transactionsGroupedByCategory = normalizedTransactions.reduce(
    (accTransactions: TransactionCategoryAmount[], transaction) => {
      const { category, amount } = transaction;

      // Find an existing object in the accumulator with the same date
      const existingObject = accTransactions.find((obj) => obj.category === category);

      if (existingObject) {
        existingObject.amount += amount;
      } else {
        // Create a new object with the date and amount
        accTransactions.push({ category, amount });
      }

      return accTransactions;
    },
    []
  );

  return transactionsGroupedByCategory;
};
