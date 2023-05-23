import { Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import ExpensesPage from './pages/ExpensesPage';
import DashboardPage from './pages/DashboardPage';
import Toaster from './components/Toaster';
import { AuthProvider } from './context/AuthContext';
import { AuthenticatedRoute, UnauthenticatedRoute } from './guards/AuthGuard';
import NotFoundPage from './pages/NotFoundPage';
import Modal from './components/modals/Modal';
import IncomesPage from './pages/IncomesPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Modal />
      <Toaster />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route element={<AuthenticatedRoute />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/incomes' element={<IncomesPage />} />
            <Route path='/expenses' element={<ExpensesPage />} />
          </Route>

          <Route element={<UnauthenticatedRoute />}>
            <Route path='/' element={<HomePage />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
