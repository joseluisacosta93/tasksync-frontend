import { useColor } from "@/theme/hooks/useColor";
import { ActivityIndicator } from "react-native";

export function SimpleLoading({
  size = "large",
}: {
  size?: "small" | "large";
}) {
  const { text: textColor } = useColor();
  return <ActivityIndicator size={size} color={textColor} />;
}
