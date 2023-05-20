import { create } from 'zustand';
import { MonthYearFilter, YearFilter } from '../utils/interfaces/filter.interface';

interface FiltersState {
  monthYearFilter: MonthYearFilter;
  yearFilter: YearFilter;
  setMonthYearFilter: ({ month, year }: MonthYearFilter) => void;
  setYearFilter: (year: YearFilter) => void;
  resetMonthYearFilter: () => void;
  resetYearFilter: () => void;
}

const MONTH_YEAR_INITIAL_STATE = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
};

const YEAR_INITIAL_STATE = new Date().getFullYear();

export const useFiltersStore = create<FiltersState>((set) => ({
  monthYearFilter: MONTH_YEAR_INITIAL_STATE,
  yearFilter: YEAR_INITIAL_STATE,
  setMonthYearFilter: ({ month, year }) => {
    set({ monthYearFilter: { month, year } });
  },
  setYearFilter: (year) => {
    set({ yearFilter: year });
  },
  resetMonthYearFilter: () => {
    set({ monthYearFilter: MONTH_YEAR_INITIAL_STATE });
  },
  resetYearFilter: () => {
    set({ yearFilter: YEAR_INITIAL_STATE });
  },
}));
