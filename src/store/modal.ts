import { create } from 'zustand';

export type ModalCode = string | null;

interface ModalState {
  modalCode: ModalCode;
  showModal: (modalCode: ModalCode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalCode: null,
  showModal: (modalCode) => {
    set({ modalCode });
  },
  closeModal: () => {
    set({ modalCode: null });
  },
}));
