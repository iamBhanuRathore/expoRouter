import React, { createContext, useContext, useState } from "react";

// Define the types for your modal data
type ModalDataType = {
  title?: string;
  content?: string;
  // Add any other properties specific to your modal data
};
type ModalType = "player-modal" | "other-modal";
// Define the type for your modal state
type ModalState = {
  isOpen: boolean;
  type: ModalType | null;
  modalData: ModalDataType | null;
};

// Define the type for your context value
type ModalContextValue = {
  modalState: ModalState;
  openModal: (type: ModalType, modalData?: ModalDataType) => void;
  closeModal: () => void;
};

// Create the context
const ModalContext = createContext<ModalContextValue | null>(null);

// Custom hook to consume the context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

// Provider component
const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    modalData: null,
    type: null,
  });

  // Function to open the modal
  const openModal = (type: ModalType, modalData: ModalDataType) => {
    setModalState({ isOpen: true, type, modalData });
  };

  // Function to close the modal
  const closeModal = () => {
    setModalState({ isOpen: false, modalData: null, type: null });
  };

  const value: ModalContextValue = {
    modalState,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
