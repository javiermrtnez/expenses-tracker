import { Card, Title, Text, Grid, Color } from '@tremor/react';
import TransactionMetricCard from '../components/TransactionMetricCard';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { getMonthTransactionsTotalAmount } from '../utils/functions/monthTransactions';
import useIncomes from '../hooks/useIncomes';
import useExpenses from '../hooks/useExpenses';
import { amountFormatter } from '../utils/functions/formatters';
import MonthYearFilter from '../components/MonthYearFilter';
import AnnualSummaryChart from '../components/AnnualSummaryChart';
import YearFilter from '../components/YearFilter';
import { CurrencyEuroIcon } from '@heroicons/react/20/solid';
import { getSavingsPercentage } from '../utils/functions/transactions';

interface TransactionsMetricCard {
  title: string;
  icon: React.ElementType;
  color: Color;
  value: string;
  loading: boolean;
  percentage?: number;
}

const DashboardPage = () => {
  const { monthIncomes, loadingIncomesStore } = useIncomes();
  const { monthExpenses, loadingExpensesStore } = useExpenses();

  const monthIncomesTotalAmount = getMonthTransactionsTotalAmount(monthIncomes);
  const monthExpensesTotalAmount = getMonthTransactionsTotalAmount(monthExpenses);
  const monthSavingsTotalAmount = monthIncomesTotalAmount - monthExpensesTotalAmount;

  const transactionsMetricCards: TransactionsMetricCard[] = [
    {
      title: 'Ingresos',
      icon: BanknotesIcon,
      color: 'indigo',
      value: amountFormatter(monthIncomesTotalAmount),
      loading: loadingIncomesStore,
    },
    {
      title: 'Gastos',
      icon: CreditCardIcon,
      color: 'fuchsia',
      value: amountFormatter(monthExpensesTotalAmount),
      loading: loadingExpensesStore,
    },
    {
      title: 'Ahorro',
      icon: CurrencyEuroIcon,
      color: 'amber',
      value: amountFormatter(monthSavingsTotalAmount),
      loading: loadingIncomesStore || loadingExpensesStore,
      percentage: getSavingsPercentage(monthSavingsTotalAmount, monthIncomesTotalAmount),
    },
  ];

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <div className='flex flex-col gap-6 justify-between sm:flex-row sm:items-center'>
          <div>
            <Title>Resumen mensual</Title>
            <Text>Suma total de ingresos y gastos mensuales</Text>
          </div>

          <MonthYearFilter />
        </div>

        <Grid numColsSm={2} numColsLg={3} className='mt-6 gap-6'>
          {transactionsMetricCards.map(({ title, icon, color, value, loading, percentage }) => (
            <TransactionMetricCard
              title={title}
              icon={icon}
              color={color}
              value={value}
              loading={loading}
              percentage={percentage}
            />
          ))}
        </Grid>
      </div>

      <div>
        <div className='flex flex-col gap-6 justify-between sm:flex-row sm:items-center'>
          <div>
            <Title>Resumen anual</Title>
            <Text>Gráfico de gastos e ingresos anuales</Text>
          </div>

          <YearFilter />
        </div>

        <Card className='mt-6'>
          <AnnualSummaryChart />
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
