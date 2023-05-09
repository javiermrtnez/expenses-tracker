import { Title } from '@tremor/react';
import GoogleLogInButton from '../components/GoogleLogInButton';

const LogInPage = () => {
  return (
    <div className='flex gap-7 flex-col items-center m-auto max-w-md'>
      <Title className='text-2xl text-center'>Iniciar sesión en ExpensesTracker</Title>

      <GoogleLogInButton />
    </div>
  );
};

export default LogInPage;
