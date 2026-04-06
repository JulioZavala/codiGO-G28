import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // 1. Extraemos el usuario y el estado de carga inicial
  const { user, isInitializing } = useAuth();
  const location = useLocation();

  // 2. CRÍTICO: El guardián de inicialización
  // Si React aún está preguntando al servidor "¿quién soy?", no podemos redirigir.
  // Mostramos un estado neutro o un spinner para evitar el "kick-out" accidental.
  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Verificando sesión...
        </p>
      </div>
    );
  }

  // 3. LÓGICA DE VERIFICACIÓN
  // Ahora usamos la presencia del objeto 'user' como fuente de verdad.
  if (!user) {
    // 4. REDIRECCIÓN CON MEMORIA
    // Mantenemos el 'state' para que, tras el login, el SideDrawer o la página
    // sepa devolver al usuario a donde intentaba entrar.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 5. ACCESO PERMITIDO
  return children;
};

export default ProtectedRoute;
