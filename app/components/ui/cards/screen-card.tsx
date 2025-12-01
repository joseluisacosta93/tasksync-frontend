import { useColor } from "@/theme/hooks/useColor";
import { View } from "react-native";

export function ScreenCard({ children }: { children: React.ReactNode }) {
  const color = useColor();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.card,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 25,
        paddingInline: 15,
      }}
    >
      {children}
    </View>
  );
}
