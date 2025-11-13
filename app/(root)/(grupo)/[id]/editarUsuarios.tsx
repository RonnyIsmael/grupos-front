import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import CustomSelectableUserList from "@/components/CustomSelectableUserList";
import { useMembersGroup } from "@/hooks/useMembersGroup";
import { useAuth } from "@/context/authContext";

const editarUsuarios = () => {
  const { user } = useAuth();
  const { members, loading } = useMembersGroup(user?.id);
  const [selected, setSelected] = useState<number[]>([]);

  const onToggle = useCallback(
    (id: number) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
      console.log(selected);
    },
    [selected]
  );
  return (
    <View className="flex-1 bg-slate-900 p-4">
      <CustomSelectableUserList
        data={members}
        loading={loading}
        getId={(f) => f.id}
        getTitle={(f) => f.user_name}
        getAvatar={(f) => f.avatar}
        selectedIds={selected}
        onToggle={(id) => onToggle(id as number)}
        placeholder="Buscar amigos..."
        iconSelectedName="delete-circle"
        iconUnselectedName="delete-circle-outline"
        iconColor="#ef4444"
        iconSize={30}
      />
      <TouchableOpacity
        disabled={selected.length === 0}
        className={`absolute bottom-9 w-24 h-9 rounded-full bg-red-500 
          justify-center items-center self-center
          ${selected.length === 0 ? "opacity-40" : "opacity-100"}`}
      >
        <View className="flex-row justify-center ">
          <Text className="text-lg font-bold text-slate-50">Eliminar</Text>
          {selected.length > 0 && (
            <Text className="text-lg font-bold text-slate-50 ml-2">
              {selected.length}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default editarUsuarios;
