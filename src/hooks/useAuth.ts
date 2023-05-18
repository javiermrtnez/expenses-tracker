import { AdditionalUserInfo, UserCredential, getAdditionalUserInfo } from 'firebase/auth';
import * as authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { notificationError, notificationSuccess } from '../utils/functions/notifications';
import useUser from './useUser';

const useAuth = () => {
  const navigate = useNavigate();
  const { createUser } = useUser();

  const saveNewUser = async (userCredential: UserCredential): Promise<void> => {
    const { isNewUser } = getAdditionalUserInfo(userCredential) as AdditionalUserInfo;

    if (isNewUser) {
      const { user } = userCredential;
      await createUser(user.uid, user.email);
    }
  };

  const handleLogInGoogle = (): void => {
    authService
      .logInGoogle()
      .then(async (userCredential) => {
        await saveNewUser(userCredential);

        notificationSuccess('¡Has iniciado sesión con éxito!');
        navigate('/dashboard');
      })
      .catch((e) => {
        notificationError(
          '¡Ups! Parece que hubo un error con tu inicio de sesión. Por favor, inténtalo de nuevo más tarde.'
        );
        console.log(e.message);
      });
  };

  const handleLogOut = () => {
    authService
      .logOut()
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return { handleLogInGoogle, handleLogOut };
};

export default useAuth;
