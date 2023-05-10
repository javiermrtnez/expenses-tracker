import { useModalStore } from '../store/modal';

const useModal = () => {
  const modalCode = useModalStore((state) => state.modalCode);
  const showModal = useModalStore((state) => state.showModal);
  const closeModal = useModalStore((state) => state.closeModal);

  return {
    modalCode,
    showModal,
    closeModal,
  };
};

export default useModal;
