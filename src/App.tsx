import { Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout/BaseLayout';
import ExpensesPage from './pages/ExpensesPage';
import SummaryPage from './pages/SummaryPage';
import LogInPage from './pages/LogInPage';
import Toaster from './components/Toaster';
import { AuthProvider } from './context/AuthContext';
import { AuthenticatedRoute, UnauthenticatedRoute } from './guards/AuthGuard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        <Route element={<BaseLayout />}>
          <Route element={<AuthenticatedRoute />}>
            <Route path='/' element={<SummaryPage />} />
            <Route path='/income' element={<div>Income page</div>} />
            <Route path='/expenses' element={<ExpensesPage />} />
          </Route>

          <Route element={<UnauthenticatedRoute />}>
            <Route path='/login' element={<LogInPage />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
