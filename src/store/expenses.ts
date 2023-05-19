import { create } from 'zustand';
import * as expensesService from '../services/expenses.service';
import { Transaction, TransactionId } from '../utils/interfaces/transaction.interface';

interface ExpensesState {
  loadingExpensesStore: boolean;
  expenses: Transaction[];
  clearExpensesStore: () => void;
  fetchExpensesStore: () => Promise<void>;
  createExpenseStore: ({ id, date, description, amount, category }: Transaction) => void;
  deleteExpenseStore: (id: TransactionId) => void;
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
  createExpenseStore: ({ id, date, description, amount, category }) => {
    const expense = {
      id,
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
