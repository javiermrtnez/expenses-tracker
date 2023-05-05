import { useState, useCallback } from 'react';
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
import {
  getFullYearFromTimestamp,
  getMonthFromTimestamp,
  getTimeFromTimestamp,
} from '../utils/functions/converters';

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

  const sumAmountExpenses = useCallback(
    (year: number, month: number) =>
      expenses
        .filter(
          (value) =>
            getMonthFromTimestamp(value.date) === month &&
            getFullYearFromTimestamp(value.date) === year
        )
        .reduce((acc, curr) => acc + curr.amount, 0),
    [expenses]
  );

  const getDailyExpenses = useCallback(
    (year: number, month: number) => {
      const expensesByDay = [];

      const normalizedExpenses = expenses
        .map((expense) => ({
          amount: expense.amount,
          date: expense.date,
        }))
        .filter(
          (value) =>
            getMonthFromTimestamp(value.date) === month &&
            getFullYearFromTimestamp(value.date) === year
        );

      const expensesGroupedByDay = normalizedExpenses.reduce((accExpenses, transaction) => {
        const { date, amount } = transaction;

        // Find an existing object in the accumulator with the same date
        const existingObject = accExpenses.find(
          (obj) => getTimeFromTimestamp(obj.date) === getTimeFromTimestamp(date)
        );

        if (existingObject) {
          existingObject.amount += amount;
        } else {
          // Create a new object with the date and amount
          accExpenses.push({ date, amount });
        }

        return accExpenses;
      }, []);

      // Create a new Date object for the first day of the month
      const startDate = new Date(year, month, 1);
      // Create a new Date object for the last day of the month
      const endDate = new Date(year, month + 1, 0);

      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const formattedDate = Timestamp.fromDate(new Date(date));

        const index = expensesGroupedByDay.findIndex(
          (expense) => getTimeFromTimestamp(expense.date) === getTimeFromTimestamp(formattedDate)
        );

        if (index >= 0) {
          expensesByDay.push(expensesGroupedByDay[index]);
        } else {
          expensesByDay.push({ date: formattedDate, amount: 0 });
        }
      }

      return expensesByDay;
    },
    [expenses]
  );

  return {
    loadingExpensesStore,
    loading,
    expenses,
    sumAmountExpenses,
    getDailyExpenses,
    createExpense,
    deleteExpense,
  };
};

export default useExpenses;
