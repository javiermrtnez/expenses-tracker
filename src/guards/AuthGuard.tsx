import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const AuthenticatedRoute = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to='/login' />;
};

export const UnauthenticatedRoute = () => {
  const { user } = useAuthContext();

  return !user ? <Outlet /> : <Navigate to='/' />;
};
