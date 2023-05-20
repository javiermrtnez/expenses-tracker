import TransactionsTableCard from '../components/TransactionsTableCard';
import MonthYearFilter from '../components/MonthYearFilter';
import useModal from '../hooks/useModal';
import { MODAL_CODES } from '../utils/constants/modalCodes';
import AddTransactionButton from '../components/AddTransactionButton';
import TransactionSummary from '../components/TransactionSummary';
import useExpenses from '../hooks/useExpenses';
import { EXPENSES_CATEGORIES } from '../utils/constants/categories';

const ExpensesPage = () => {
  const { showModal } = useModal();
  const { loadingExpensesStore, monthExpenses, deleteExpense } = useExpenses();

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-6 justify-center flex-wrap sm:justify-between'>
        <AddTransactionButton onClick={showModal(MODAL_CODES.ADD_EXPENSE)}>
          Añadir gasto
        </AddTransactionButton>

        <MonthYearFilter />
      </div>

      <TransactionSummary
        loadingStore={loadingExpensesStore}
        monthTransactions={monthExpenses}
        categories={EXPENSES_CATEGORIES}
      />

      <TransactionsTableCard
        loadingStore={loadingExpensesStore}
        monthTransactions={monthExpenses}
        categories={EXPENSES_CATEGORIES}
        deleteTransaction={deleteExpense}
      />
    </div>
  );
};

export default ExpensesPage;
