import { TableCell, TableRow } from '@tremor/react';

interface TableSkeletonProps {
  rows: number;
  columns: number;
}

const TableSkeleton = ({ rows, columns }: TableSkeletonProps) => {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(columns)].map((_, i) => (
            <TableCell key={i}>
              <div role='status' className='max-w-sm animate-pulse'>
                <div className='h-2.5 bg-gray-200 rounded-full w-48 mb-4'></div>
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
