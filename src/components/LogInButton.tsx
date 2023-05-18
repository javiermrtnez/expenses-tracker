import useAuth from '../hooks/useAuth';
import { GoogleIcon } from '../assets/icons/GoogleIcon';

const LogInButton = () => {
  const { handleLogInGoogle } = useAuth();

  return (
    <button
      className='flex gap-2 justify-center items-center px-3 border border-black font-medium rounded-md h-8 text-sm bg-black 
      text-white transition-colors hover:bg-transparent hover:text-black focus:focus:ring-gray-300'
      onClick={handleLogInGoogle}
    >
      <GoogleIcon />
      Iniciar sesión
    </button>
  );
};

export default LogInButton;
