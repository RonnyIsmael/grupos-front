import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "../utils/config";

const CLOUD_NAME = Constants.expoConfig?.extra?.CLOUDINARY_CLOUD_NAME;

/** Handler global para 401/403 (p.ej. logout + redirect) */
let onUnauthorized: null | (() => void) = null;
export const setOnUnauthorized = (fn: () => void) => {
  onUnauthorized = fn;
};

/** Construye headers comunes, añade Authorization si hay token guardado */
async function buildHeaders(extra?: Record<string, string>) {
  const token = await SecureStore.getItemAsync("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(extra || {}),
  };
}

/** Manejo común de respuestas */
async function handleResponse(res: Response) {
  if (res.status === 401 || res.status === 403) {
    onUnauthorized?.();
  }
  if (!res.ok) {
    let detail = "";
    try {
      const txt = await res.text();
      detail = txt?.slice(0, 300) || "";
    } catch {}
    throw new Error(`Error HTTP: ${res.status} ${res.statusText} ${detail}`);
  }
  // devuelve JSON (o vacío si no hay)
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/** GET: endpoint relativo a API_URL */
export async function getRequest(
  endpoint: string,
  params: Record<string, any> = {},
  headers: Record<string, string> = {}
) {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
    )
  ).toString();

  const url = `${API_URL}/${endpoint}${queryString ? `?${queryString}` : ""}`;
  console.log("GET:", url);

  const res = await fetch(url, {
    method: "GET",
    headers: await buildHeaders(headers),
  });

  return handleResponse(res);
}

/** POST: puedes pasar endpoint (se pegará a API_URL) o URL absoluta */
export async function postRequest(
  endpointOrUrl: string | URL | Request,
  data?: any,
  headers: Record<string, string> = {}
) {
  // Normaliza endpoint relativo -> absoluto
  const isAbsolute =
    typeof endpointOrUrl === "string" &&
    /^(http|https):\/\//i.test(endpointOrUrl);
  const url =
    typeof endpointOrUrl === "string" && !isAbsolute
      ? `${API_URL}/${endpointOrUrl}`
      : endpointOrUrl;

  // Si data ya es string, úsala; si es objeto, serialízalo
  const body =
    typeof data === "string"
      ? data
      : data != null
      ? JSON.stringify(data)
      : undefined;

  console.log("POST:", url);

  const res = await fetch(url as any, {
    method: "POST",
    credentials: "include",
    headers: await buildHeaders(headers),
    body,
  });

  return handleResponse(res);
}

/** Upload a Cloudinary */
export async function postImage(formData: any) {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  return handleResponse(res);
}
