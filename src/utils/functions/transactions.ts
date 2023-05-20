import { Transaction } from '../interfaces/transaction.interface';

export const getNormalizedTransactions = (transactions: Transaction[]) => {
  return transactions.map((transaction) => ({
    amount: transaction.amount,
    date: transaction.date,
  }));
};
