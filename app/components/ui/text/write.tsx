import { useColor } from "@/theme/hooks/useColor";
import { StyleProp, Text, TextStyle } from "react-native";

export function Write({
  text,
  fontSize = 16,
  style,
  ...props
}: {
  text: string;
  fontSize?: number;
  style?: StyleProp<TextStyle>;
  [key: string]: any;
}) {
  const color = useColor();
  return (
    <Text style={[{ color: color.text, fontSize }, style]} {...props}>
      {text}
    </Text>
  );
}
