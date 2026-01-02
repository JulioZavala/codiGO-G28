const BASE_URL = "https://693b896f9b80ba7262cd9120.mockapi.io/users";

export async function getUsers() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      return {
        ok: false,
        message: "Error al intentar obtener los datos.",
      };
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: String(error),
    };
  }
}
