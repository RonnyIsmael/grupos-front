import { getRequest, postRequest } from "../hooks/api";
import { API_URL } from "../utils/config";

export const obtenerListadoGrupos = async (userId: number) => {
  return await getRequest(`users/groups/${userId}`);
};

export const obtenerGrupoByid = async (id: number) => {
  return await getRequest(`groups/${id}`);
};

export const addGroup = async (params: any) => {
  return await postRequest(`${API_URL}/groups/add`, JSON.stringify(params));
};

export const obtenerFriendsyid = async (id: number) => {
  return await getRequest(`users/friends/${id}`);
};

export const addUsersToGroup = async (params: any) => {
  return await postRequest(
    `${API_URL}/groups/add/users`,
    JSON.stringify(params)
  );
};
