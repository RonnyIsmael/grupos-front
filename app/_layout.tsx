import {
  Slot,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import "../global.css";
import { MenuProvider } from "react-native-popup-menu";
import { AuthContextProvider, useAuth } from "@/context/authContext";
import AuthRedirector from "@/components/AuthRedirector";
import { useEffect, useRef } from "react";
import { setOnUnauthorized } from "@/hooks/api";
import { Alert } from "react-native";

function UnauthorizedBinder() {
  const { logout, setIsAuthenticated } = useAuth() as any;
  const router = useRouter();
  const nav = useRootNavigationState();
  const segments = useSegments();

  const routerRef = useRef(router);
  const segmentsRef = useRef(segments);

  useEffect(() => {
    routerRef.current = router;
    segmentsRef.current = segments;
  }, [router, segments]);

  useEffect(() => {
    // cuando la API devuelva 401, forzamos logout y
    // el AuthRedirector nos llevará al login
    const showingAlertRef = { current: false };

    setOnUnauthorized(async () => {
      if (showingAlertRef.current) return;
      showingAlertRef.current = true;

      try {
        await logout();
      } catch {}
      setIsAuthenticated(false);
      const currentSegments = segmentsRef.current;
      const currentRouter = routerRef.current;
      if (nav?.key && currentSegments[0] !== "(auth)") {
        Alert.alert(
          "Sesión caducada",
          "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          [
            {
              text: "Aceptar",
              onPress: () => {
                currentRouter.replace("/(auth)/logIn");
                setTimeout(() => {
                  showingAlertRef.current = false;
                }, 1000);
              },
            },
          ]
        );
      } else {
        showingAlertRef.current = false;
      }
    });
  }, [logout, setIsAuthenticated]);

  return null;
}

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        {/* Vinculamos el handler 401 y montamos el watcher */}
        <UnauthorizedBinder />
        <AuthRedirector />
        <Slot />
      </AuthContextProvider>
    </MenuProvider>
  );
}
