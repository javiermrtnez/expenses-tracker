import { YearFilter } from '../interfaces/filter.interface';
import { Transaction, TransactionDateAmount } from '../interfaces/transaction.interface';
import { getMonthFromTimestamp } from './converters';
import { getFullYearFromTimestamp } from './converters';
import { getNormalizedTransactions } from './transactions';

const getYearTransactions = (transactions: Transaction[], year: YearFilter) => {
  return transactions
    .filter((value) => getFullYearFromTimestamp(value.date) === year)
    .sort((a, b) => b.date.toMillis() - a.date.toMillis());
};

const getTransactionsGroupedByMonth = (normalizedTransactions: TransactionDateAmount[]) => {
  return normalizedTransactions.reduce((accTransactions: TransactionDateAmount[], transaction) => {
    const { date, amount } = transaction;

    // Find an existing object in the accumulator with the same date
    const existingObject = accTransactions.find(
      (obj) => getMonthFromTimestamp(obj.date) === getMonthFromTimestamp(date)
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

const populateEmptyTransactions = (transactionsGroupedByMonth: TransactionDateAmount[]) => {
  const months = [
    { month: 0, amount: 0 },
    { month: 1, amount: 0 },
    { month: 2, amount: 0 },
    { month: 3, amount: 0 },
    { month: 4, amount: 0 },
    { month: 5, amount: 0 },
    { month: 6, amount: 0 },
    { month: 7, amount: 0 },
    { month: 8, amount: 0 },
    { month: 9, amount: 0 },
    { month: 10, amount: 0 },
    { month: 11, amount: 0 },
  ];

  transactionsGroupedByMonth.forEach((transaction) => {
    const month = getMonthFromTimestamp(transaction.date);
    months[month].amount += transaction.amount;
  });

  return months;
};

export const getYearTransactionsByMonth = (transactions: Transaction[], year: YearFilter) => {
  const yearTransactions = getYearTransactions(transactions, year);
  const normalizedTransactions = getNormalizedTransactions(yearTransactions);
  const transactionsGroupedByMonth = getTransactionsGroupedByMonth(normalizedTransactions);

  return populateEmptyTransactions(transactionsGroupedByMonth);
};
