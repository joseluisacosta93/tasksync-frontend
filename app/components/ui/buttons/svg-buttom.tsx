import { Pressable, StyleProp } from "react-native";
import { PressableProps } from "react-native-gesture-handler";

export function SvgButton({
  children,
  disabled = false,
  onPress,
  style,
  ...props
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onPress: () => void;
  style?: StyleProp<PressableProps>;
}) {
  return (
    <Pressable
      style={[
        {
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
      onPress={() => {
        onPress();
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </Pressable>
  );
}
