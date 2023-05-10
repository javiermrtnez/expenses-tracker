import { Button } from '@tremor/react';
import ExpensesSummary from '../components/ExpensesSummary';
import ExpensesTableCard from '../components/ExpensesTableCard';
import MonthYearFilter from '../components/MonthYearFilter';
import useModal from '../hooks/useModal';
import { MODAL_CODES } from '../utils/constants/modalCodes';
import { PlusIcon } from '@heroicons/react/24/solid';

const ExpensesPage = () => {
  const { showModal } = useModal();

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-6 justify-center flex-wrap sm:justify-between'>
        <MonthYearFilter />

        <Button
          className='w-full sm:w-fit transition-colors'
          size='xs'
          color='slate'
          icon={PlusIcon}
          onClick={() => showModal(MODAL_CODES.ADD_EXPENSE)}
        >
          Añadir gasto
        </Button>
      </div>

      <ExpensesSummary />

      <ExpensesTableCard />
    </div>
  );
};

export default ExpensesPage;
