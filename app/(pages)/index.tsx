import { router } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { useSession } from "../module/auth/session.provider";

export default function Index() {
  const { session, isLoading } = useSession();
  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
    if (!session) {
      router.replace("/sign-in");
    }
  }, [isLoading, session]);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
}
