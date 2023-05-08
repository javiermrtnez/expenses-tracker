import { Card, Icon, Metric, Tab, TabList, Text } from '@tremor/react';
import useExpenses from '../hooks/useExpenses';
import { useState } from 'react';
import ExpensesByDay from './ExpensesByDay';
import ExpensesByCategory from './ExpensesByCategory';
import { amountFormatter } from '../utils/functions/formatters';
import { CalendarDaysIcon, EyeIcon, EyeSlashIcon, TagIcon } from '@heroicons/react/20/solid';
import ExpensesSummarySkeleton from './skeletons/ExpensesSummarySkeleton';

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
  const [showAmount, setShowAmount] = useState(true);

  const handleTabListChange = (value: string) => {
    setSelectedView(value);
  };

  const toggleShowAmount = () => {
    setShowAmount((prevState) => !prevState);
  };

  return (
    <Card className='h-full'>
      {!loadingExpensesStore ? (
        <>
          <div className='flex justify-between'>
            <div>
              <Text>Gasto mensual</Text>

              <Metric>{showAmount ? amountFormatter(sumAmountExpenses) : '•••• €'}</Metric>
            </div>

            <button
              className='rounded hover:bg-gray-200 transition-colors h-full'
              onClick={toggleShowAmount}
            >
              <Icon icon={showAmount ? EyeSlashIcon : EyeIcon} color='gray' />
            </button>
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
