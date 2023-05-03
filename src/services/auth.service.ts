import { GoogleAuthProvider, UserCredential, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

export const logInGoogle = async (): Promise<UserCredential> => {
  const googleProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleProvider);
};

export const logOut = async (): Promise<void> => {
  return signOut(auth);
};
