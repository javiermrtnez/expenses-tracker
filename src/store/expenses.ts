import { create } from 'zustand';
import { Expense, ExpenseId } from '../utils/interfaces/expense.interface';
import * as expensesService from '../services/expenses.service';

interface ExpensesState {
  loadingExpensesStore: boolean;
  expenses: Expense[];
  clearExpensesStore: () => void;
  fetchExpensesStore: () => Promise<void>;
  createExpenseStore: ({ id, date, description, amount, category }: Expense) => void;
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
