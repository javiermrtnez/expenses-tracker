import { Link } from 'react-router-dom';

const LogInButton = () => {
  return (
    <Link
      className='flex content-center justify-center items-center px-3 border border-black font-medium rounded-md h-8 text-sm bg-black 
            text-white transition-colors hover:bg-transparent hover:text-black focus:focus:ring-gray-300'
      to='/login'
    >
      Iniciar sesión
    </Link>
  );
};

export default LogInButton;
