import { AreaChart } from '@tremor/react';
import { amountFormatter, fromTimestampToFormattedDate } from '../utils/functions/formatters';
import { TransactionDateAmount } from '../utils/interfaces/transaction.interface';

interface Props {
  monthTransactionsByDay: TransactionDateAmount[];
}

const TransactionsByDay = ({ monthTransactionsByDay }: Props) => {
  const transactionsByDayFormatted = monthTransactionsByDay.map((transaction) => ({
    Cantidad: transaction.amount,
    date: fromTimestampToFormattedDate(transaction.date),
  }));

  return (
    <AreaChart
      className='mt-4 h-44'
      data={transactionsByDayFormatted}
      categories={['Cantidad']}
      index='date'
      colors={['blue']}
      valueFormatter={amountFormatter}
      showYAxis
      yAxisWidth={40}
      showLegend={false}
    />
  );
};

export default TransactionsByDay;
