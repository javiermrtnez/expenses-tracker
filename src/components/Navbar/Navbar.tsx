import { Bold, Button } from '@tremor/react';

const Navbar = () => {
  return (
    <nav className='sticky top-0 flex w-full z-50 h-[var(--navbar-height)] bg-white bg-opacity-50 shadow-sm backdrop-blur'>
      <div className='flex items-center justify-between w-[var(--page-width-with-padding)] m-auto px-[var(--page-padding)]'>
        <div className='flex gap-1 items-center'>
          <div className='h-6 w-6 rounded-md bg-gradient-to-br from-emerald-400 to-lime-400' />
          <Bold className='font-bold'>IncomeExpensesApp</Bold>
        </div>

        <div className='flex gap-2'>
          <Button size='md' color='gray' variant='secondary'>
            Sign up
          </Button>
          <Button size='md' color='gray' variant='primary'>
            Log in
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
