import { Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout/BaseLayout';
import ExpensesPage from './pages/ExpensesPage';
import SummaryPage from './pages/SummaryPage';
import LogInPage from './pages/LogInPage';

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path='/' element={<SummaryPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/income' element={<div>Income page</div>} />
        <Route path='/expenses' element={<ExpensesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
