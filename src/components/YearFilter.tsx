import useFilters from '../hooks/useFilters';
import PreviousNextFilter from './PreviousNextFilter';

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
    <PreviousNextFilter
      previousOnClick={updateYear(YEAR_FILTER_ACTIONS.PREVIOUS)}
      nextOnClick={updateYear(YEAR_FILTER_ACTIONS.NEXT)}
      resetOnClick={resetYearFilter}
      text={yearFilter}
      disabled={isNextButtonDisabled}
    />
  );
};

export default YearFilter;
