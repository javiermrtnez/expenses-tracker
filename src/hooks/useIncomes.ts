import { useState, useMemo } from 'react';
import * as incomesService from '../services/incomes.service';
import { useIncomesStore } from '../store/incomes';
import useFilters from './useFilters';
import { getMonthTransactions } from '../utils/functions/transactions';
import { TransactionId, TransactionWithoutId } from '../utils/interfaces/transaction.interface';

const useIncomes = () => {
  const incomes = useIncomesStore((state) => state.incomes);
  const createIncomeStore = useIncomesStore((state) => state.createIncomeStore);
  const loadingIncomesStore = useIncomesStore((state) => state.loadingIncomesStore);
  const deleteIncomeStore = useIncomesStore((state) => state.deleteIncomeStore);
  const { monthYearFilter } = useFilters();
  const [loading, setLoading] = useState(false);

  const createIncome = ({ date, description, amount, category }: TransactionWithoutId) => {
    setLoading(true);

    const id = crypto.randomUUID();

    incomesService
      .createIncome({ id, date, description, amount, category })
      .then(() => {
        createIncomeStore({ id, date, description, amount, category });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteIncome = (id: TransactionId) => () => {
    setLoading(true);

    incomesService
      .deleteIncome(id)
      .then(() => {
        deleteIncomeStore(id);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const monthIncomes = useMemo(
    () => getMonthTransactions(incomes, monthYearFilter),
    [incomes, monthYearFilter]
  );

  return {
    loadingIncomesStore,
    loading,
    monthIncomes,
    createIncome,
    deleteIncome,
  };
};

export default useIncomes;
