import { Text, View } from "react-native";
import { PrimaryButton } from "./primary.buttom";

import { useColor } from "@/theme/hooks/useColor";
import { IconSymbol } from "../icon-symbol";

export function AddPrimaryButton({
  text,
  onclick,
}: {
  text: string;
  onclick: () => void;
}) {
  const Colors = useColor();
  return (
    <PrimaryButton
      onPress={() => {
        onclick();
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: Colors.textButton, paddingInline: 10 }}>
          {text}
        </Text>
        <IconSymbol
          size={20}
          name="plus.circle.fill"
          color={Colors.textButton}
        />
      </View>
    </PrimaryButton>
  );
}
