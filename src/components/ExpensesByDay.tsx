import { AreaChart } from '@tremor/react';
import useExpenses from '../hooks/useExpenses';
import { amountFormatter } from '../utils/functions/formatters';

const ExpensesByDay = () => {
  const { expensesByDay } = useExpenses();

  return (
    <AreaChart
      className='mt-4 h-44'
      data={expensesByDay}
      categories={['amount']}
      index='date'
      colors={['indigo']}
      valueFormatter={amountFormatter}
      showYAxis={false}
      showLegend={false}
    />
  );
};

export default ExpensesByDay;
