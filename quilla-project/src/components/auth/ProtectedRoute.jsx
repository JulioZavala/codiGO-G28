import { Navigate, useLocation, Outlet } from "react-router-dom";
import useUserStore from "@/stores/useUserStore";

const ProtectedRoute = ({ children }) => {
  // 1. LÓGICA DE VERIFICACIÓN
  const { isAuthenticated } = useUserStore();

  const location = useLocation();

  if (!isAuthenticated) {
    // 2. REDIRECCIÓN
    // Si no está logueado, lo mandamos al login.
    // 'state={{ from: location }}' sirve para que, tras loguearse,
    // puedas redirigirlo automáticamente a donde quería ir (Carrito o Cuenta).
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3. ACCESO PERMITIDO
  return children;
};

export default ProtectedRoute;
