import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginService } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

export const useGoogleAuth = (onClose) => {
  const { setUser } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 1. Enviamos el access_token de Google a nuestro backend
        const userData = await googleLoginService(tokenResponse.access_token);

        // 2. Si Django nos devuelve el usuario (y las cookies se setean)
        setUser(userData);
        onClose?.();
      } catch (error) {
        console.error("Error en el login social:", error);
        alert("No se pudo iniciar sesión con Google.");
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return { googleLogin };
};
