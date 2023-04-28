import {
  Card,
  Text,
  Title,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
} from '@tremor/react';

const EXPENSES = [
  {
    id: 1,
    date: '01/10/2022',
    amount: 47.5,
    description: 'Dinner at Pósito + Oktoberfest beer',
    category: 'Dinner',
  },
  {
    id: 2,
    date: '03/10/2022',
    amount: 150.0,
    description: 'Investment fund',
    category: 'Investment fund',
  },
  {
    id: 3,
    date: '03/10/2022',
    amount: 7.55,
    description: 'Kebab',
    category: 'Dinner',
  },
  {
    id: 4,
    date: '04/10/2022',
    amount: 87.6,
    description: 'Dinner at Quinto Toro for birthday celebration',
    category: 'Dinner',
  },
  {
    id: 5,
    date: '07/10/2022',
    amount: 0.75,
    description: 'Parking at Corte Inglés',
    category: 'Parking',
  },
  {
    id: 6,
    date: '07/10/2022',
    amount: 86.2,
    description: 'Ukiyo surprise for Beatricita',
    category: 'Dinner',
  },
  {
    id: 7,
    date: '08/10/2022',
    amount: 72.91,
    description: 'First weekend of fair',
    category: 'Leisure',
  },
  {
    id: 8,
    date: '10/10/2022',
    amount: 40.0,
    description: 'Anniversary flowers',
    category: 'Personal expenses',
  },
  {
    id: 9,
    date: '11/10/2022',
    amount: 21.6,
    description: "Bea's mascara",
    category: 'Personal expenses',
  },
  {
    id: 10,
    date: '11/10/2022',
    amount: 11.0,
    description: 'Hairdresser',
    category: 'Personal expenses',
  },
  {
    id: 11,
    date: '12/10/2022',
    amount: 8.45,
    description: 'Razor blade from Wallapop',
    category: 'Personal expenses',
  },
  {
    id: 12,
    date: '12/10/2022',
    amount: 7.19,
    description: 'Burger King dinner',
    category: 'Dinner',
  },
];

const ExpensesPage = () => {
  return (
    <Card>
      <Flex justifyContent='start' className='space-x-2'>
        <Title>Expenses</Title>
        <Badge size='md' color='gray'>
          {EXPENSES.length}
        </Badge>
      </Flex>
      <Text className='mt-2'>Overview of this month's purchases</Text>

      <Table className='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Link</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {EXPENSES.map(({ id, date, amount, description, category }) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{amount} €</TableCell>
              <TableCell>{description}</TableCell>
              <TableCell>
                <Badge color='gray' size='xl'>
                  {category}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant='secondary' color='gray'>
                  See details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ExpensesPage;
