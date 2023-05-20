import { Transaction } from '../interfaces/transaction.interface';
import { numberIntoPercentage } from './formatters';

export const getNormalizedTransactions = (transactions: Transaction[]) => {
  return transactions.map((transaction) => ({
    amount: transaction.amount,
    date: transaction.date,
  }));
};

export const getSavingsPercentage = (savingsAmount: number, incomesAmount: number) => {
  if (savingsAmount === 0) {
    // If there aren't saving, savings are 0%
    return 0;
  } else if (incomesAmount === 0) {
    // If there aren't incomes, savings are 100%
    return 100;
  } else {
    // Any other case, compute savings / income
    return numberIntoPercentage(savingsAmount / incomesAmount);
  }
};
