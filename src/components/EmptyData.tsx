interface Props {
  text: string;
}

const EmptyData = ({ text }: Props) => {
  return (
    <div className='flex justify-center p-4 rounded border border-gray-200 text-gray-500'>
      {text}
    </div>
  );
};

export default EmptyData;
