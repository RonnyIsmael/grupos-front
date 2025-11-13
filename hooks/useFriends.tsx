// hooks/useFriends.ts
import { UserItem } from "@/interfaces/UserInterface";
import { obtenerFriendsyid } from "@/services/GruposService";
import { useCallback, useEffect, useState } from "react";

type Response = {
  succes: boolean;
  msg?: string;
  body?: UserItem[];
};

async function getUserFriends(
  id: number,
  setFriends: (items: UserItem[]) => void,
  setLoading: (v: boolean) => void
) {
  setLoading(true);
  try {
    const response: Response = await obtenerFriendsyid(id);
    if (!response?.succes) {
      console.log("Error al obtener amigos:", response?.msg ?? "desconocido");
      setFriends([]);
      return;
    }
    const list = Array.isArray(response.body) ? response.body : [];
    const dedup = Array.from(
      new Map(list.map((u) => [String(u.id), u])).values()
    );
    setFriends(dedup);
  } catch (e) {
    console.log("Error al obtener amigos", e);
    setFriends([]);
  } finally {
    setLoading(false);
  }
}

export function useFriends(userId?: number) {
  const [friends, setFriends] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = useCallback(async () => {
    if (userId == null) return;
    await getUserFriends(userId, setFriends, setLoading);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { friends, loading, refresh, setFriends, setLoading };
}
