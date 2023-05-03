import { Timestamp } from 'firebase/firestore';
import * as userService from '../services/user.service';

const useUser = () => {
  const createUser = async (uid: string, email: string | null): Promise<void> => {
    return userService.createUser({
      uid,
      email,
      createdAt: Timestamp.now(),
    });
  };

  return {
    createUser,
  };
};

export default useUser;
