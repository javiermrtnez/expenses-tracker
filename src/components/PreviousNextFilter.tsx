import { Icon, Title } from '@tremor/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Props {
  previousOnClick: React.MouseEventHandler<HTMLButtonElement>;
  nextOnClick: React.MouseEventHandler<HTMLButtonElement>;
  resetOnClick: () => void;
  text: string | number;
  disabled: boolean;
}

const PreviousNextFilter = ({
  previousOnClick,
  nextOnClick,
  resetOnClick,
  text,
  disabled,
}: Props) => {
  return (
    <div className='flex gap-1 items-center justify-center'>
      <button className='rounded hover:bg-gray-200 transition-colors' onClick={previousOnClick}>
        <Icon icon={ChevronLeftIcon} color='gray' />
      </button>

      <Title
        className='h-full min-h-[32px] leading-none cursor-pointer w-36 flex justify-center items-center rounded hover:bg-gray-200 transition-colors'
        onClick={resetOnClick}
      >
        {text}
      </Title>

      <button
        className={!disabled ? 'rounded hover:bg-gray-200 transition-colors' : ''}
        onClick={nextOnClick}
        disabled={disabled}
      >
        <Icon icon={ChevronRightIcon} color='gray' className={disabled ? 'text-gray-300' : ''} />
      </button>
    </div>
  );
};

export default PreviousNextFilter;
