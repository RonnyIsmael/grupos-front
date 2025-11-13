import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }} // Desactivar cabecera superior para tabs
      />
      <Stack.Screen
        name="(grupo)/[id]"
        options={{
          presentation: "modal",
          headerTitle: "",
          animation: "ios_from_left",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="(grupo)/[id]/editarUsuarios"
        options={{
          presentation: "modal",
          headerTitle: "",
          animation: "ios_from_left",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="(grupo)/nuevo"
        options={{
          headerLeft: () => null,
          headerBackVisible: false, // <-- Añadir esto
          gestureEnabled: false,
          presentation: "modal",
          headerTitle: "Creación de grupo",
          animation: "ios_from_left",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#0f172a" },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
