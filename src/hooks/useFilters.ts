import { useFiltersStore } from '../store/filters';

const useFilters = () => {
  const monthYearFilter = useFiltersStore((state) => state.monthYearFilter);
  const setMonthYearFilter = useFiltersStore((state) => state.setMonthYearFilter);
  const resetMonthYearFilter = useFiltersStore((state) => state.resetMonthYearFilter);
  const yearFilter = useFiltersStore((state) => state.yearFilter);
  const setYearFilter = useFiltersStore((state) => state.setYearFilter);
  const resetYearFilter = useFiltersStore((state) => state.resetYearFilter);

  return {
    monthYearFilter,
    yearFilter,
    setMonthYearFilter,
    setYearFilter,
    resetMonthYearFilter,
    resetYearFilter,
  };
};

export default useFilters;
