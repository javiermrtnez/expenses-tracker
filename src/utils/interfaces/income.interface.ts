import { Timestamp } from 'firebase/firestore';

export type IncomeId = string;
export type IncomeDate = Timestamp;
export type IncomeDescription = string;
export type IncomeAmount = number;
export type IncomeCategory = string;

export interface Income {
  id: IncomeId;
  date: IncomeDate;
  description: IncomeDescription;
  amount: IncomeAmount;
  category: IncomeCategory;
}

export type IncomeWithoutId = Omit<Income, 'id'>;
