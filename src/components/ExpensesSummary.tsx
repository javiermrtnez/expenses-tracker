import { Card, Metric, Tab, TabList, Text } from '@tremor/react';
import useExpenses from '../hooks/useExpenses';
import { useState } from 'react';
import ExpensesByDay from './ExpensesByDay';
import ExpensesByCategory from './ExpensesByCategory';
import { amountFormatter } from '../utils/functions/formatters';

const TABS_LIST = {
  BY_DAY: {
    value: 'BY_DAY',
    text: 'Por día',
  },
  BY_CATEGORY: {
    value: 'BY_CATEGORY',
    text: 'Por categoría',
  },
};

const ExpensesSummary = () => {
  const { sumAmountExpenses } = useExpenses();
  const [selectedView, setSelectedView] = useState(TABS_LIST.BY_DAY.value);

  const handleTabListChange = (value: string) => {
    setSelectedView(value);
  };

  return (
    <Card className='h-full'>
      <Text>Gasto mensual</Text>

      <Metric>{amountFormatter(sumAmountExpenses)}</Metric>

      <TabList
        defaultValue={TABS_LIST.BY_DAY.value}
        onValueChange={handleTabListChange}
        className='mt-3'
      >
        <Tab value={TABS_LIST.BY_DAY.value} text={TABS_LIST.BY_DAY.text} />
        <Tab value={TABS_LIST.BY_CATEGORY.value} text={TABS_LIST.BY_CATEGORY.text} />
      </TabList>

      {selectedView === TABS_LIST.BY_DAY.value && <ExpensesByDay />}
      {selectedView === TABS_LIST.BY_CATEGORY.value && <ExpensesByCategory />}
    </Card>
  );
};

export default ExpensesSummary;
