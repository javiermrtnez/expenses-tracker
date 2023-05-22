import useModal from '../hooks/useModal';
import { MODAL_CODES } from '../utils/constants/modalCodes';
import TransactionSummary from '../components/TransactionSummary';
import useIncomes from '../hooks/useIncomes';
import { INCOMES_CATEGORIES } from '../utils/constants/categories';
import TransactionsTableCard from '../components/TransactionsTableCard';
import AddTransactionButtonFilter from '../components/AddTransactionButtonFilter';

const IncomesPage = () => {
  const { showModal } = useModal();
  const { loadingIncomesStore, monthIncomes, deleteIncome } = useIncomes();

  return (
    <div className='flex flex-col gap-6'>
      <AddTransactionButtonFilter
        buttonText='Añadir ingreso'
        buttonOnClick={showModal(MODAL_CODES.ADD_INCOME)}
      />

      <TransactionSummary
        title='Ingresos mensuales'
        loadingStore={loadingIncomesStore}
        monthTransactions={monthIncomes}
        categories={INCOMES_CATEGORIES}
      />

      <TransactionsTableCard
        title='Ingresos'
        subtitle='Resumen de los ingresos mensuales'
        loadingStore={loadingIncomesStore}
        monthTransactions={monthIncomes}
        categories={INCOMES_CATEGORIES}
        deleteTransaction={deleteIncome}
      />
    </div>
  );
};

export default IncomesPage;
