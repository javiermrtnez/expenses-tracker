import { Link, useLocation } from 'react-router-dom';
import joinClassNames from '../utils/functions/classNames';
import Logo from './Logo';
import { useAuthContext } from '../context/AuthContext';
import LogInButton from './LogInButton';
import SignOutButton from './SignOutButton';

const NAVIGATION = [
  {
    name: 'Resumen',
    to: '/',
  },
  {
    name: 'Ingresos',
    to: '/income',
  },
  {
    name: 'Gastos',
    to: '/expenses',
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useAuthContext();

  return (
    <header className='sticky top-0 flex w-full z-50 h-[var(--navbar-height)] bg-white bg-opacity-50 shadow-sm backdrop-blur'>
      <div className='flex gap-3 items-center justify-between w-[var(--page-width-with-padding)] m-auto px-[var(--page-padding)]'>
        <div className='flex flex-1 justify-start'>
          <Logo />
        </div>

        {user && (
          <ul className='flex gap-2 justify-center'>
            {NAVIGATION.map(({ name, to }) => (
              <li key={name} className='flex content-center items-center'>
                <Link
                  className={joinClassNames(
                    'py-2 px-3 text-gray-600 text-sm rounded-full leading-none hover:text-gray-950 hover:bg-gray-100 transition-colors',
                    pathname === to
                      ? ' bg-gray-200 hover:bg-gray-200 text-gray-950 font-medium'
                      : ''
                  )}
                  to={to}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className='flex gap-2 flex-1 justify-end'>
          {!user ? <LogInButton /> : <SignOutButton />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
