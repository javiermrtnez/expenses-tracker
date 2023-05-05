import { Button, Grid } from '@tremor/react';
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
} from '@tremor/react';
import useExpenses from '../hooks/useExpenses';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import { Col } from '@tremor/react';
import { EXPENSES_CATEGORIES } from '../utils/constants/expensesCategories';
import AddExpenseCard from '../components/AddExpenseCard';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ExpensesSummary from '../components/ExpensesSummary';
import { amountFormatter } from '../utils/functions/formatters';

const ExpensesPage = () => {
  const { loadingExpensesStore, expenses, deleteExpense } = useExpenses();

  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return (
    <div className='flex flex-col gap-6'>
      <Grid numColsLg={5} className='gap-6'>
        <Col numColSpanLg={2}>
          <AddExpenseCard />
        </Col>

        <Col numColSpanLg={3}>
          <ExpensesSummary />
        </Col>
      </Grid>

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
    </div>
  );
};

export default ExpensesPage;
