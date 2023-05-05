const ExpensesSummarySkeleton = () => {
  return (
    <div className='w-full p-4 animate-pulse'>
      <div className='h-2 w-20 bg-gray-200 rounded-full mb-2.5' />
      <div className='h-5 w-28 bg-gray-200 rounded-full' />
      <div className='flex items-baseline mt-11 space-x-6'>
        <div className='h-40 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-32 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-40 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-36 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-44 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-44 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-40 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-40 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-44 w-full bg-gray-200 rounded-t-lg' />
      </div>
    </div>
  );
};

export default ExpensesSummarySkeleton;
