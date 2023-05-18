import { Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import ExpensesPage from './pages/ExpensesPage';
import SummaryPage from './pages/SummaryPage';
import LogInPage from './pages/LogInPage';
import Toaster from './components/Toaster';
import { AuthProvider } from './context/AuthContext';
import { AuthenticatedRoute, UnauthenticatedRoute } from './guards/AuthGuard';
import NotFoundPage from './pages/NotFoundPage';
import Modal from './components/modals/Modal';
import IncomePage from './pages/IncomePage';

function App() {
  return (
    <AuthProvider>
      <Modal />
      <Toaster />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route element={<AuthenticatedRoute />}>
            <Route path='/dashboard' element={<SummaryPage />} />
            <Route path='/income' element={<IncomePage />} />
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
