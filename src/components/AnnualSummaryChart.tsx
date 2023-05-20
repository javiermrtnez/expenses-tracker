import { AreaChart } from '@tremor/react';
import { amountFormatter } from '../utils/functions/formatters';
import useIncomes from '../hooks/useIncomes';
import useExpenses from '../hooks/useExpenses';
import { MONTHS } from '../utils/constants/months';
import AnnualSummarySkeleton from './skeletons/AnnualSummarySkeleton';

const AnnualSummaryChart = () => {
  const { yearIncomes, loadingIncomesStore } = useIncomes();
  const { yearExpenses, loadingExpensesStore } = useExpenses();

  const transactionsByMonth = yearIncomes.map((income, index) => ({
    Mes: MONTHS[income.month],
    Ingresos: income.amount,
    Gastos: yearExpenses[index].amount,
  }));

  return !loadingIncomesStore && !loadingExpensesStore ? (
    <AreaChart
      className='h-80'
      data={transactionsByMonth}
      categories={['Ingresos', 'Gastos']}
      index='Mes'
      colors={['indigo', 'fuchsia']}
      valueFormatter={amountFormatter}
    />
  ) : (
    <AnnualSummarySkeleton />
  );
};

export default AnnualSummaryChart;
