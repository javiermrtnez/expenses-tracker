import { Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout/BaseLayout';
import ExpensesPage from './pages/ExpensesPage';
import SummaryPage from './pages/SummaryPage';

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path='/' element={<SummaryPage />} />
        <Route path='/sign-up' element={<div>Sign up page</div>} />
        <Route path='/log-in' element={<div>Log in page</div>} />
        <Route path='/income' element={<div>Income page</div>} />
        <Route path='/expenses' element={<ExpensesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
