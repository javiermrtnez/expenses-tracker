import { Bold } from '@tremor/react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Logo = () => {
  const { user } = useAuthContext();

  return (
    <Link to={user ? '/dashboard' : '/'} className='flex gap-2 items-center'>
      <div className='h-6 w-6 rounded-md bg-gradient-to-br from-emerald-400 to-lime-400' />
      <Bold className='font-bold'>ExpensesTracker</Bold>
    </Link>
  );
};

export default Logo;
