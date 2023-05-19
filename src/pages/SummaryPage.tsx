import { Card, Title, Text, Grid } from '@tremor/react';
import TransactionMetricCard from '../components/TransactionMetricCard';
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import { getMonthTransactionsTotalAmount } from '../utils/functions/transactions';
import useIncomes from '../hooks/useIncomes';
import useExpenses from '../hooks/useExpenses';
import { amountFormatter } from '../utils/functions/formatters';
import MonthYearFilter from '../components/MonthYearFilter';

const SummaryPage = () => {
  const { monthIncomes } = useIncomes();
  const { monthExpenses } = useExpenses();

  const monthIncomesTotalAmount = getMonthTransactionsTotalAmount(monthIncomes);
  const monthExpensesTotalAmount = getMonthTransactionsTotalAmount(monthExpenses);

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <div className='flex justify-between items-center'>
          <div>
            <Title>Resumen mensual</Title>
            <Text>Suma total de ingresos y gastos mensuales</Text>
          </div>

          <MonthYearFilter />
        </div>

        <Grid numColsMd={2} className='mt-6 gap-6'>
          <TransactionMetricCard
            title='Ingresos'
            icon={BanknotesIcon}
            color='emerald'
            value={amountFormatter(monthIncomesTotalAmount)}
          />
          <TransactionMetricCard
            title='Gastos'
            icon={CreditCardIcon}
            color='red'
            value={amountFormatter(monthExpensesTotalAmount)}
          />
        </Grid>
      </div>

      <div>
        <Title>Resumen anual</Title>
        <Text>Gráfico de gastos e ingresos anuales</Text>

        <Card className='mt-6'>
          <div className='h-96' />
        </Card>
      </div>
    </div>
  );
};

export default SummaryPage;
