import { useState, useMemo } from 'react';
import * as expensesService from '../services/expenses.service';
import { useExpensesStore } from '../store/expenses';
import useFilters from './useFilters';
import { getMonthTransactions } from '../utils/functions/monthTransactions';
import { TransactionId, TransactionWithoutId } from '../utils/interfaces/transaction.interface';
import { getYearTransactionsByMonth } from '../utils/functions/yearTransactions';

const useExpenses = () => {
  const expenses = useExpensesStore((state) => state.expenses);
  const createExpenseStore = useExpensesStore((state) => state.createExpenseStore);
  const loadingExpensesStore = useExpensesStore((state) => state.loadingExpensesStore);
  const deleteExpenseStore = useExpensesStore((state) => state.deleteExpenseStore);

  const { monthYearFilter, yearFilter } = useFilters();

  const [loading, setLoading] = useState(false);

  const createExpense = ({ date, description, amount, category }: TransactionWithoutId) => {
    setLoading(true);

    const id = crypto.randomUUID();

    expensesService
      .createExpense({ id, date, description, amount, category })
      .then(() => {
        createExpenseStore({ id, date, description, amount, category });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteExpense = (id: TransactionId) => () => {
    setLoading(true);

    expensesService
      .deleteExpense(id)
      .then(() => {
        deleteExpenseStore(id);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const monthExpenses = useMemo(
    () => getMonthTransactions(expenses, monthYearFilter),
    [expenses, monthYearFilter]
  );

  const yearExpenses = useMemo(
    () => getYearTransactionsByMonth(expenses, yearFilter),
    [expenses, yearFilter]
  );

  return {
    loadingExpensesStore,
    loading,
    monthExpenses,
    yearExpenses,
    createExpense,
    deleteExpense,
  };
};

export default useExpenses;
