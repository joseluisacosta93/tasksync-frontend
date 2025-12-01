import { useColor } from "@/theme/hooks/useColor";
import { ReactNode } from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";

export function ModalBottom({
  children,
  isVisible,
  onCloseModal,
}: {
  children: ReactNode;
  isVisible: boolean;
  onCloseModal: () => void;
}) {
  const color = useColor();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onCloseModal()}
    >
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
          alignItems: "center",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <TouchableWithoutFeedback onPress={() => onCloseModal()}>
          <View
            style={{
              padding: 20,
              borderRadius: 10,
              width: "100%",
              flex: 1,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: color.background,
            padding: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: "100%",
          }}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}
