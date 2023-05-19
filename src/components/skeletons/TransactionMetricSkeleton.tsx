const TransactionMetricSkeleton = () => {
  return (
    <div className='w-full flex gap-4 animate-pulse'>
      <div className='h-14 w-14 bg-gray-200 rounded-lg' />
      <div className='flex flex-col gap-2'>
        <div className='h-4 w-16 bg-gray-200 rounded-full' />
        <div className='h-8 w-32 bg-gray-200 rounded-full' />
      </div>
    </div>
  );
};

export default TransactionMetricSkeleton;
