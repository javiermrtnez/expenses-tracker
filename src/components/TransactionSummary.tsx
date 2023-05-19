import { Card, Metric, Tab, TabList, Text } from '@tremor/react';
import ToggleShowAmountButton from './ToggleShowAmountButton';
import { CalendarDaysIcon, TagIcon } from '@heroicons/react/20/solid';
import { amountFormatter } from '../utils/functions/formatters';
import { useState } from 'react';
import TransactionSummarySkeleton from './skeletons/ExpensesSummarySkeleton';
import TransactionsByDay from './TransactionsByDay';
import TransactionsByCategory from './TransactionsByCategory';
import {
  getMonthTransactionsByCategory,
  getMonthTransactionsByDay,
  getMonthTransactionsTotalAmount,
} from '../utils/functions/transactions';
import useFilters from '../hooks/useFilters';
import { Transaction } from '../utils/interfaces/transaction.interface';

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

interface Props {
  loadingStore: boolean;
  monthTransactions: Transaction[];
  categories: Record<string, string>;
}

const TransactionSummary = ({ loadingStore, monthTransactions, categories }: Props) => {
  const { monthYearFilter } = useFilters();
  const [selectedView, setSelectedView] = useState(TABS_LIST.BY_DAY.value);
  const [showAmount, setShowAmount] = useState(true);

  const handleTabListChange = (value: string) => {
    setSelectedView(value);
  };

  const monthTransactionsTotalAmount = getMonthTransactionsTotalAmount(monthTransactions);
  const monthTransactionsByDay = getMonthTransactionsByDay(monthTransactions, monthYearFilter);
  const monthTransactionsByCategory = getMonthTransactionsByCategory(monthTransactions);

  return (
    <Card className='h-full'>
      {!loadingStore ? (
        <>
          <div className='flex justify-between'>
            <div>
              <Text>Gasto mensual</Text>

              <Metric>
                {showAmount ? amountFormatter(monthTransactionsTotalAmount) : '•••• €'}
              </Metric>
            </div>

            <ToggleShowAmountButton showAmount={showAmount} setShowAmount={setShowAmount} />
          </div>

          <TabList
            defaultValue={TABS_LIST.BY_DAY.value}
            onValueChange={handleTabListChange}
            className='mt-3'
          >
            {Object.values(TABS_LIST).map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} text={tab.text} />
            ))}
          </TabList>

          {selectedView === TABS_LIST.BY_DAY.value && (
            <TransactionsByDay monthTransactionsByDay={monthTransactionsByDay} />
          )}
          {selectedView === TABS_LIST.BY_CATEGORY.value && (
            <TransactionsByCategory
              monthTransactionsByCategory={monthTransactionsByCategory}
              monthTransactionsTotalAmount={monthTransactionsTotalAmount}
              categories={categories}
            />
          )}
        </>
      ) : (
        <TransactionSummarySkeleton />
      )}
    </Card>
  );
};

export default TransactionSummary;
