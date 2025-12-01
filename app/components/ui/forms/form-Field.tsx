import { useColor } from "@/theme/hooks/useColor";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface FormFieldProps {
  children: React.ReactNode;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  error?: string;
  errorStyle?: StyleProp<TextStyle>;
}

export function FormField({
  children,
  label,
  labelStyle,
  style,
  error,
  errorStyle,
}: FormFieldProps) {
  const color = useColor();
  return (
    <View style={style}>
      <Text style={[{ color: color.text }, labelStyle]}>{label}:</Text>
      <View>
        {children}
        <Text style={[{ color: color.error }, errorStyle]}>{error}</Text>
      </View>
    </View>
  );
}
