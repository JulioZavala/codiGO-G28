import api from "../api/axios";

// const BASE_URL = "https://693b896f9b80ba7262cd9120.mockapi.io/users";

// export async function getUsers() {
//   try {
//     const response = await fetch(BASE_URL);

//     if (!response.ok) {
//       return {
//         ok: false,
//         message: "Error al intentar obtener los datos.",
//       };
//     }

//     const data = await response.json();
//     return { ok: true, data };
//   } catch (error) {
//     return {
//       ok: false,
//       message: String(error),
//     };
//   }
// }

export const loginService = async (email, password) => {
  // Al usar withCredentials en axiosConfig, las cookies HttpOnly
  // se guardan automáticamente en el navegador tras el 200 OK.
  const response = await api.post("auth/login/", { email, password });

  // Retornamos solo el objeto 'user' que ya trae 'is_verified'
  return response.data.user;
};

export const registerService = async (email, password1, password2) => {
  // Al usar withCredentials en axiosConfig, las cookies HttpOnly
  // se guardan automáticamente en el navegador tras el 200 OK.
  const response = await api.post("auth/registration/", { email, password1, password2 });

  // Retornamos solo el objeto 'user' que ya trae 'is_verified'
  return response.data.user;
};


// Servicio de Logout
export const logoutService = async () => {
  // Incluso si el backend falla, el front debe limpiar la sesión
  try {
    await api.post("auth/logout/");
  } catch (error) {
    // Si da 403 o falla el servidor, lo ignoramos.
    // Lo importante es que el estado local se limpie.
    console.warn(
      "Logout en servidor falló o bloqueado por CSRF, procediendo con limpieza local.",
      error,
    );
    //console.error("Error al cerrar sesión en el servidor:", error);
  }
};

export const getCustomerService = async () => {
  const response = await api.get("/auth/customer/");
  return response.data;
};

// Actualizar datos del cliente (usamos PATCH para actualizaciones parciales)
export const updateCustomerService = async (customerData) => {
  const response = await api.patch("auth/customer/", customerData);
  return response.data;
};

// Servicio de Verificación de Sesión
export const checkUserSession = async () => {
  const response = await api.get("auth/user/");
  return response.data;
};

export const googleLoginService = async (accessToken) => {
  // El endpoint suele ser 'auth/google/' o similar según tu urls.py
  const response = await api.post("auth/google/", {
    access_token: accessToken, // El backend espera esto para validar
  });
  return response.data;
};