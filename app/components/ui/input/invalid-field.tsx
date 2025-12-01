import { Text, View } from "react-native";
import { useColor } from "@/theme/hooks/useColor";

export function InvalidField({ message }: { message?: string }) {
  const color = useColor();
  return (
    <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
      {message && <Text style={{ color: color.error }}>{message} </Text>}
    </View>
  );
}
