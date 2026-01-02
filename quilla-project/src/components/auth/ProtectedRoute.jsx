import { Navigate, useLocation, Outlet } from "react-router-dom";
import useUserStore from "@/stores/useStore";

const ProtectedRoute = () => {
  // 1. LÓGICA DE VERIFICACIÓN
  const { isAuthenticated } = useUserStore();

  const location = useLocation();

  if (!isAuthenticated) {
    // 2. REDIRECCIÓN
    // Si no está logueado, lo mandamos al login.
    // 'state={{ from: location }}' sirve para que, tras loguearse,
    // puedas redirigirlo automáticamente a donde quería ir (Carrito o Cuenta).
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. ACCESO PERMITIDO
  return <Outlet />;
};

export default ProtectedRoute;
