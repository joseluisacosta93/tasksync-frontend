import { MainTitle } from "@/app/components/ui/titles/main-title";
import SignInForm from "@/app/module/sign-in/components/sign-in-form";
import { useColor } from "@/theme/hooks/useColor";
import { View } from "react-native";

export default function SignInScreen() {
  const backgroundColor = useColor().background;
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
      }}
    >
      <MainTitle text="Iniciar Sesion" />
      <SignInForm />
    </View>
  );
}
