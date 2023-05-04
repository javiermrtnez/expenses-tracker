import { create } from 'zustand';
import {
  Expense,
  ExpenseAmount,
  ExpenseCategory,
  ExpenseDate,
  ExpenseDescription,
  ExpenseId,
} from '../utils/interfaces/expense.interface';
import * as expensesService from '../services/expenses.service';

interface ExpensesState {
  loadingExpensesStore: boolean;
  expenses: Expense[];
  clearExpensesStore: () => void;
  fetchExpensesStore: () => Promise<void>;
  createExpenseStore: (
    date: ExpenseDate,
    description: ExpenseDescription,
    amount: ExpenseAmount,
    category: ExpenseCategory
  ) => void;
  deleteExpenseStore: (id: ExpenseId) => void;
}

export const useExpensesStore = create<ExpensesState>((set) => ({
  loadingExpensesStore: false,
  expenses: [],
  clearExpensesStore: () => {
    set({ expenses: [] });
  },
  fetchExpensesStore: async () => {
    set({ loadingExpensesStore: true });

    expensesService
      .fetchExpenses()
      .then((expenses) => {
        set({ expenses });
      })
      .finally(() => {
        set({ loadingExpensesStore: false });
      });
  },
  createExpenseStore: (date, description, amount, category) => {
    const expense = {
      id: crypto.randomUUID(),
      date,
      description,
      amount,
      category,
    };

    set((state) => ({ expenses: [...state.expenses, expense] }));
  },
  deleteExpenseStore: (id) => {
    set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id) }));
  },
}));
