interface TableSkeletonProps {
  rows: number;
}

const TableSkeleton = ({ rows = 10 }: TableSkeletonProps) => {
  return (
    <div className='w-full p-4 animate-pulse'>
      <div className='h-5 w-20 mb-2.5 bg-gray-200 rounded-full' />
      <div className='h-2 w-32 bg-gray-200 rounded-full' />
      <div className='flex gap-3 flex-col mt-6'>
        {[...Array(rows)].map((_, i) => (
          <div key={i} className='h-3 w-full bg-gray-200 rounded-full mb-4' />
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
