import { IconSymbol } from "@/app/components/ui/icon-symbol";
import { useColor } from "@/theme/hooks/useColor";
import { Stack } from "expo-router";

export default function HomeLayout() {
  const color = useColor();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerTintColor: color.primary,
          headerStyle: {
            backgroundColor: color.background,
          },
          headerLeft: () => (
            <IconSymbol size={28} name="house.fill" color={color.primary} />
          ),
        }}
      />
    </Stack>
  );
}
