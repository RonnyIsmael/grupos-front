import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { postImage } from "../../../hooks/api";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addGroup,
  addUsersToGroup,
  obtenerFriendsyid,
} from "../../../services/GruposService";
import { useAuth } from "../../../context/authContext";
import { UserItem } from "../../../interfaces/UserInterface";
import Loading from "../../../components/Loading";
import { AddGroupResponse } from "../../../interfaces/GruposInterface";
import { Image } from "expo-image";
import { blurhash } from "../../../utils/commons";

const UPLOAD_PRESET = Constants.expoConfig?.extra?.CLOUDINARY_UPLOAD_PRESET;

const MAX_SIZE_MB = 5;
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

const Nuevo = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [fase, setFase] = useState("crearGrupo");
  const [image, setImage] = useState<string | null>(null);
  const [localUri, setLocalUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<number[]>(
    []
  );
  const [newGroup, setNewGroup] = useState<number>();
  const [friends, setFriends] = useState<UserItem[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const nombreGrupoRef = useRef(nombreGrupo);
  const localUriRef = useRef(localUri);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nombreGrupoRef.current = nombreGrupo;
  }, [nombreGrupo]);

  useEffect(() => {
    localUriRef.current = localUri;
  }, [localUri]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const { uri, fileSize, width, height } = asset as any;

      if ((fileSize || 0) / (1024 * 1024) > MAX_SIZE_MB) {
        return Alert.alert("Error", "La imagen es demasiado pesada.");
      }

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        return Alert.alert(
          "Error",
          `Dimensiones máximas: ${MAX_WIDTH}x${MAX_HEIGHT}`
        );
      }
      setLocalUri(uri);
    }
  };

  const uploadToCloudinary = async () => {
    const currentUri = localUriRef.current;
    const currentNombre = nombreGrupoRef.current;
    if (!currentUri || !currentNombre) {
      return Alert.alert(
        "Error",
        "Por favor selecciona una imagen y añade un nombre."
      );
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("file", {
      uri: currentUri,
      type: "image/jpeg",
      name: `${currentNombre}-group.jpg`,
    } as any);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const data = await postImage(formData);
      const url = data.secure_url;
      setImage(url);
      const response = await addGroup({
        name: currentNombre,
        avatar: url,
        owner: user?.id,
        sport_id: 1,
      });
      if (!response.succes) {
        console.log("Error al crear grupo: " + response.msg);
        Alert.alert("No se pudo crear el grupo. Inténtelo más tarde.");
        return;
      }
      const res: AddGroupResponse = response.body;
      setNewGroup(res.id);
      Alert.alert(
        "Grupo creado con exito. Ahora ya puedes agregar miembros si lo deseas."
      );
      setFase("agregarUsuarios");
      getUserFriends(user?.id);
    } catch (error: any) {
      Alert.alert("No se pudo subir la imagen. Inténtelo más tarde.");
    } finally {
      setUploading(false);
    }
  };

  const getUserFriends = async (id: any) => {
    setLoading(true);
    try {
      const response: any = await obtenerFriendsyid(id);
      if (!response.succes) {
        console.log("Error al obtner amigos: " + response.msg);
        return;
      }
      let userFriends: UserItem[] = response.body;
      setFriends(userFriends);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error al obtener amigos", error);
    }
  };
  const handleGuardarUsuarios = async () => {
    // Aquí llamas a tu endpoint para guardar los usuarios seleccionados

    try {
      const response: any = await addUsersToGroup({
        group_id: newGroup,
        users: usuariosSeleccionados,
      });
      if (!response.succes) {
        console.log("Error al agregar usuarios al grupo");
      }
      Alert.alert("Éxito", "Se han agregado usuarios a tu nuevo grupo", [
        {
          text: "Aceptar",
          onPress: () => {
            router.replace("Grupos");
          },
        },
      ]);
    } catch (error) {}
  };

  const toggleSeleccionUsuario = (id: number) => {
    setUsuariosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
    console.log(usuariosSeleccionados);
  };

  if (fase === "crearGrupo") {
    return (
      <View className="flex-1 bg-slate-900 p-4">
        <ScrollView className="flex-1">
          <Pressable
            className="border-white active:bg-slate-800 px-4 py-3 rounded-xl mb-4 items-center border"
            onPress={pickImage}
          >
            <Text className="text-white text-lg font-semibold">
              Seleccionar imagen
            </Text>
          </Pressable>

          {localUri && (
            <View className="items-center mb-4">
              <Image
                source={{ uri: localUri }}
                style={{ height: hp(20), aspectRatio: 1, borderRadius: 12 }}
                placeholder={blurhash}
                transition={250}
              />
            </View>
          )}

          <TextInput
            placeholder="Nombre del grupo"
            placeholderTextColor="#9ca3af"
            value={nombreGrupo}
            onChangeText={setNombreGrupo}
            className="text-white border-b border-gray-600 p-2 mb-4 text-lg"
          />
        </ScrollView>

        <View className="flex-row justify-between mb-4">
          <Pressable
            onPress={() => router.back()}
            className="border border-white active:bg-slate-800 px-8 py-3 rounded-xl items-center flex-1 mr-2"
            style={{ height: hp(5.6) }}
          >
            <Text className="text-white font-semibold">Cancelar</Text>
          </Pressable>

          <Pressable
            onPress={uploadToCloudinary}
            className="border border-white active:bg-slate-800 px-8 py-3 rounded-xl items-center justify-center flex-1 ml-2"
            disabled={uploading}
            style={{ height: hp(5.6) }}
          >
            {uploading ? (
              <View className="flex-row ">
                <Loading />
              </View>
            ) : (
              <Text className="text-white font-semibold">Continuar</Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  if (fase === "agregarUsuarios") {
    return (
      <View className="flex-1 bg-slate-900 p-4">
        <TextInput
          placeholder="Buscar amigos..."
          placeholderTextColor="#aaa"
          className="text-white border border-slate-700 rounded-lg p-3 mb-4"
          value={busqueda}
          onChangeText={setBusqueda}
        />
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#ffffff" />
            <Text className="text-gray-200 mt-2">Cargando...</Text>
          </View>
        ) : (
          <FlatList
            data={friends.filter((a) =>
              a.user_name.toLowerCase().includes(busqueda.toLowerCase())
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                className="flex-row items-center justify-between py-2"
                onPress={() => toggleSeleccionUsuario(item.id)}
              >
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: item.avatar }}
                    style={{ height: hp(7), aspectRatio: 1, borderRadius: 100 }}
                    placeholder={blurhash}
                    transition={250}
                  />
                  <Text className="text-white ml-4">{item.user_name}</Text>
                </View>
                {usuariosSeleccionados.includes(item.id) ? (
                  <MaterialCommunityIcons
                    name="sticker-check"
                    size={25}
                    color="#10b981"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="sticker-check-outline"
                    size={25}
                    color="#10b981"
                  />
                )}
              </Pressable>
            )}
          />
        )}
        <View className="flex-row justify-between mb-4">
          <Pressable
            onPress={() => router.back()}
            className="border border-white active:bg-slate-800 px-8 py-3 rounded-xl items-center flex-1 mr-2"
            style={{ height: hp(5.6) }}
          >
            <Text className="text-white font-semibold">Cancelar</Text>
          </Pressable>

          <Pressable
            onPress={handleGuardarUsuarios}
            className="border border-white active:bg-slate-800 px-8 py-3 rounded-xl justify-center items-center flex-1 ml-2"
            disabled={uploading}
            style={{ height: hp(5.6) }}
          >
            {uploading ? (
              <View className="flex-row ">
                <Loading />
              </View>
            ) : (
              <Text className="text-white font-semibold">Finalizar</Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  return null;
};

export default Nuevo;
