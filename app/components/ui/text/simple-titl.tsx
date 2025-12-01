import { useColor } from "@/theme/hooks/useColor";
import { StyleProp, Text, TextStyle } from "react-native";

export function SimpleTitle({
  text,
  color,
  style,
}: {
  text: string;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  const textColor: string = color || useColor().text;
  return (
    <Text
      style={[
        {
          fontSize: 25,
          color: textColor,
          fontWeight: "bold",
          textAlign: "center",
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
}
