import React from "react";
import { Modal } from "react-native";

export const SearchModal = () => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      ></Modal>
    </>
  );
};
