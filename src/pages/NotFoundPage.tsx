import { Text, Title } from '@tremor/react';

const NotFoundPage = () => {
  return (
    <div className='flex gap-5 items-center justify-center'>
      <Title className='font-bold'>404</Title>
      <div className='h-10 border border-gray-300' />
      <Text className='text-base'>This page could not be found.</Text>
    </div>
  );
};

export default NotFoundPage;
