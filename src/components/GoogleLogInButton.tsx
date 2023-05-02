import { GoogleIcon } from '../assets/icons/GoogleIcon';

const GoogleLogInButton = () => {
  return (
    <button
      className='flex gap-3 justify-center items-center px-3 border border-black font-medium rounded-md h-12 w-full text-sm bg-black 
      text-white transition-colors hover:bg-transparent hover:text-black focus:focus:ring-gray-300'
    >
      <GoogleIcon />
      Continuar con Google
    </button>
  );
};

export default GoogleLogInButton;
