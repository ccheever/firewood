import { ComposePost } from "@/components/ComposePlugin";
import { useCompose } from "@/state/compose";
import { Button, Modal, View } from "react-native";

export const Compose = () => {
  const { open, closeCompose } = useCompose();
  return (
    <Modal
      visible={open}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={closeCompose}
    >
      <ComposePost />
    </Modal>
  );
};
