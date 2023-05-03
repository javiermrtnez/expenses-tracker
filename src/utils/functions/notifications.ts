import toast from 'react-hot-toast';

export const notificationSuccess = (message: string) => {
  toast.success(message);
};

export const notificationError = (message: string) => {
  toast.error(message);
};
