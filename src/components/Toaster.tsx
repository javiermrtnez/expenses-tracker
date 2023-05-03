import { Toaster as ReactHotToast } from 'react-hot-toast';

const Toaster = () => {
  return (
    <ReactHotToast
      position='bottom-right'
      toastOptions={{ duration: 4000, style: { fontSize: '14px' } }}
    />
  );
};

export default Toaster;
