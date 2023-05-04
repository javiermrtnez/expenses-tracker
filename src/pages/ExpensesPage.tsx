import {
  Bold,
  Button,
  DateRangePicker,
  DateRangePickerValue,
  Dropdown,
  DropdownItem,
} from '@tremor/react';
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
  TextInput,
} from '@tremor/react';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import useExpenses from '../hooks/useExpenses';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface ExpenseFormData {
  date: DateRangePickerValue;
  description: string;
  amount: number;
  category: string;
}

const EXPENSES_DEFAULT_STATE: ExpenseFormData = {
  date: [new Date(), new Date()],
  description: '',
  amount: 0,
  category: '',
};

const ExpensesPage = () => {
  const { loadingExpensesStore, expenses, createExpense, deleteExpense } = useExpenses();
  console.log('expenses', expenses);
  const [expenseFormData, setExpenseFormData] = useState<ExpenseFormData>(EXPENSES_DEFAULT_STATE);

  const handleDateChange = (value: DateRangePickerValue) => {
    setExpenseFormData({ ...expenseFormData, date: value });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseFormData({ ...expenseFormData, description: String(event.target.value) });
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseFormData({ ...expenseFormData, amount: event.target.valueAsNumber });
  };

  const handleCategoryChange = (value: string) => {
    setExpenseFormData({ ...expenseFormData, category: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const date = expenseFormData.date[0];
    const day = date?.getDate();
    const month = date?.getMonth();
    const year = date?.getFullYear();

    createExpense(
      Timestamp.fromDate(new Date(year, month, day)),
      expenseFormData.description,
      expenseFormData.amount,
      expenseFormData.category
    );

    setExpenseFormData(EXPENSES_DEFAULT_STATE);
  };

  const EXPENSES_CATEGORIES = {
    lunch: 'Almuerzo',
    snack: 'Merienda',
    dinner: 'Cena',
    gasoline: 'Gasolina',
    leisure: 'Ocio',
    personalExpenses: 'Gastos personales',
    travel: 'Viajes',
  };

  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return (
    <div className='flex flex-col gap-6'>
      <Card className='flex flex-col gap-3'>
        <Title>Añadir gasto</Title>

        <form className='flex gap-2 flex-wrap' onSubmit={handleFormSubmit}>
          <div className='flex flex-col gap-1 flex-1'>
            <Bold>Fecha</Bold>
            <DateRangePicker
              value={expenseFormData.date}
              onValueChange={handleDateChange}
              locale={es}
              enableDropdown={false}
            />
          </div>

          <div className='flex flex-col gap-1 flex-1 basis-2/5'>
            <Bold>Descripción</Bold>
            <TextInput
              placeholder='Hamburguesa Five Guys'
              value={expenseFormData.description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className='flex flex-col gap-1 flex-1'>
            <Bold>Importe</Bold>
            <TextInput type='number' value={expenseFormData.amount} onChange={handleAmountChange} />
          </div>

          <div className='flex flex-col gap-1 flex-1'>
            <Bold>Categoría</Bold>
            <Dropdown
              placeholder='Seleccionar...'
              value={expenseFormData.category}
              onValueChange={handleCategoryChange}
            >
              {Object.entries(EXPENSES_CATEGORIES).map(([value, text]) => (
                <DropdownItem key={value} value={value} text={text} />
              ))}
            </Dropdown>
          </div>

          <Button
            className='h-full mt-auto flex-1'
            color='gray'
            disabled={
              !expenseFormData.amount || !expenseFormData.category || !expenseFormData.description
            }
          >
            Añadir
          </Button>
        </form>
      </Card>

      <Card>
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
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!loadingExpensesStore ? (
              expenses.map(({ id, date, amount, description, category }) => (
                <TableRow key={id}>
                  <TableCell>{date.toDate().toLocaleString('es', DATE_OPTIONS)}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{amount} €</TableCell>
                  <TableCell>
                    <Badge color='gray' size='xl'>
                      {EXPENSES_CATEGORIES[category]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size='xs'
                      color='gray'
                      className='[&>svg]:m-0'
                      icon={XCircleIcon}
                      onClick={() => deleteExpense(id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableSkeleton rows={10} columns={4} />
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ExpensesPage;
