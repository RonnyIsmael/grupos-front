import { getRequest } from "../hooks/api";

export const obtenerListadoGrupos = async (userId: number) => {
  return await getRequest(`users/groups/${userId}`);
};
