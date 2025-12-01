import { useColor } from "@/theme/hooks/useColor";
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from "react-native";

export function SecundaryButton({
  title,
  onPress,
  textStyle,
  buttonColor,
  style,
  ...props
}: {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  [key: string]: any;
}) {
  const color = useColor();
  return (
    <Pressable
      style={[
        {
          backgroundColor: "transparent",
          borderColor: buttonColor ? buttonColor : color.primary,
          borderWidth: 1,
          borderStyle: "dashed",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          {
            color: buttonColor ? buttonColor : color.primary,
            fontSize: 15,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
