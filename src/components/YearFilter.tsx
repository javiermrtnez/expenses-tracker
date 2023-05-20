import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Icon, Title } from '@tremor/react';
import useFilters from '../hooks/useFilters';

const YEAR_FILTER_ACTIONS = {
  PREVIOUS: 'previous',
  NEXT: 'next',
};

const YearFilter = () => {
  const { yearFilter, setYearFilter, resetYearFilter } = useFilters();

  const updateYear = (action: string) => () => {
    let updatedYearFilter = yearFilter;

    if (action === YEAR_FILTER_ACTIONS.NEXT) {
      updatedYearFilter += 1;
    } else if (action === YEAR_FILTER_ACTIONS.PREVIOUS) {
      updatedYearFilter -= 1;
    }

    setYearFilter(updatedYearFilter);
  };

  const isNextButtonDisabled = yearFilter + 1 > new Date().getFullYear();

  return (
    <div className='flex gap-1 items-center justify-center'>
      <button
        className='rounded hover:bg-gray-200 transition-colors'
        onClick={updateYear(YEAR_FILTER_ACTIONS.PREVIOUS)}
      >
        <Icon icon={ChevronLeftIcon} color='gray' />
      </button>

      <Title
        className='h-full min-h-[32px] leading-none cursor-pointer w-36 flex justify-center items-center rounded hover:bg-gray-200 transition-colors'
        onClick={resetYearFilter}
      >
        {yearFilter}
      </Title>

      <button
        className={!isNextButtonDisabled ? 'rounded hover:bg-gray-200 transition-colors' : ''}
        onClick={updateYear(YEAR_FILTER_ACTIONS.NEXT)}
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

export default YearFilter;
