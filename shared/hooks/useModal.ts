import { RefObject, useCallback, useEffect, useState } from 'react';

interface ModalState {
  isOpen: boolean;
}

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

type ModalHook = ModalState & ModalActions;

const useModal = (
  modalRef?: RefObject<HTMLDivElement>,
  initialState = false
): ModalHook => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);
  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;

      if (isOpen && modalRef?.current && !modalRef.current.contains(target)) {
        closeModal();
      }
    },
    [isOpen, closeModal, modalRef]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
