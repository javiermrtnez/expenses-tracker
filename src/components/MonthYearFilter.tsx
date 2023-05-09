import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import useExpenses from '../hooks/useExpenses';
import { useMemo } from 'react';
import { Icon, Title } from '@tremor/react';

const MONTH_YEAR_FILTER_ACTIONS = {
  PREVIOUS: 'previous',
  NEXT: 'next',
};

const MonthYearFilter = () => {
  const { monthYearFilter, setMonthYearFilter, resetMonthYearFilter } = useExpenses();

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

  const resetMonthYear = () => {
    resetMonthYearFilter();
  };

  const isNextButtonDisabled = useMemo(() => {
    const { month, year } = monthYearFilter;
    const maxMonth = new Date().getMonth() + 1; // Maximum allowed month (actual month)
    const maxYear = new Date().getFullYear(); // Maximum allowed year (actual year)

    const currentDate = new Date(year, month, 1); // Create a date object for the first day of the current month
    currentDate.setMonth(currentDate.getMonth() + 1); // Set the month to the next month
    const nextMonth = currentDate.getMonth(); // Get the next month (as a zero-based index)
    const nextYear = currentDate.getFullYear(); // Get the year for the next month

    return nextYear > maxYear || (nextYear === maxYear && nextMonth >= maxMonth);
  }, [monthYearFilter]);

  return (
    <div className='flex gap-1 items-center justify-center'>
      <button
        className='rounded hover:bg-gray-200 transition-colors'
        onClick={updateMonthYear(MONTH_YEAR_FILTER_ACTIONS.PREVIOUS)}
      >
        <Icon icon={ChevronLeftIcon} color='gray' />
      </button>

      <Title
        className='leading-none cursor-pointer w-36 flex justify-center'
        onClick={resetMonthYear}
      >
        {todayMonthYear}
      </Title>

      <button
        className={!isNextButtonDisabled ? 'rounded hover:bg-gray-200 transition-colors' : ''}
        onClick={updateMonthYear(MONTH_YEAR_FILTER_ACTIONS.NEXT)}
        disabled={isNextButtonDisabled}
      >
        <Icon
          icon={ChevronRightIcon}
          color='gray'
          className={isNextButtonDisabled ? 'text-gray-300' : ''}
        />
      </button>
    </div>
  );
};

export default MonthYearFilter;
