import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import useExpenses from '../hooks/useExpenses';
import useIncomes from '../hooks/useIncomes';
import { useIncomesStore } from '../store/incomes';
import { useExpensesStore } from '../store/expenses';

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext();

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>();

  const fetchExpensesStore = useExpensesStore((state) => state.fetchExpensesStore);
  const clearExpensesStore = useExpensesStore((state) => state.clearExpensesStore);
  const fetchIncomesStore = useIncomesStore((state) => state.fetchIncomesStore);
  const clearIncomesStore = useIncomesStore((state) => state.clearIncomesStore);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log('Auth currentUser', currentUser);
      setUser(currentUser);

      if (currentUser) {
        fetchExpensesStore();
        fetchIncomesStore();
      } else {
        clearExpensesStore();
        clearIncomesStore();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
