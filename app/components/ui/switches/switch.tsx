import { useColor } from "@/theme/hooks/useColor";
import { useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

interface ISwitchProps {
  onChange: (value: string) => void;
  value?: string;
  size?: number;
  options: {
    label: string;
    value: string;
  }[];
}

export function Switch({ onChange, options, size = 30, value }: ISwitchProps) {
  const [selectedOption, setSelectedOption] = useState(value);
  const color = useColor();

  const getColor = (option: string, defaultColor: string) => {
    if (option === selectedOption) {
      return color.primary;
    }
    return defaultColor;
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {options &&
        options.map((option, index) => {
          return (
            <TouchableWithoutFeedback
              style={{ flex: 1 / options.length + 1 }}
              key={index}
              onPress={() => {
                setSelectedOption(option.value);
                onChange(option.value);
              }}
            >
              <View key={index} style={{ flex: 1 / options.length + 1 }}>
                <Text
                  key={index}
                  style={{
                    fontSize: size,
                    color: getColor(option.value, color.text),
                    textAlign: "center",
                    paddingBlock: size / 5,
                  }}
                >
                  {option.label}
                </Text>

                <View
                  style={{
                    height: size / 3,
                    backgroundColor: getColor(option.value, color.background),
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
    </View>
  );
}
