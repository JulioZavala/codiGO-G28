/**
 * Recursos
 * - products
 * - users
 */
const BASE_URL = "https://693b896f9b80ba7262cd9120.mockapi.io"

/**
 try {
   ...codigo
 } catch (error) {
  // retornarmos un objeto con el error
 }
 */

// export async function getProducts() {
//   const response = await fetch(`${BASE_URL}/productos`)
//   const data = await response.json()
//   return data
// }

// export async function getUsers() {
//   const response = await fetch(`${BASE_URL}/users`);
//   const data = await response.json();
//   return data;
// }


export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/productos`);

    // Si response.ok es igual a false, quiere decir de que el endpoint(url) respondio un ERROR
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

export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);

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



