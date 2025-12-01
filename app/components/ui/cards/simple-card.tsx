import { useColor } from "@/theme/hooks/useColor";
import { View } from "react-native";

export function SimpleCard({
  children,
  maxHeight,
}: {
  children: React.ReactNode;
  maxHeight?: number;
}) {
  const color = useColor();
  return (
    <View
      style={{
        padding: 10,
        flexDirection: "column",
        backgroundColor: color.card,
        borderRadius: 15,
        boxShadow: `0px 8px 10px  ${color.shadow}`,
        maxHeight: maxHeight ? maxHeight : "auto",
      }}
    >
      {children}
    </View>
  );
}
