import { create } from 'zustand';
import { Expense, ExpenseId } from '../utils/interfaces/expense.interface';
import * as expensesService from '../services/expenses.service';

interface MonthYearFilter {
  month: number;
  year: number;
}

interface ExpensesState {
  loadingExpensesStore: boolean;
  expenses: Expense[];
  monthYearFilter: MonthYearFilter;
  clearExpensesStore: () => void;
  fetchExpensesStore: () => Promise<void>;
  createExpenseStore: ({ id, date, description, amount, category }: Expense) => void;
  deleteExpenseStore: (id: ExpenseId) => void;
  setMonthYearFilter: ({ month, year }: MonthYearFilter) => void;
  resetMonthYearFilter: () => void;
}

const MONTH_YEAR_INITIAL_STATE = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

export const useExpensesStore = create<ExpensesState>((set) => ({
  loadingExpensesStore: false,
  expenses: [],
  monthYearFilter: MONTH_YEAR_INITIAL_STATE,
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
  setMonthYearFilter: ({ month, year }) => {
    set({ monthYearFilter: { month, year } });
  },
  resetMonthYearFilter: () => {
    set({ monthYearFilter: MONTH_YEAR_INITIAL_STATE });
  },
}));
