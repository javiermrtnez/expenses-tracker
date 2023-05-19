import { List, ListItem, ProgressBar, Text } from '@tremor/react';
import { amountFormatter } from '../utils/functions/formatters';
import { TransactionCategoryAmount } from '../utils/interfaces/transaction.interface';

interface Props {
  monthTransactionsByCategory: TransactionCategoryAmount[];
  monthTransactionsTotalAmount: number;
  categories: Record<string, string>;
}

const TransactionsByCategory = ({
  monthTransactionsByCategory,
  monthTransactionsTotalAmount,
  categories,
}: Props) => {
  const getPercentageValue = (amount: number) => {
    return Math.round((amount / monthTransactionsTotalAmount) * 100);
  };

  return (
    <List className='mt-4'>
      {monthTransactionsByCategory.map((transaction) => (
        <ListItem key={transaction.category}>
          <div className='w-full'>
            <Text>{categories[transaction.category]}</Text>
            <ProgressBar
              percentageValue={getPercentageValue(transaction.amount)}
              label={`${getPercentageValue(transaction.amount)}%`}
              tooltip={amountFormatter(transaction.amount)}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default TransactionsByCategory;
