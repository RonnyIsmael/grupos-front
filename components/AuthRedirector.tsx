import { useEffect } from "react";
import { useRouter, useRootNavigationState, useSegments } from "expo-router";
import { useAuth } from "@/context/authContext";

export default function AuthRedirector() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const nav = useRootNavigationState();
  const segments = useSegments();

  useEffect(() => {
    if (!nav?.key) return;
    if (isLoading) return;
    const inAuth = segments[0] === "(auth)";

    if (isAuthenticated === false && !inAuth) {
      router.replace("/(auth)/logIn");
    }
  }, [isAuthenticated, isLoading, nav?.key, segments, router]);

  return null;
}
