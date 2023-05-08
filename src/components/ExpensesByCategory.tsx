import { List, ListItem, ProgressBar, Text } from '@tremor/react';

const locationC = [
  {
    category: 'Product A',
    percentage: 45,
    amount: '$ 27,955',
  },
  {
    category: 'Product D',
    percentage: 35,
    amount: '$ 21,743',
  },
  {
    category: 'Product C',
    percentage: 75,
    amount: '$ 46,592',
  },
  {
    category: 'Product B',
    percentage: 68,
    amount: '$ 42,243',
  },
  {
    category: 'Product E',
    percentage: 56,
    amount: '$ 34,788',
  },
];

const ExpensesByCategory = () => {
  return (
    <List className='mt-4'>
      {locationC.map((product) => (
        <ListItem key={product.category}>
          <div className='w-full'>
            <Text>{product.category}</Text>
            <ProgressBar
              percentageValue={product.percentage}
              label={`${product.percentage}%`}
              tooltip={product.amount}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default ExpensesByCategory;
