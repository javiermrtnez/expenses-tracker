import MonthYearFilter from '../components/MonthYearFilter';
import useModal from '../hooks/useModal';
import { MODAL_CODES } from '../utils/constants/modalCodes';
import AddTransactionButton from '../components/AddTransactionButton';
import TransactionSummary from '../components/TransactionSummary';
import useIncomes from '../hooks/useIncomes';
import { INCOMES_CATEGORIES } from '../utils/constants/categories';
import TransactionsTableCard from '../components/TransactionsTableCard';

const IncomesPage = () => {
  const { showModal } = useModal();
  const { loadingIncomesStore, monthIncomes } = useIncomes();

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-6 justify-center flex-wrap sm:justify-between'>
        <MonthYearFilter />

        <AddTransactionButton onClick={showModal(MODAL_CODES.ADD_INCOME)}>
          Añadir ingreso
        </AddTransactionButton>
      </div>

      <TransactionSummary
        loadingStore={loadingIncomesStore}
        monthTransactions={monthIncomes}
        categories={INCOMES_CATEGORIES}
      />

      <TransactionsTableCard
        loadingStore={loadingIncomesStore}
        monthTransactions={monthIncomes}
        categories={INCOMES_CATEGORIES}
        deleteTransaction={() => {}}
      />
    </div>
  );
};

export default IncomesPage;
