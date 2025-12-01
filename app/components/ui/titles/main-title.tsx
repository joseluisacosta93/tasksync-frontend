import { useColor } from "@/theme/hooks/useColor";
import { Text } from "react-native";

export function MainTitle({ text }: { text?: string }) {
  const colorPrimary = useColor().primary;
  return (
    <Text style={{ fontSize: 30, fontWeight: "bold", color: colorPrimary }}>
      {text}
    </Text>
  );
}
