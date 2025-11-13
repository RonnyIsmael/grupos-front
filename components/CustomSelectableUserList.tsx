import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Id = string | number;

export type SelectableListProps<T> = {
  data: T[];
  getId: (item: T) => Id;
  getTitle: (item: T) => string;
  getAvatar?: (item: T) => string | undefined;

  selectedIds: Id[];
  onToggle: (id: Id, item: T) => void;

  loading?: boolean;

  placeholder?: string;
  initialQuery?: string;
  filterFn?: (item: T, query: string) => boolean;

  iconSelectedName?: React.ComponentProps<
    typeof MaterialCommunityIcons
  >["name"];
  iconUnselectedName?: React.ComponentProps<
    typeof MaterialCommunityIcons
  >["name"];
  iconColor?: string;
  iconSize?: number;

  renderRightIcon?: (selected: boolean, item: T) => React.ReactNode;
  containerClassName?: string;
  itemClassName?: string;
};

export default function CustomSelectableUserList<T>({
  data,
  getId,
  getTitle,
  getAvatar,
  selectedIds,
  onToggle,
  loading = false,
  placeholder = "Buscar...",
  initialQuery = "",
  filterFn,
  iconSelectedName = "sticker-check",
  iconUnselectedName = "sticker-check-outline",
  iconColor = "#10b981",
  iconSize = 24,
  renderRightIcon,
  containerClassName = "",
  itemClassName = "",
}: SelectableListProps<T>) {
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    if (filterFn) return data.filter((item) => filterFn(item, q));
    return data.filter((item) => getTitle(item).toLowerCase().includes(q));
  }, [data, query, filterFn, getTitle]);

  if (loading) {
    return (
      <View
        className={`flex-1 items-center justify-center ${containerClassName}`}
      >
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-gray-200 mt-2">Cargando...</Text>
      </View>
    );
  }

  return (
    <View className={`${containerClassName}`}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        className="text-white border border-slate-700 rounded-lg p-3 mb-4"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(getId(item))}
        renderItem={({ item }) => {
          const id = getId(item);
          const selected = selectedIds.includes(id);
          const title = getTitle(item);
          const avatar = getAvatar?.(item);

          return (
            <Pressable
              className={`flex-row items-center justify-between py-2 ${itemClassName}`}
              onPress={() => onToggle(id, item)}
            >
              <View className="flex-row items-center">
                {avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={{ height: hp(7), aspectRatio: 1, borderRadius: 100 }}
                    transition={250}
                  />
                ) : (
                  <View
                    style={{ height: hp(7), aspectRatio: 1, borderRadius: 100 }}
                    className="bg-slate-700 items-center justify-center"
                  >
                    <MaterialCommunityIcons
                      name="account"
                      size={20}
                      color="#cbd5e1"
                    />
                  </View>
                )}
                <Text className="text-white ml-4">{title}</Text>
              </View>

              {renderRightIcon ? (
                renderRightIcon(selected, item)
              ) : (
                <MaterialCommunityIcons
                  name={selected ? iconSelectedName : iconUnselectedName}
                  size={iconSize}
                  color={iconColor}
                />
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
}
