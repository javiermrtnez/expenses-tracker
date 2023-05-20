import { AreaChart } from '@tremor/react';
import { amountFormatter } from '../utils/functions/formatters';
import useIncomes from '../hooks/useIncomes';
import useExpenses from '../hooks/useExpenses';
import { MONTHS } from '../utils/constants/months';

const AnnualSummaryChart = () => {
  const { yearIncomes } = useIncomes();
  const { yearExpenses } = useExpenses();

  const transactionsByMonth = yearIncomes.map((income, index) => ({
    Mes: MONTHS[income.month],
    Ingresos: income.amount,
    Gastos: yearExpenses[index].amount,
  }));

  return (
    <AreaChart
      className='mt-4 h-80'
      data={transactionsByMonth}
      categories={['Ingresos', 'Gastos']}
      index='Mes'
      colors={['indigo', 'fuchsia']}
      valueFormatter={amountFormatter}
    />
  );
};

export default AnnualSummaryChart;
