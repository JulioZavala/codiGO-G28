import { createContext, useState, useContext, useEffect } from "react";
import {
  loginService,
  registerService,
  logoutService,
  getCustomerService,
  checkUserSession,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // PERSISTENCIA: Recuperar sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Consultamos al backend quién es el usuario de la cookie actual
        const userData = await checkUserSession();
        setUser(userData);
      } catch (error) {
        console.error("Error al validar sesión:", error.response?.data);
        console.log(error.response);
        setUser(null);
      } finally {
        // Aquí es donde isInitializing cumple su función vital
        setIsInitializing(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginService(email, password);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.response?.data };
    }
  };

  const register = async (email, password1, password2) => {
    try {
      const userData = await registerService(email, password1, password2);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.response?.data };
    }
  };

  // LOGOUT: Limpia el estado y las cookies
  const logout = async () => {
    await logoutService();
    setUser(null); // Limpieza atómica del estado
  };

  // Obtener perfil
  const refreshCustomer = async () => {
    const data = await getCustomerService();
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        refreshCustomer,
        setUser,
        isInitializing,
      }}
    >
      {!isInitializing ? children : <div>Cargando Quilla...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Si el contexto es undefined, significa que estamos fuera del Provider
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return context;
};
