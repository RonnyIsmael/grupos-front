import { FontAwesome5 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";

import { blurhash } from "../../utils/commons";

export default function Profile() {
  const { logout, user } = useAuth();
  useEffect(() => {
    console.log(user);
  });

  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          animation: "ios_from_right",
          headerTitle: "Perfil",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "rgb(15 23 42)" }, // slate-900 en formato RGB
          headerTintColor: "#fff", // color del texto y back button en blanco para contraste
        }}
      />
      <View className="flex-1 bg-slate-900 items-center justify-center px-4">
        <View className="bg-slate-800 rounded-2xl w-full items-center p-6 shadow-lg">
          <Image
            style={{ height: hp(6.3), aspectRatio: 1, borderRadius: 100 }}
            source={{ uri: user?.avatar }}
            placeholder={blurhash}
            transition={250}
          />
          <Text className="text-xl text-gray-200 font-semibold mt-4">
            {user?.user_name || "Usuario"}
          </Text>

          <Pressable
            onPress={logout}
            className="bg-red-500 mt-6 py-3 px-6 rounded-xl"
          >
            <Text className="text-white font-semibold">Cerrar sesión</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
