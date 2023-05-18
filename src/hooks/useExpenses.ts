import { useState, useMemo } from 'react';
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
import useFilters from './useFilters';

interface ExpenseDateAmount {
  date: ExpenseDate;
  amount: ExpenseAmount;
}

interface ExpenseCategoryAmount {
  category: ExpenseCategory;
  amount: ExpenseAmount;
}

const useExpenses = () => {
  const expenses = useExpensesStore((state) => state.expenses);
  const createExpenseStore = useExpensesStore((state) => state.createExpenseStore);
  const loadingExpensesStore = useExpensesStore((state) => state.loadingExpensesStore);
  const deleteExpenseStore = useExpensesStore((state) => state.deleteExpenseStore);
  const { monthYearFilter } = useFilters();
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

  const monthExpenses = useMemo(() => {
    const { month, year } = monthYearFilter;

    return expenses
      .filter(
        (value) =>
          getMonthFromTimestamp(value.date) === month &&
          getFullYearFromTimestamp(value.date) === year
      )
      .sort((a, b) => b.date.toMillis() - a.date.toMillis());
  }, [expenses, monthYearFilter]);

  const monthExpensesTotalAmount = useMemo(() => {
    return monthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, [monthExpenses]);

  const monthExpensesByDay = useMemo(() => {
    const { month, year } = monthYearFilter;
    const expensesByDay = [];

    const normalizedExpenses = monthExpenses.map((expense) => ({
      amount: expense.amount,
      date: expense.date,
    }));

    const expensesGroupedByDay = normalizedExpenses.reduce(
      (accExpenses: ExpenseDateAmount[], transaction) => {
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
      },
      []
    );

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
  }, [monthExpenses, monthYearFilter]);

  const monthExpensesByCategory = useMemo(() => {
    const normalizedExpenses = monthExpenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
    }));

    const expensesGroupedByCategory = normalizedExpenses.reduce(
      (accExpenses: ExpenseCategoryAmount[], transaction) => {
        const { category, amount } = transaction;

        // Find an existing object in the accumulator with the same date
        const existingObject = accExpenses.find((obj) => obj.category === category);

        if (existingObject) {
          existingObject.amount += amount;
        } else {
          // Create a new object with the date and amount
          accExpenses.push({ category, amount });
        }

        return accExpenses;
      },
      []
    );

    return expensesGroupedByCategory;
  }, [monthExpenses]);

  return {
    loadingExpensesStore,
    loading,
    monthExpenses,
    monthExpensesByDay,
    monthExpensesByCategory,
    monthExpensesTotalAmount,
    createExpense,
    deleteExpense,
  };
};

export default useExpenses;
