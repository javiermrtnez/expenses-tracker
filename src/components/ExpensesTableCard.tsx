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
import { amountFormatter } from '../utils/functions/formatters';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { EXPENSES_CATEGORIES } from '../utils/constants/expensesCategories';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import useExpenses from '../hooks/useExpenses';

const ExpensesTableCard = () => {
  const { loadingExpensesStore, monthYearFilter, getMonthExpenses, deleteExpense } = useExpenses();

  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const expenses = getMonthExpenses(monthYearFilter.month, monthYearFilter.year);

  return (
    <Card>
      {!loadingExpensesStore ? (
        <>
          <Flex justifyContent='start' className='space-x-2'>
            <Title>Gastos</Title>
            <Badge size='md' color='gray'>
              {expenses.length}
            </Badge>
          </Flex>

          <Text className='mt-2'>Resumen de los gastos de este mes</Text>

          <Table className='mt-6'>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Fecha</TableHeaderCell>
                <TableHeaderCell>Descripción</TableHeaderCell>
                <TableHeaderCell>Cantidad</TableHeaderCell>
                <TableHeaderCell>Categoría</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {expenses.map(({ id, date, amount, description, category }) => (
                <TableRow key={id}>
                  <TableCell>{date.toDate().toLocaleString('es', DATE_OPTIONS)}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{amountFormatter(amount)}</TableCell>
                  <TableCell>
                    <Badge color='gray'>{EXPENSES_CATEGORIES[category]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      color='gray'
                      className='[&>svg]:m-0'
                      variant='light'
                      icon={XMarkIcon}
                      onClick={() => deleteExpense(id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <TableSkeleton rows={10} />
      )}
    </Card>
  );
};

export default ExpensesTableCard;
