import { MainButton } from "@/app/components/ui/buttons/main-button";
import { SimpleTitle } from "@/app/components/ui/text/simple-titl";
import { useColor } from "@/theme/hooks/useColor";
import { View } from "react-native";

export function DeleteModalContent({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const color = useColor();
  return (
    <View style={{ padding: 10 }}>
      <View style={{ paddingBlock: 10 }}>
        <SimpleTitle text="¿Estás seguro de eliminar esta tarea?"></SimpleTitle>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        <MainButton
          color={color.error}
          title="Eliminar"
          onPress={onConfirm}
        ></MainButton>
        <MainButton title="Cancelar" onPress={onCancel} />
      </View>
    </View>
  );
}
