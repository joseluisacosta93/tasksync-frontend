import { router } from "expo-router";
import { useEffect } from "react";
import { useSession } from "./session.provider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session]);

  return <> {children}</>;
}
