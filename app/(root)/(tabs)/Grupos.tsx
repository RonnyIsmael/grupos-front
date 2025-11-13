import {
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  Switch,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../../context/authContext";
import { obtenerListadoGrupos } from "../../../services/GruposService";
import { UserCountGroup } from "../../../interfaces/GruposInterface";
import { StatusBar } from "expo-status-bar";
import CustomCardItem from "../../../components/CustomCardItem";
import { useFocusEffect, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const grupos = () => {
  const { user, isAuthenticated } = useAuth();
  const [data, setData] = useState<UserCountGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [soloMisGrupos, setSoloMisGrupos] = useState(false);
  const router = useRouter();

  const loadGrupos = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res: any = await obtenerListadoGrupos(user.id);
      let grupos: UserCountGroup[] = res.body;

      setData(grupos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user, isAuthenticated]);
  useFocusEffect(
    useCallback(() => {
      loadGrupos();
    }, [loadGrupos])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadGrupos();
  };
  const renderGroupItem = ({ item }: { item: UserCountGroup }) => (
    <View style={{ flex: 0.5 }}>
      <CustomCardItem
        id={item.id}
        name={item.name}
        userNumbers={item.userNumbers}
        avatar={item.avatar}
        sport={item.sport}
        owner={item.owner}
      />
    </View>
  );

  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar style="light" />
      <SafeAreaProvider className="flex-1">
        <View className="flex-row justify-between items-center my-2 px-2">
          <Text className="text-lg text-slate-50 font-bold">Mis grupos</Text>
          <Switch
            value={soloMisGrupos}
            onValueChange={setSoloMisGrupos}
            thumbColor={soloMisGrupos ? "#10b981" : "#f4f4f4"}
            trackColor={{ false: "#767577", true: "#34d399" }}
          />
        </View>
        {loading && !refreshing ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#ffffff" />
            <Text className="text-gray-200 mt-2">Cargando...</Text>
          </View>
        ) : (
          <FlatList
            data={
              soloMisGrupos
                ? data.filter((grupo) => grupo.owner === user?.id)
                : data
            }
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderGroupItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#ffffff"
              />
            }
            contentContainerClassName="pb-20"
          />
        )}
        <TouchableOpacity
          onPress={() => router.push("/(grupo)/nuevo")}
          style={{
            position: "absolute",
            bottom: 30,
            right: 20,
            backgroundColor: "#10b981",
            width: 60,
            height: 60,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
        >
          <MaterialIcons name="group-add" size={28} color="#ffffff" />
        </TouchableOpacity>
      </SafeAreaProvider>
    </View>
  );
};

export default grupos;
