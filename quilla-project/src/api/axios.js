import axios from "axios";

// Función auxiliar para leer cookies (ya que no queremos instalar librerías extra)
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
  //baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true, // Indica a Axios que debe enviar/recibir cookies.
});

// // Configuración automática de CSRF
// api.defaults.xsrfCookieName = 'csrftoken';
// api.defaults.xsrfHeaderName = 'X-CSRFToken';

// INTERCEPTOR: Inyecta el token CSRF manualmente en cada petición
api.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");

  // LOG DE INGENIERÍA:
  console.log("Cookie CSRF leída:", csrfToken);

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  } else {
    console.warn("¡OJO! No se encontró la cookie csrftoken. Revisa HttpOnly.");
  }
  return config;
});

export default api;
