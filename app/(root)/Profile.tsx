import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function Profile() {
  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#1e293b",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>Perfil de Usuario</Text>
      </View>
    </>
  );
}
