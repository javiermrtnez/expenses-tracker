import useFilters from '../hooks/useFilters';
import PreviousNextFilter from './PreviousNextFilter';

const MONTH_YEAR_FILTER_ACTIONS = {
  PREVIOUS: 'previous',
  NEXT: 'next',
};

const MonthYearFilter = () => {
  const { monthYearFilter, setMonthYearFilter, resetMonthYearFilter } = useFilters();

  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
  };

  const todayMonthYear = new Date(monthYearFilter.year, monthYearFilter.month, 1)
    .toLocaleDateString('es-ES', DATE_OPTIONS)
    .replace(/^(\w)/, (match) => match.toUpperCase())
    .replace(' de', '');

  const updateMonthYear = (action: string) => () => {
    const { month, year } = monthYearFilter;

    const currentDate = new Date(year, month, 1); // Create a date object for the first day of the current month

    if (action === MONTH_YEAR_FILTER_ACTIONS.NEXT) {
      currentDate.setMonth(currentDate.getMonth() + 1); // Set the month to the next month
    } else if (action === MONTH_YEAR_FILTER_ACTIONS.PREVIOUS) {
      currentDate.setMonth(currentDate.getMonth() - 1); // Set the month to the previous month
    }

    const updatedMonth = currentDate.getMonth(); // Get the updated month (as a zero-based index)
    const updatedYear = currentDate.getFullYear(); // Get the updated year

    setMonthYearFilter({ month: updatedMonth, year: updatedYear });
  };

  const isNextButtonDisabled = () => {
    const { month, year } = monthYearFilter;
    const maxMonth = new Date().getMonth() + 1; // Maximum allowed month (actual month)
    const maxYear = new Date().getFullYear(); // Maximum allowed year (actual year)

    const currentDate = new Date(year, month, 1); // Create a date object for the first day of the current month
    currentDate.setMonth(currentDate.getMonth() + 1); // Set the month to the next month
    const nextMonth = currentDate.getMonth(); // Get the next month (as a zero-based index)
    const nextYear = currentDate.getFullYear(); // Get the year for the next month

    return nextYear > maxYear || (nextYear === maxYear && nextMonth >= maxMonth);
  };

  return (
    <PreviousNextFilter
      previousOnClick={updateMonthYear(MONTH_YEAR_FILTER_ACTIONS.PREVIOUS)}
      nextOnClick={updateMonthYear(MONTH_YEAR_FILTER_ACTIONS.NEXT)}
      resetOnClick={resetMonthYearFilter}
      text={todayMonthYear}
      disabled={isNextButtonDisabled()}
    />
  );
};

export default MonthYearFilter;
