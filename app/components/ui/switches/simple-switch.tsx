import { useColor } from "@/theme/hooks/useColor";
import { useEffect, useState } from "react";
import { StyleProp, Switch, View, ViewStyle } from "react-native";

export function SimpleSwitch({
  boxStyle,
  onChange,
  value,
}: {
  boxStyle?: StyleProp<ViewStyle>;
  onChange?: (value: boolean) => void;
  value?: boolean;
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const color = useColor();
  useEffect(() => {
    if (!value) return;
    setIsEnabled(value);
  }, [value]);
  const handleChange = () => {
    onChange && onChange(!isEnabled);
    toggleSwitch();
  };
  return (
    <View style={[boxStyle]}>
      <Switch
        onValueChange={handleChange}
        thumbColor={isEnabled ? color.primary : color.inputDisabled}
        value={isEnabled}
      />
    </View>
  );
}
