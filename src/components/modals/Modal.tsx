import { useEffect } from 'react';
import ModalLayout from '../../layouts/ModalLayout';
import { MODAL_CODES } from '../../utils/constants/modalCodes';
import useModal from '../../hooks/useModal';
import AddExpenseModal from './AddExpenseModal';

const MODALS = {
  [MODAL_CODES.ADD_EXPENSE]: {
    title: 'Añadir gasto',
    modal: <AddExpenseModal />,
  },
};

const Modal = () => {
  const { modalCode } = useModal();

  useEffect(() => {
    document.body.style.overflow = modalCode ? 'hidden' : '';
  }, [modalCode]);

  return (
    <>
      {modalCode && (
        <ModalLayout title={MODALS[modalCode].title}>{MODALS[modalCode].modal}</ModalLayout>
      )}
    </>
  );
};

export default Modal;
