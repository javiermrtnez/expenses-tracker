import { AreaChart, Toggle, ToggleItem } from '@tremor/react';
import { amountFormatter, percentageFormatter } from '../utils/functions/formatters';
import useIncomes from '../hooks/useIncomes';
import useExpenses from '../hooks/useExpenses';
import { MONTHS } from '../utils/constants/months';
import AnnualSummarySkeleton from './skeletons/AnnualSummarySkeleton';
import { useState } from 'react';
import { getSavingsPercentage } from '../utils/functions/transactions';
import { Color } from '@tremor/react';

interface TransactionsByMonth {
  Mes: string;
  Ingresos: number;
  Gastos: number;
}

interface SavingsByMonth {
  Mes: string;
  Ahorro: number;
}

interface ToggleOptions {
  value: string;
  text: string;
  data: TransactionsByMonth[] | SavingsByMonth[];
  categories: string[];
  colors: Color[];
  valueFormatter: (number: number) => string;
}

interface ToggleOptionsObject {
  [key: string]: ToggleOptions;
}

const AnnualSummaryChart = () => {
  const { yearIncomes, loadingIncomesStore } = useIncomes();
  const { yearExpenses, loadingExpensesStore } = useExpenses();

  const transactionsByMonth = yearIncomes.map((income, index) => ({
    Mes: MONTHS[income.month],
    Ingresos: income.amount,
    Gastos: yearExpenses[index].amount,
  }));

  const savingsByMonth = yearIncomes.map((income, index) => ({
    Mes: MONTHS[income.month],
    Ahorro: getSavingsPercentage(income.amount - yearExpenses[index].amount, income.amount),
  }));

  const TOGGLE_OPTIONS: ToggleOptionsObject = {
    INCOMES_EXPENSES: {
      value: 'INCOMES_EXPENSES',
      text: 'Por día',
      data: transactionsByMonth,
      categories: ['Ingresos', 'Gastos'],
      colors: ['indigo', 'fuchsia'],
      valueFormatter: amountFormatter,
    },
    SAVINGS: {
      value: 'SAVINGS',
      text: 'Por categoría',
      data: savingsByMonth,
      categories: ['Ahorro'],
      colors: ['amber'],
      valueFormatter: percentageFormatter,
    },
  };

  const [selectedOption, setSelectedOption] = useState(TOGGLE_OPTIONS.INCOMES_EXPENSES.value);

  return !loadingIncomesStore && !loadingExpensesStore ? (
    <div>
      <Toggle
        color='zinc'
        defaultValue={TOGGLE_OPTIONS.INCOMES_EXPENSES.value}
        onValueChange={setSelectedOption}
      >
        <ToggleItem value={TOGGLE_OPTIONS.INCOMES_EXPENSES.value} text='Ingresos/gastos' />
        <ToggleItem value={TOGGLE_OPTIONS.SAVINGS.value} text='Ahorro' />
      </Toggle>

      <AreaChart
        className='h-80'
        data={TOGGLE_OPTIONS[selectedOption].data}
        categories={TOGGLE_OPTIONS[selectedOption].categories}
        index='Mes'
        colors={TOGGLE_OPTIONS[selectedOption].colors}
        valueFormatter={TOGGLE_OPTIONS[selectedOption].valueFormatter}
      />
    </div>
  ) : (
    <AnnualSummarySkeleton />
  );
};

export default AnnualSummaryChart;
