import useAuth from '../hooks/useAuth';

const SignOutButton = () => {
  const { handleLogOut } = useAuth();

  return (
    <button
      className='flex content-center items-center px-3 border border-black font-medium rounded-md h-8 text-sm bg-white 
            text-black transition-colors hover:bg-black hover:text-white focus:focus:ring-gray-300'
      onClick={handleLogOut}
    >
      Cerrar sesión
    </button>
  );
};

export default SignOutButton;
