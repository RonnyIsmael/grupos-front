import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { obtenerGrupoByid } from "../../../services/GruposService";
import { Image } from "expo-image";
import { blurhash } from "../../../utils/commons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome5 } from "@expo/vector-icons";

const DetalleGrupo = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [grupo, setGrupo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarGrupo = async () => {
      try {
        const res: any = await obtenerGrupoByid(Number(id));
        setGrupo(res.body);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    cargarGrupo();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 bg-slate-900 justify-center items-center">
        <ActivityIndicator color="#ffffff" size="large" />
        <Text className="text-gray-200 mt-4">Cargando grupo...</Text>
      </View>
    );
  }

  if (!grupo) {
    return (
      <View className="flex-1 bg-slate-900 justify-center items-center">
        <Text className="text-red-500">
          No se pudo cargar la información del grupo.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-900 pt-3">
      <View className="flex-1 items-center mb-3">
        <Image
          style={{
            width: "100%",
            height: hp(16),
            aspectRatio: 1,
            borderRadius: 12,
            marginBottom: 6,
            borderWidth: 1,
            borderColor: "rgb(30 41 59)",
          }}
          source={{
            uri: grupo.avatar,
          }}
          placeholder={blurhash}
          transition={250}
        />

        <Text className="text-2xl text-white font-bold text-center">
          {grupo.name}
        </Text>
        <Text className="text-gray-300">{grupo.sport}</Text>
      </View>

      <View className="flex-row justify-around px-10 my-4">
        <Pressable
          className="items-center"
          onPress={() => router.push(`/(grupo)/${id}/editarUsuarios`)}
        >
          <FontAwesome5 name="user-edit" size={24} color="#ffffff" />
          <Text className="text-gray-300 mt-1">Miembros</Text>
        </Pressable>

        <Pressable
          className="items-center"
          onPress={() => router.push(`/(grupo)/${id}/iniciarJuego`)}
        >
          <FontAwesome5 name="play-circle" size={24} color="#ffffff" />
          <Text className="text-gray-300 mt-1">Juego</Text>
        </Pressable>

        <Pressable
          className="items-center"
          onPress={() => router.push(`/(grupo)/${id}/editarInfo`)}
        >
          <FontAwesome5 name="edit" size={24} color="#ffffff" />
          <Text className="text-gray-300 mt-1">Editar</Text>
        </Pressable>
      </View>

      <View className="flex-1 px-4 mt-4">
        <Text className="text-xl text-white font-bold mb-3">
          Actividad reciente
        </Text>
        <View className="bg-slate-800 rounded-xl p-4">
          <Text className="text-gray-300">
            Aquí aparecerán los juegos recientes y comunicados del admin.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetalleGrupo;
