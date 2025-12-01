import { useColor } from "@/theme/hooks/useColor";
import { useState } from "react";
import { TextInput } from "react-native";

export const MoneyInput = ({
  value,
  onChange,
  error,
  defaultValue = 0,
  width = 130,
}: {
  defaultValue?: number;
  value?: number;
  onChange: (value: string) => void;
  error?: string;
  width?: number;
}) => {
  const color = useColor();
  const [amount, setAmount] = useState(
    getFomatedAmount(defaultValue.toString())
  );

  const getValue = () => {
    if (value === undefined) {
      return getFomatedAmount(amount);
    }

    return getFomatedAmount(value?.toFixed(2).toString());
  };

  return (
    <TextInput
      style={{
        height: 45,
        minWidth: 130,
        borderColor: error ? color.error : color.secondary,
        borderWidth: 1,
        backgroundColor: color.background,
        color: color.text,
        borderRadius: 10,
        textAlign: "right",
        fontSize: 18,
        width: width,
      }}
      placeholder="Monto"
      keyboardType="numeric"
      onChangeText={(value) => {
        const numericValue = getNumericValue(value);
        onChange(numericValue);
        setAmount(numericValue);
      }}
      value={getValue()}
    />
  );
};

const cleanNumber = (amount: string) => {
  return amount.replace(/\D/g, "");
};

const getFomatedAmount = (amount: string) => {
  const cleanAmount = cleanNumber(amount);
  const decimalPart = cleanAmount.slice(-2);
  const integerPart = cleanAmount.slice(0, -2);
  let formatedIntegerPart = "0";
  let formatedDecimalPart = "00" + decimalPart;
  if (integerPart?.length > 0) {
    const value =
      integerPart?.length > 12 ? integerPart.slice(0, 12) : integerPart;
    formatedIntegerPart = value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  if (integerPart?.length > 0) {
  }

  return formatedIntegerPart + "," + formatedDecimalPart.slice(-2);
};

const getNumericValue = (amount: string) => {
  const value = Number(cleanNumber(amount)) / 100;
  return value.toFixed(2);
};
