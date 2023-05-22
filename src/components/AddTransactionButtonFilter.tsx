import AddTransactionButton from './AddTransactionButton';
import MonthYearFilter from './MonthYearFilter';

interface Props {
  buttonText: string;
  buttonOnClick: React.MouseEventHandler<HTMLButtonElement>;
}

const AddTransactionButtonFilter = ({ buttonText, buttonOnClick }: Props) => {
  return (
    <div className='flex gap-6 justify-center flex-wrap sm:justify-between'>
      <AddTransactionButton onClick={buttonOnClick}>{buttonText}</AddTransactionButton>

      <MonthYearFilter />
    </div>
  );
};

export default AddTransactionButtonFilter;
