import { Timestamp } from 'firebase/firestore';

export type TransactionId = string;
export type TransactionDate = Timestamp;
export type TransactionDescription = string;
export type TransactionAmount = number;
export type TransactionCategory = string;

export interface Transaction {
  id: TransactionId;
  date: TransactionDate;
  description: TransactionDescription;
  amount: TransactionAmount;
  category: TransactionCategory;
}

export type TransactionWithoutId = Omit<Transaction, 'id'>;

export interface TransactionDateAmount {
  date: TransactionDate;
  amount: TransactionAmount;
}

export interface TransactionCategoryAmount {
  category: TransactionCategory;
  amount: TransactionAmount;
}
