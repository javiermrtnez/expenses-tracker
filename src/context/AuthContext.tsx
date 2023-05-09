import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useExpensesStore } from '../store/expenses';

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext();

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>();
  const fetchExpensesStore = useExpensesStore((state) => state.fetchExpensesStore);
  const clearExpensesStore = useExpensesStore((state) => state.clearExpensesStore);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log('Auth currentUser', currentUser);
      setUser(currentUser);

      if (currentUser) {
        fetchExpensesStore();
      } else {
        clearExpensesStore();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
