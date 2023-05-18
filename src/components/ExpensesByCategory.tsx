import { List, ListItem, ProgressBar, Text } from '@tremor/react';
import useExpenses from '../hooks/useExpenses';
import { EXPENSES_CATEGORIES } from '../utils/constants/categories';
import { amountFormatter } from '../utils/functions/formatters';

const ExpensesByCategory = () => {
  const { monthExpensesByCategory, monthExpensesTotalAmount } = useExpenses();

  const getPercentageValue = (amount: number) => {
    return Math.round((amount / monthExpensesTotalAmount) * 100);
  };

  return (
    <List className='mt-4'>
      {monthExpensesByCategory.map((expense) => (
        <ListItem key={expense.category}>
          <div className='w-full'>
            <Text>{EXPENSES_CATEGORIES[expense.category]}</Text>
            <ProgressBar
              percentageValue={getPercentageValue(expense.amount)}
              label={`${getPercentageValue(expense.amount)}%`}
              tooltip={amountFormatter(expense.amount)}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default ExpensesByCategory;
