import { useState } from 'react';

const useModals = () => {
  const [modals, setModals] = useState<{ [x: string]: boolean }>({});

  const openModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: true,
    }));
  };

  const closeModal = (modalName: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalName]: false,
    }));
  };

  const isModalOpen = (modalName: string) => {
    return modals[modalName] || false;
  };

  return { openModal, closeModal, isModalOpen };
};

export default useModals;
