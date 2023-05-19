import { create } from 'zustand';
import { MonthYearFilter } from '../utils/interfaces/filter.interface';

interface FiltersState {
  monthYearFilter: MonthYearFilter;
  setMonthYearFilter: ({ month, year }: MonthYearFilter) => void;
  resetMonthYearFilter: () => void;
}

const MONTH_YEAR_INITIAL_STATE = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

export const useFiltersStore = create<FiltersState>((set) => ({
  monthYearFilter: MONTH_YEAR_INITIAL_STATE,
  setMonthYearFilter: ({ month, year }) => {
    set({ monthYearFilter: { month, year } });
  },
  resetMonthYearFilter: () => {
    set({ monthYearFilter: MONTH_YEAR_INITIAL_STATE });
  },
}));
