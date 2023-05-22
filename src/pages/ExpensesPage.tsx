import TransactionsTableCard from '../components/TransactionsTableCard';
import useModal from '../hooks/useModal';
import { MODAL_CODES } from '../utils/constants/modalCodes';
import TransactionSummary from '../components/TransactionSummary';
import useExpenses from '../hooks/useExpenses';
import { EXPENSES_CATEGORIES } from '../utils/constants/categories';
import AddTransactionButtonFilter from '../components/AddTransactionButtonFilter';

const ExpensesPage = () => {
  const { showModal } = useModal();
  const { loadingExpensesStore, monthExpenses, deleteExpense } = useExpenses();

  return (
    <div className='flex flex-col gap-6'>
      <AddTransactionButtonFilter
        buttonText='Añadir gasto'
        buttonOnClick={showModal(MODAL_CODES.ADD_EXPENSE)}
      />

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
