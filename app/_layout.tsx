import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { useAuth, AuthContextProvider } from "../context/authContext";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
import * as NavigationBar from "expo-navigation-bar";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("rgb(15, 25, 42)");
    NavigationBar.setButtonStyleAsync("light");
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(tabs)";
    if (isAuthenticated && !inApp) {
      console.log("1");
      router.replace("Grupos");
    }
    if (!isAuthenticated) {
      console.log("2");
      router.replace("Auth/LogIn");
    }
  }, [isAuthenticated]);
  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout></MainLayout>
      </AuthContextProvider>
    </MenuProvider>
  );
}
