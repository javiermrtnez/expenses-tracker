import { useFiltersStore } from '../store/filters';

const useFilters = () => {
  const monthYearFilter = useFiltersStore((state) => state.monthYearFilter);
  const setMonthYearFilter = useFiltersStore((state) => state.setMonthYearFilter);
  const resetMonthYearFilter = useFiltersStore((state) => state.resetMonthYearFilter);

  return {
    monthYearFilter,
    setMonthYearFilter,
    resetMonthYearFilter,
  };
};

export default useFilters;
