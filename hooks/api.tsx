import { API_URL } from "../utils/config";

async function postRequest(url: string | URL | Request, data: string) {
  try {
    // Asegurarse de que jsonStr es un string JSON válido
    // Esto lanzará un error si jsonStr no es un JSON válido

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // Asegúrate de que el servidor sabe que esperas JSON
      },
      body: data,
      credentials: "include",
    });

    if (!response.ok) {
      // Lanzar un error con el estado y texto de respuesta para mejor debugging
      throw new Error(
        "Network response was not ok. Status: " +
          response.status +
          " " +
          response.statusText
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error; // Re-lanza el error para manejo externo si es necesario
  }
}

async function getRequest(
  endpoint: string,
  params: Record<string, any> = {},
  headers: Record<string, string> = {}
) {
  try {
    // Convertir `params` en una cadena de consulta (query string)
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/${endpoint}${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching:", url); // Debugging

    const response = await fetch(url, {
      method: "GET",
      credentials: "include", // Incluir cookies en la solicitud
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers, // Headers personalizados si se envían
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchData:", error);
    throw error;
  }
}

export { postRequest, getRequest };
