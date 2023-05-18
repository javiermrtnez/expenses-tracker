import { create } from 'zustand';
import * as incomesService from '../services/incomes.service';
import { Income, IncomeId } from '../utils/interfaces/income.interface';

interface IncomesState {
  loadingIncomesStore: boolean;
  incomes: Income[];
  clearIncomesStore: () => void;
  fetchIncomesStore: () => Promise<void>;
  createIncomeStore: ({ id, date, description, amount, category }: Income) => void;
  deleteIncomeStore: (id: IncomeId) => void;
}

export const useIncomesStore = create<IncomesState>((set) => ({
  loadingIncomesStore: false,
  incomes: [],
  clearIncomesStore: () => {
    set({ incomes: [] });
  },
  fetchIncomesStore: async () => {
    set({ loadingIncomesStore: true });

    incomesService
      .fetchIncomes()
      .then((incomes) => {
        set({ incomes });
      })
      .finally(() => {
        set({ loadingIncomesStore: false });
      });
  },
  createIncomeStore: ({ id, date, description, amount, category }) => {
    const income = {
      id,
      date,
      description,
      amount,
      category,
    };

    set((state) => ({ incomes: [...state.incomes, income] }));
  },
  deleteIncomeStore: (id) => {
    set((state) => ({ incomes: state.incomes.filter((income) => income.id !== id) }));
  },
}));
