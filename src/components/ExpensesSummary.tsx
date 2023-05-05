import { Bold, Button, Card, Metric, Tab, TabList, Text, Title } from '@tremor/react';
import useExpenses from '../hooks/useExpenses';
import { useState } from 'react';
import ExpensesByDay from './ExpensesByDay';
import ExpensesByCategory from './ExpensesByCategory';
import { amountFormatter } from '../utils/functions/formatters';
import { CalendarDaysIcon, TagIcon } from '@heroicons/react/20/solid';
import ExpensesSummarySkeleton from './skeletons/ExpensesSummarySkeleton';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const TABS_LIST = {
  BY_DAY: {
    value: 'BY_DAY',
    text: 'Por día',
    icon: CalendarDaysIcon,
  },
  BY_CATEGORY: {
    value: 'BY_CATEGORY',
    text: 'Por categoría',
    icon: TagIcon,
  },
};

const ExpensesSummary = () => {
  const { loadingExpensesStore, sumAmountExpenses } = useExpenses();
  const [selectedView, setSelectedView] = useState(TABS_LIST.BY_DAY.value);

  const handleTabListChange = (value: string) => {
    setSelectedView(value);
  };

  //   const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  //     month: 'long',
  //     year: 'numeric',
  //   };

  //   const todayMonthYear = new Date()
  //     .toLocaleDateString('es-ES', DATE_OPTIONS)
  //     .replace(/^(\w)/, (match) => match.toUpperCase())
  //     .replace(' de', '');

  return (
    <Card className='h-full'>
      {!loadingExpensesStore ? (
        <>
          <div className='flex justify-between'>
            <div>
              <Text>Gasto mensual</Text>

              <Metric>{amountFormatter(sumAmountExpenses(2023, 4))}</Metric>
            </div>

            {/* <div className='flex gap-1 items-center'>
              <Button
                color='gray'
                size='xs'
                className='[&>svg]:m-0'
                variant='light'
                icon={ChevronLeftIcon}
                onClick={() => {}}
              />

              <Bold className='leading-none'>{todayMonthYear}</Bold>

              <Button
                color='gray'
                size='xs'
                className='[&>svg]:m-0'
                variant='light'
                icon={ChevronRightIcon}
                onClick={() => {}}
              />
            </div> */}
          </div>

          <TabList
            defaultValue={TABS_LIST.BY_DAY.value}
            onValueChange={handleTabListChange}
            className='mt-3'
          >
            <Tab
              value={TABS_LIST.BY_DAY.value}
              icon={TABS_LIST.BY_DAY.icon}
              text={TABS_LIST.BY_DAY.text}
            />
            <Tab
              value={TABS_LIST.BY_CATEGORY.value}
              icon={TABS_LIST.BY_CATEGORY.icon}
              text={TABS_LIST.BY_CATEGORY.text}
            />
          </TabList>

          {selectedView === TABS_LIST.BY_DAY.value && <ExpensesByDay />}
          {selectedView === TABS_LIST.BY_CATEGORY.value && <ExpensesByCategory />}
        </>
      ) : (
        <ExpensesSummarySkeleton />
      )}
    </Card>
  );
};

export default ExpensesSummary;
