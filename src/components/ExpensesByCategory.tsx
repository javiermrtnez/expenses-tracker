import { List, ListItem, ProgressBar, Text } from '@tremor/react';

const locationC = [
  {
    name: 'Product A',
    share: 45,
    amount: '$ 27,955',
  },
  {
    name: 'Product D',
    share: 35,
    amount: '$ 21,743',
  },
  {
    name: 'Product C',
    share: 75,
    amount: '$ 46,592',
  },
  {
    name: 'Product B',
    share: 68,
    amount: '$ 42,243',
  },
  {
    name: 'Product E',
    share: 56,
    amount: '$ 34,788',
  },
];

const ExpensesByCategory = () => {
  return (
    <List className='mt-4'>
      {locationC.map((product) => (
        <ListItem key={product.name}>
          <div className='w-full'>
            <Text>{product.name}</Text>
            <ProgressBar
              percentageValue={product.share}
              label={`${product.share}%`}
              tooltip={product.amount}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default ExpensesByCategory;
