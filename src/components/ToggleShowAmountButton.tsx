import { Icon } from '@tremor/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

interface Props {
  showAmount: boolean;
  setShowAmount: (value: React.SetStateAction<boolean>) => void;
}

const ToggleShowAmountButton = ({ showAmount, setShowAmount }: Props) => {
  const toggleShowAmount = () => {
    setShowAmount((prevState) => !prevState);
  };

  return (
    <button
      className='rounded hover:bg-gray-200 transition-colors h-full'
      onClick={toggleShowAmount}
    >
      <Icon icon={showAmount ? EyeSlashIcon : EyeIcon} color='gray' />
    </button>
  );
};

export default ToggleShowAmountButton;
