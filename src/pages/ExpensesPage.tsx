import ExpensesSummary from '../components/ExpensesSummary';
import ExpensesTableCard from '../components/ExpensesTableCard';
import MonthYearFilter from '../components/MonthYearFilter';
import useModal from '../hooks/useModal';
import { MODAL_CODES } from '../utils/constants/modalCodes';
import AddTransactionButton from '../components/AddTransactionButton';

const ExpensesPage = () => {
  const { showModal } = useModal();

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-6 justify-center flex-wrap sm:justify-between'>
        <MonthYearFilter />

        <AddTransactionButton onClick={showModal(MODAL_CODES.ADD_EXPENSE)}>
          Añadir gasto
        </AddTransactionButton>
      </div>

      <ExpensesSummary />

      <ExpensesTableCard />
    </div>
  );
};

export default ExpensesPage;
