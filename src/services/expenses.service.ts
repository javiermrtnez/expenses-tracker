import {
  DocumentData,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { Expense, ExpenseId } from '../utils/interfaces/expense.interface';

/**
 * Get all user Expenses from "users > expenses" collection
 */
export const fetchExpenses = async (): Promise<QuerySnapshot<DocumentData>> => {
  const expenses = [];

  const expensesRef = collection(db, 'users', auth?.currentUser?.uid ?? '', 'expenses');

  // Retrieve all documents in the expenses collection
  const expensesSnapshot = await getDocs(expensesRef);

  expensesSnapshot.forEach((doc) => {
    expenses.push({ id: doc.id, ...doc.data() });
  });

  return expenses;
};

/**
 * Create new Expense in "users > expenses" collection
 */
export const createExpense = async ({
  id,
  date,
  description,
  amount,
  category,
}: Expense): Promise<void> => {
  const expensesRef = doc(db, 'users', auth?.currentUser?.uid ?? '', 'expenses', id);

  return setDoc(expensesRef, {
    date,
    description,
    amount,
    category,
  });
};

/**
 * Delete Expense in "users > expenses" collection
 */
export const deleteExpense = async (id: ExpenseId): Promise<void> => {
  const expenseRef = doc(db, 'users', auth?.currentUser?.uid ?? '', 'expenses', id);

  return deleteDoc(expenseRef);
};
