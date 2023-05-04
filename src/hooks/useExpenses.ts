import { useState, useMemo, useCallback } from 'react';
import * as expensesService from '../services/expenses.service';
import { useExpensesStore } from '../store/expenses';
import {
  ExpenseAmount,
  ExpenseCategory,
  ExpenseDate,
  ExpenseDescription,
  ExpenseId,
} from '../utils/interfaces/expense.interface';
import { Timestamp } from 'firebase/firestore';

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

  const sumAmountExpenses = useMemo(
    () => expenses.reduce((acc, curr) => acc + curr.amount, 0),
    [expenses]
  );

  const fromTimestampToFormattedDate = (date: Timestamp) => {
    const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };

    return date.toDate().toLocaleDateString('es-ES', DATE_OPTIONS);
  };

  const fromDateToFormattedDate = (date: Date) => {
    const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    };

    return date.toLocaleDateString('es-ES', DATE_OPTIONS);
  };

  const normalizedExpenses = useMemo(
    () =>
      expenses.map((expense) => ({
        amount: expense.amount,
        date: fromTimestampToFormattedDate(expense.date),
      })),
    [expenses]
  );

  const expensesGroupedByDay = useMemo(
    () =>
      normalizedExpenses.reduce((accExpenses, transaction) => {
        const { date, amount } = transaction;

        // Find an existing object in the accumulator with the same date
        const existingObject = accExpenses.find((obj) => obj.date === date);

        if (existingObject) {
          existingObject.amount += amount;
        } else {
          // Create a new object with the date and amount
          accExpenses.push({ date, amount });
        }

        return accExpenses;
      }, []),
    [normalizedExpenses]
  );

  const getExpensesByDay = useCallback(() => {
    const datesArray = [];

    const startDate = new Date(2023, 4, 1); // May 1st, 2023
    const endDate = new Date(2023, 4, 31); // May 31st, 2023

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      datesArray.push(fromDateToFormattedDate(new Date(date)));
    }

    return datesArray.map((date) => {
      const index = expensesGroupedByDay.findIndex((expense) => expense.date === date);

      if (index >= 0) {
        return expensesGroupedByDay[index];
      } else {
        return { date, amount: 0 };
      }
    });
  }, [expensesGroupedByDay]);

  return {
    loadingExpensesStore,
    loading,
    expenses,
    expensesByDay: getExpensesByDay(),
    sumAmountExpenses,
    createExpense,
    deleteExpense,
  };
};

export default useExpenses;
