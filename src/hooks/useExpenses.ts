import { useState } from 'react';
import * as expensesService from '../services/expenses.service';
import { useExpensesStore } from '../store/expenses';
import {
  ExpenseAmount,
  ExpenseCategory,
  ExpenseDate,
  ExpenseDescription,
  ExpenseId,
} from '../utils/interfaces/expense.interface';

const useExpenses = () => {
  const expenses = useExpensesStore((state) => state.expenses);
  const createExpenseStore = useExpensesStore((state) => state.createExpenseStore);
  const loadingExpensesStore = useExpensesStore((state) => state.loadingExpensesStore);
  const deleteExpenseStore = useExpensesStore((state) => state.deleteExpenseStore);
  const [loading, setLoading] = useState(false);

  const createExpense = (
    date: ExpenseDate,
    description: ExpenseDescription,
    amount: ExpenseAmount,
    category: ExpenseCategory
  ) => {
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

  const deleteExpense = (id: ExpenseId) => {
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

  return {
    loadingExpensesStore,
    loading,
    expenses,
    createExpense,
    deleteExpense,
  };
};

export default useExpenses;
