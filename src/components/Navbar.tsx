import { Link, useLocation, useNavigate } from 'react-router-dom';
import joinClassNames from '../utils/functions/classNames';
import Logo from './Logo';
import { useAuthContext } from '../context/AuthContext';
import LogInButton from './LogInButton';
import SignOutButton from './SignOutButton';
import { useState } from 'react';

const NAVIGATION = [
  {
    name: 'Resumen',
    to: '/dashboard',
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
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenuOpen = () => {
    setIsMobileMenuOpen((prevState) => !prevState);

    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const handleNavigate = (to: string) => {
    toggleMobileMenuOpen();
    navigate(to);
  };

  return (
    <header className='sticky top-0 flex w-full z-10 h-[var(--navbar-height)] bg-white bg-opacity-50 shadow-sm backdrop-blur'>
      <div className='flex gap-3 items-center justify-between w-[var(--page-width-with-padding)] m-auto px-[var(--page-padding)]'>
        <div className='flex flex-1 justify-start'>
          <Logo />
        </div>

        {user && (
          <ul className='hidden sm:flex sm:gap-2 sm:justify-center'>
            {NAVIGATION.map(({ name, to }) => (
              <li key={name} className='flex content-center items-center'>
                <Link
                  className={joinClassNames(
                    'py-2 px-3 text-gray-600 text-sm rounded-md leading-none hover:text-gray-950 hover:bg-gray-100 transition-colors',
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

        <div className='hidden sm:flex sm:flex-1 sm:justify-end'>
          {user ? <SignOutButton /> : <LogInButton />}
        </div>

        <div className='sm:hidden'>
          <button onClick={toggleMobileMenuOpen} className='transition-transform w-6 h-10'>
            <div
              className={joinClassNames(
                'w-full h-full flex flex-col pointer-events-none justify-center items-center before:block before:rounded before:h-px before:w-5 before:bg-black before:transition-transform after:block after:rounded after:h-px after:w-5 after:bg-black after:transition-transform',
                isMobileMenuOpen
                  ? 'before:translate-y-px before:rotate-45 after:translate-y-0 after:-rotate-45'
                  : 'before:-translate-y-1 before:rotate-0 after:translate-y-1 after:rotate-0'
              )}
            />
          </button>

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <div
              className='fixed z-10 p-[var(--page-padding)] left-0 right-0 bottom-0 top-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))] w-screen bg-white/95'
              onClick={toggleMobileMenuOpen}
            >
              <div
                className='w-full flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-md'
                onClick={(e) => e.stopPropagation()}
              >
                {user && (
                  <ul className='flex flex-col gap-2'>
                    {NAVIGATION.map(({ name, to }) => (
                      <li key={name} className='flex content-center items-center'>
                        <button
                          className={joinClassNames(
                            'py-2 px-3 text-gray-600 w-full text-sm text-left rounded-md leading-none hover:text-gray-950 hover:bg-gray-100 transition-colors',
                            pathname === to
                              ? ' bg-gray-200 hover:bg-gray-200 text-gray-950 font-medium'
                              : ''
                          )}
                          onClick={() => handleNavigate(to)}
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className='[&>button]:w-full'>
                  {user ? <SignOutButton /> : <LogInButton />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
