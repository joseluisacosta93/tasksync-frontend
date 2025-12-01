import { router } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { useSession } from "./session.provider";

export function NoLoggedRoute({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useSession();
  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return <>{children}</>;
}
