import { useColor } from "@/theme/hooks/useColor";
import { StyleProp, TextInput, TextStyle } from "react-native";
import { useState, useEffect } from "react";
export function Input({
  error,
  width = 250,
  boxStyle,
  ...props
}: {
  width?: number;
  error?: string;
  boxStyle?: StyleProp<TextStyle>;
  [key: string]: any;
}) {
  const { text: textColor, primary, secondary, error: errorColor } = useColor();
  const defaultColor = error ? errorColor : secondary;
  const [borderColor, setBorderColor] = useState(defaultColor);
  return (
    <TextInput
      style={[
        {
          borderColor: borderColor,
          borderWidth: 1,
          padding: 10,
          borderRadius: 9,
          width: width,
          color: textColor,
          maxHeight: 50,
        },
        boxStyle,
      ]}
      placeholderTextColor={secondary}
      onFocus={(element) => {
        setBorderColor(primary);
      }}
      {...props}
      onBlur={(element) => {
        setBorderColor(defaultColor);
        props.onBlur && props.onBlur(element);
      }}
    />
  );
}
