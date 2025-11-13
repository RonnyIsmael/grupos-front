import { UserItem } from "@/interfaces/UserInterface";
import { obtenerUsuariosGrupo } from "@/services/GruposService";
import { useCallback, useEffect, useState } from "react";

type Response = {
  succes: boolean;
  msg?: string;
  body?: UserItem[];
};

async function getMembersGroup(
  id: number,
  setMembers: (items: UserItem[]) => void,
  setLoading: (v: boolean) => void
) {
  setLoading(true);
  try {
    const response: Response = await obtenerUsuariosGrupo(id);
    if (!response?.succes) {
      console.log("Error al obtener miembros:", response?.msg ?? "desconocido");
      setMembers([]);
      return;
    }
    const list = Array.isArray(response.body) ? response.body : [];
    const dedup = Array.from(
      new Map(list.map((u) => [String(u.id), u])).values()
    );
    setMembers(dedup);
  } catch (e) {
    console.log("Error al obtener miembros", e);
    setMembers([]);
  } finally {
    setLoading(false);
  }
}

export function useMembersGroup(userId?: number) {
  const [members, setMembers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = useCallback(async () => {
    if (userId == null) return;
    await getMembersGroup(userId, setMembers, setLoading);
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { members, loading, refresh, setMembers, setLoading };
}
