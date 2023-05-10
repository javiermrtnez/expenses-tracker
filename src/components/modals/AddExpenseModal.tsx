import {
  Bold,
  Button,
  DateRangePicker,
  DateRangePickerValue,
  Dropdown,
  DropdownItem,
  TextInput,
} from '@tremor/react';
import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { es } from 'date-fns/locale';
import useExpenses from '../../hooks/useExpenses';
import useModal from '../../hooks/useModal';
import { EXPENSES_CATEGORIES } from '../../utils/constants/expensesCategories';

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

const AddExpenseModal = () => {
  const { createExpense } = useExpenses();
  const { closeModal } = useModal();
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

    closeModal();
  };

  return (
    <form className='flex flex-col gap-7' onSubmit={handleFormSubmit}>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-1 w-full'>
          <Bold>Fecha</Bold>
          <DateRangePicker
            value={expenseFormData.date}
            onValueChange={handleDateChange}
            locale={es}
            enableDropdown={false}
            maxDate={new Date()}
          />
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <Bold>Descripción</Bold>
          <TextInput
            placeholder='Hamburguesa Five Guys'
            value={expenseFormData.description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className='flex gap-2 w-full'>
          <div className='flex flex-col gap-1 w-1/2'>
            <Bold>Importe</Bold>
            <TextInput type='number' value={expenseFormData.amount} onChange={handleAmountChange} />
          </div>

          <div className='flex flex-col gap-1 w-1/2'>
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
        </div>
      </div>

      <Button
        className='w-full'
        color='gray'
        disabled={
          !expenseFormData.amount || !expenseFormData.category || !expenseFormData.description
        }
      >
        Añadir
      </Button>
    </form>
  );
};

export default AddExpenseModal;
