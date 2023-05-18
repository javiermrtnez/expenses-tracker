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
import { FIREBASE_COLLECTIONS } from './firebaseCollections';
import { Income, IncomeId } from '../utils/interfaces/income.interface';

/**
 * Get all user INCOMES from "users > incomes" collection
 */
export const fetchIncomes = async (): Promise<QuerySnapshot<DocumentData>> => {
  const incomes = [];

  const incomesRef = collection(
    db,
    FIREBASE_COLLECTIONS.USERS,
    auth?.currentUser?.uid ?? '',
    FIREBASE_COLLECTIONS.INCOMES
  );

  // Retrieve all documents in the incomes collection
  const incomesSnapshot = await getDocs(incomesRef);

  incomesSnapshot.forEach((doc) => {
    incomes.push({ id: doc.id, ...doc.data() });
  });

  return incomes;
};

/**
 * Create new INCOME in "users > incomes" collection
 */
export const createIncome = async ({
  id,
  date,
  description,
  amount,
  category,
}: Income): Promise<void> => {
  const incomesRef = doc(
    db,
    FIREBASE_COLLECTIONS.USERS,
    auth?.currentUser?.uid ?? '',
    FIREBASE_COLLECTIONS.INCOMES,
    id
  );

  return setDoc(incomesRef, {
    date,
    description,
    amount,
    category,
  });
};

/**
 * Delete INCOME in "users > incomes" collection
 */
export const deleteIncome = async (id: IncomeId): Promise<void> => {
  const incomeRef = doc(
    db,
    FIREBASE_COLLECTIONS.USERS,
    auth?.currentUser?.uid ?? '',
    FIREBASE_COLLECTIONS.INCOMES,
    id
  );

  return deleteDoc(incomeRef);
};
