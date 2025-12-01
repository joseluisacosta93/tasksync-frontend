import { useColor } from "@/theme/hooks/useColor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SessionProvider } from "../module/auth/session.provider";

export default function RootLayout() {
  const color = useColor();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: color.background,
            },
            headerTintColor: color.text,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider>
    </QueryClientProvider>
  );
}
