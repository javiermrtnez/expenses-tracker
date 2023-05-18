import { useState } from 'react';
import * as incomesService from '../services/incomes.service';
import { useIncomesStore } from '../store/incomes';
import { IncomeWithoutId } from '../utils/interfaces/income.interface';

const useIncomes = () => {
  const incomes = useIncomesStore((state) => state.incomes);
  const createIncomeStore = useIncomesStore((state) => state.createIncomeStore);

  const [loading, setLoading] = useState(false);

  const createIncome = ({ date, description, amount, category }: IncomeWithoutId) => {
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

  return {
    loading,
    incomes,
    createIncome,
  };
};

export default useIncomes;
