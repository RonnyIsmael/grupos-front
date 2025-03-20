import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomGroupItem from "../../../components/CustomGroupItem";
import { useEffect, useState } from "react";
import { obtenerListadoGrupos } from "../../../services/GruposService";
import { useAuth } from "../../../context/authContext";
import { UserCountGroup } from "../../../interfaces/GruposInterface";

const Grupos = () => {
  const { user, isAuthenticated } = useAuth(); // Obtener usuario del contexto

  const [data, setData] = useState<UserCountGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      console.log("Usuario no autenticado.");
      setLoading(false);
      return;
    }
    const loadGrupos = async () => {
      try {
        const res: any = await obtenerListadoGrupos(user.id);
        const grupos: UserCountGroup[] = res.body;
        console.log(grupos);
        setData(grupos);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadGrupos();
  }, []);

  return (
    <View className="flex-1 bg-slate-800">
      <StatusBar style="light" />
      <SafeAreaView className="flex-1 my-1">
        {loading ? (
          <View className="flex-1 justify-center align-middle">
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{ color: "white", marginTop: 10 }}>Cargando...</Text>
          </View>
        ) : error ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "red" }}>Error: {error}</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <CustomGroupItem
                name={item.name}
                avatar={item.avatar}
                userNumbers={item.userNumbers}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            className="flex-1 gap-4"
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Grupos;
