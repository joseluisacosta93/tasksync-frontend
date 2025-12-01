import { MainButton } from "@/app/components/ui/buttons/main-button";
import { useSession } from "@/app/module/auth/session.provider";
import { useColor } from "@/theme/hooks/useColor";
import { View } from "react-native";

export default function TabTwoScreen() {
  const { signOut } = useSession();
  const color = useColor();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color.background,
      }}
    >
      <MainButton
        title="Cerrar Session"
        onPress={signOut}
        color={"#fb2c36"}
      ></MainButton>
    </View>
  );
}
