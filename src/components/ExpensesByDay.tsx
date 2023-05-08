import { AreaChart } from '@tremor/react';
import useExpenses from '../hooks/useExpenses';
import { amountFormatter, fromTimestampToFormattedDate } from '../utils/functions/formatters';

const ExpensesByDay = () => {
  const { monthExpensesByDay } = useExpenses();

  const expensesByDayFormatted = monthExpensesByDay.map((expense) => ({
    Cantidad: expense.amount,
    date: fromTimestampToFormattedDate(expense.date),
  }));

  return (
    <AreaChart
      className='mt-4 h-44'
      data={expensesByDayFormatted}
      categories={['Cantidad']}
      index='date'
      colors={['indigo']}
      valueFormatter={amountFormatter}
      showYAxis={false}
      showLegend={false}
    />
  );
};

export default ExpensesByDay;
