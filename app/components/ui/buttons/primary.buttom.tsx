import { useColor } from "@/theme/hooks/useColor";
import { Pressable, Text } from "react-native";
import { Keyboard } from "react-native";

export function PrimaryButton({
  children,
  onPress,
  ...props
}: {
  children: React.ReactNode;
  onPress: () => void;
  [key: string]: any;
}) {
  const { primary: colorPrimary, textButton: textColor, shadow } = useColor();
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
          backgroundColor: colorPrimary,
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
      {children}
    </Pressable>
  );
}
