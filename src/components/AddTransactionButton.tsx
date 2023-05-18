import { PlusIcon } from '@heroicons/react/20/solid';
import { Button } from '@tremor/react';

const AddTransactionButton = ({ children, onClick }) => {
  return (
    <Button
      className='w-full sm:w-fit transition-colors'
      size='xs'
      color='slate'
      icon={PlusIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default AddTransactionButton;
