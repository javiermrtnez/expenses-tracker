import { useEffect } from 'react';
import ModalLayout from '../../layouts/ModalLayout';
import { MODAL_CODES } from '../../utils/constants/modalCodes';
import useModal from '../../hooks/useModal';
import AddTransactionModal from './AddTransactionModal';
import { TRANSACTIONS } from '../../utils/constants/transactions';

const MODALS = {
  [MODAL_CODES.ADD_EXPENSE]: {
    title: 'Añadir gasto',
    modal: <AddTransactionModal transactionType={TRANSACTIONS.EXPENSE} />,
  },
  [MODAL_CODES.ADD_INCOME]: {
    title: 'Añadir ingreso',
    modal: <AddTransactionModal transactionType={TRANSACTIONS.INCOME} />,
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
