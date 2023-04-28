import { Bold } from '@tremor/react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to='/' className='flex gap-2 items-center'>
      <div className='h-6 w-6 rounded-md bg-gradient-to-br from-emerald-400 to-lime-400' />
      <Bold className='font-bold'>IncomeExpensesApp</Bold>
    </Link>
  );
};

export default Logo;
