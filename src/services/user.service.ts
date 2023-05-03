import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { User } from '../utils/interfaces/user.interface';

/**
 * Create new user in "users" collection
 */
export const createUser = async ({ uid, email, createdAt }: User): Promise<void> => {
  const userRef = doc(db, 'users', uid);

  return setDoc(userRef, {
    email,
    createdAt,
  });
};
