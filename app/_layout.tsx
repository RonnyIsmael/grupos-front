import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { useAuth, AuthContextProvider } from "../context/authContext";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated or not
    console.log("Se comprueba sesión");
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      console.log("1");
      router.replace("Grupos");
    }
    if (!isAuthenticated) {
      console.log("2");
      router.replace("LogIn");
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
