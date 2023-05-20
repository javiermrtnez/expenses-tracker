const AnnualSummarySkeleton = () => {
  return (
    <div className='flex flex-col justify-between w-full h-[360px] animate-pulse'>
      <div className='flex gap-2 items-center h-10'>
        <div className='h-full w-48 bg-gray-200 rounded-full' />
      </div>

      <div className='flex gap-2 justify-end items-center h-5'>
        <div className='h-3 w-20 bg-gray-200 rounded-full' />
        <div className='h-3 w-20 bg-gray-200 rounded-full' />
      </div>

      <div className='flex items-baseline gap-6'>
        <div className='h-64 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-56 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-52 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-60 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-72 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-52 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-56 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-64 w-full bg-gray-200 rounded-t-lg' />
        <div className='h-60 w-full bg-gray-200 rounded-t-lg' />
      </div>
    </div>
  );
};

export default AnnualSummarySkeleton;
