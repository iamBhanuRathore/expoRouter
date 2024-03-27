import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import { BottomModal } from "react-native-modals";
import { useModal } from "@/providers/modal-provider";
type Props = {};

const SongPlayerModal = (props: Props) => {
  const {
    closeModal,
    modalState: { isOpen, modalData, type },
  } = useModal();
  const isModalOpen = isOpen && type === "player-modal";
  console.log(isOpen, type);
  if (!isModalOpen) {
    return null;
  }
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isModalOpen}
      onRequestClose={closeModal}>
      <Pressable onPress={closeModal}>
        <Text>Hello</Text>
      </Pressable>
    </Modal>
  );
};

export default SongPlayerModal;
