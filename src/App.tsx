import { Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import ExpensesPage from './pages/ExpensesPage';
import SummaryPage from './pages/SummaryPage';
import Toaster from './components/Toaster';
import { AuthProvider } from './context/AuthContext';
import { AuthenticatedRoute, UnauthenticatedRoute } from './guards/AuthGuard';
import NotFoundPage from './pages/NotFoundPage';
import Modal from './components/modals/Modal';
import IncomesPage from './pages/IncomesPage';

function App() {
  return (
    <AuthProvider>
      <Modal />
      <Toaster />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route element={<AuthenticatedRoute />}>
            <Route path='/dashboard' element={<SummaryPage />} />
            <Route path='/incomes' element={<IncomesPage />} />
            <Route path='/expenses' element={<ExpensesPage />} />
          </Route>

          <Route element={<UnauthenticatedRoute />}>
            <Route path='/' element={<></>} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
