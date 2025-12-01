import { Text, View } from "react-native";
import { Input } from "./input";
import { useColor } from "@/theme/hooks/useColor";

export function LabelInput({
  label,
  ...props
}: {
  label: string;
  [key: string]: any;
}) {
  const { text: textColor } = useColor();

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: textColor, paddingLeft: 10 }}>{label}</Text>
      <Input {...props} />
    </View>
  );
}
