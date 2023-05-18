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
import { es } from 'date-fns/locale';
import useExpenses from '../../hooks/useExpenses';
import useModal from '../../hooks/useModal';
import { EXPENSES_CATEGORIES, INCOMES_CATEGORIES } from '../../utils/constants/categories';
import { convertDateToTimestampWithoutTime } from '../../utils/functions/converters';
import useIncomes from '../../hooks/useIncomes';
import { TRANSACTIONS } from '../../utils/constants/transactions';

interface TransactionFormData {
  date: DateRangePickerValue;
  description: string;
  amount: number;
  category: string;
}

const TRANSACTION_DEFAULT_STATE: TransactionFormData = {
  date: [new Date(), new Date()],
  description: '',
  amount: 0,
  category: '',
};

interface Props {
  transactionType: string;
}

const AddTransactionModal = ({ transactionType }: Props) => {
  const { createExpense } = useExpenses();
  const { createIncome } = useIncomes();
  const { closeModal } = useModal();
  const [transactionFormData, setTransactionFormData] =
    useState<TransactionFormData>(TRANSACTION_DEFAULT_STATE);

  const isExpense = transactionType === TRANSACTIONS.EXPENSE;

  const handleDateChange = (value: DateRangePickerValue) => {
    setTransactionFormData({ ...transactionFormData, date: value });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionFormData({ ...transactionFormData, description: String(event.target.value) });
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionFormData({ ...transactionFormData, amount: event.target.valueAsNumber });
  };

  const handleCategoryChange = (value: string) => {
    setTransactionFormData({ ...transactionFormData, category: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const transaction = {
      date: convertDateToTimestampWithoutTime(transactionFormData.date[0]),
      description: transactionFormData.description,
      amount: transactionFormData.amount,
      category: transactionFormData.category,
    };

    isExpense ? createExpense(transaction) : createIncome(transaction);

    closeModal();
  };

  return (
    <form className='flex flex-col gap-7' onSubmit={handleFormSubmit}>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-1 w-full'>
          <Bold>Fecha</Bold>
          <DateRangePicker
            value={transactionFormData.date}
            onValueChange={handleDateChange}
            locale={es}
            enableDropdown={false}
            maxDate={new Date()}
          />
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <Bold>Descripción</Bold>
          <TextInput
            placeholder={isExpense ? 'Hamburguesa Five Guys' : 'Nómina'}
            value={transactionFormData.description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className='flex gap-2 w-full'>
          <div className='flex flex-col gap-1 w-1/2'>
            <Bold>Importe</Bold>
            <TextInput
              type='number'
              value={transactionFormData.amount}
              onChange={handleAmountChange}
            />
          </div>

          <div className='flex flex-col gap-1 w-1/2'>
            <Bold>Categoría</Bold>
            <Dropdown
              placeholder='Seleccionar...'
              value={transactionFormData.category}
              onValueChange={handleCategoryChange}
            >
              {Object.entries(isExpense ? EXPENSES_CATEGORIES : INCOMES_CATEGORIES).map(
                ([value, text]) => (
                  <DropdownItem key={value} value={value} text={text} />
                )
              )}
            </Dropdown>
          </div>
        </div>
      </div>

      <Button
        className='w-full'
        color='gray'
        disabled={
          !transactionFormData.amount ||
          !transactionFormData.category ||
          !transactionFormData.description
        }
      >
        Añadir
      </Button>
    </form>
  );
};

export default AddTransactionModal;
