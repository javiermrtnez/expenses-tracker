import { Timestamp } from 'firebase/firestore';

export type ExpenseId = string;
export type ExpenseDate = Timestamp;
export type ExpenseDescription = string;
export type ExpenseAmount = number;
export type ExpenseCategory = string;

export interface Expense {
  id: ExpenseId;
  date: ExpenseDate;
  description: ExpenseDescription;
  amount: ExpenseAmount;
  category: ExpenseCategory;
}

export type ExpenseWithoutId = Omit<Expense, 'id'>;
