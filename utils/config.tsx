import Constants from "expo-constants";

// Definir la URL base según el entorno
export const API_URL =
  Constants.expoConfig?.extra?.env === "PROD"
    ? process.env.API_URL_PROD
    : process.env.API_URL;
