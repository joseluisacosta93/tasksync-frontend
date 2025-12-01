import { NoLoggedRoute } from "@/app/module/auth/no-logged-route";
import { Stack } from "expo-router";

export default function SignInLayout() {
  return (
    <NoLoggedRoute>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </NoLoggedRoute>
  );
}
