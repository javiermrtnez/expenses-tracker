import { Grid } from '@tremor/react';
import { Col } from '@tremor/react';
import AddExpenseCard from '../components/AddExpenseCard';
import ExpensesSummary from '../components/ExpensesSummary';
import ExpensesTableCard from '../components/ExpensesTableCard';
import MonthYearFilter from '../components/MonthYearFilter';

const ExpensesPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <MonthYearFilter />

      <Grid numColsLg={5} className='gap-6'>
        <Col numColSpanLg={2}>
          <AddExpenseCard />
        </Col>

        <Col numColSpanLg={3}>
          <ExpensesSummary />
        </Col>
      </Grid>

      <ExpensesTableCard />
    </div>
  );
};

export default ExpensesPage;
