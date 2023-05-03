import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuthContext } from '../../context/AuthContext';
import LoadingPage from '../../pages/LoadingPage';

const BaseLayout = () => {
  const { user } = useAuthContext();

  return user === undefined ? (
    <LoadingPage />
  ) : (
    <>
      <Navbar />

      <div className='w-full mx-auto max-w-[var(--page-width-with-padding)] px-[var(--page-padding)] py-[calc(2*var(--page-padding))]'>
        <Outlet />
      </div>
    </>
  );
};

export default BaseLayout;
