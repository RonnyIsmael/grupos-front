// app/index.tsx
import { Redirect, useRootNavigationState } from "expo-router";
import { useAuth } from "../context/authContext";
// Importa la pantalla de carga para mostrarla sin navegar
import LoadApp from "./(auth)/loadApp";

export default function Index() {
  const navState = useRootNavigationState();
  const { isAuthenticated, isLoading } = useAuth();

  if (!navState?.key) return null;

  if (isLoading || typeof isAuthenticated === "undefined") {
    return <LoadApp />;
  }

  // Terminado: redirige según sesión
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/grupos" />;
  }
  return <Redirect href="/(auth)/logIn" />;
}
