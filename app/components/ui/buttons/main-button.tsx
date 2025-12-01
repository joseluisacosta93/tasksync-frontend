import { useColor } from "@/theme/hooks/useColor";
import { Keyboard, Pressable, Text } from "react-native";
import { SimpleLoading } from "../loading/simple-loadiing";

export function MainButton({
  title,
  onPress,
  color,
  isLoading,
  ...props
}: {
  title: string;
  color?: string;
  onPress: () => void;
  isLoading?: boolean;
  [key: string]: any;
}) {
  const { primary: colorPrimary, textButton: textColor, shadow } = useColor();
  const backgroundColor = color ? color : colorPrimary;
  if (isLoading) {
    return (
      <Pressable
        style={() => [
          {
            backgroundColor: backgroundColor,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        {...props}
      >
        <SimpleLoading size="small" />
      </Pressable>
    );
  }
  return (
    <Pressable
      style={({ pressed }) => [
        {
          boxShadow: pressed
            ? `0px 1px 2px ${shadow}`
            : `0px 2px 4px ${shadow}`,
        },
        props.disabled
          ? {
              opacity: 0.5,
            }
          : { opacity: pressed ? 0.9 : 1 },
        {
          backgroundColor: backgroundColor,
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
      onPress={() => {
        onPress();
        Keyboard.dismiss();
      }}
      {...props}
    >
      <Text style={{ color: textColor }}>{title}</Text>
    </Pressable>
  );
}
