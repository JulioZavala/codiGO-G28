import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  LogOut,
  ArrowRight,
  ArrowLeft,
  CircleX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

// --- 1. ESQUEMAS DE VALIDACIÓN ZOD ---

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

const registerSchema = z
  .object({
    // firstName: z.string().min(2, "Mínimo 2 letras"),
    // lastName: z.string().min(2, "Mínimo 2 letras"),
    email: z.string().email("Ingresa un correo válido"),
    password1: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .max(12, "Máximo 12 caracteres")
      .regex(/[a-z]/, "Debe tener al menos una minúscula (a-z)")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula (A-Z)")
      .regex(/\d/, "Debe tener al menos un número (0-9)")
      .regex(/[^A-Za-z0-9]/, "Debe tener un símbolo especial (#$%&...)"),

    // Campo obligatorio para la comparación
    password2: z.string().min(1, "Debes confirmar tu contraseña"),

    terms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos",
    }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Las contraseñas no coinciden",
    path: ["password2"], // El error aparecerá en el campo de confirmar
  });

const formVariants = {
  hidden: { opacity: 0, x: 20 }, // Empieza invisible y un poco a la derecha
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }, // Entra suave
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }, // Sale hacia la izquierda
};

const GoogleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// --- 2. COMPONENTE PRINCIPAL ---

const UserContent = ({ onClose }) => {
  const { user, login, logout, setUser } = useAuth();
  // Estado para controlar la vista: 'login' o 'register'
  const [currentView, setCurrentView] = useState("login");

  // VISTA: USUARIO LOGUEADO (Botones Mi Cuenta / Salir)
  if (user) {
    return <UserProfile user={user} logout={logout} onClose={onClose} />;
  }

  // VISTA: FORMULARIOS (Login / Register)
  return (
    <div>
      {/* Transición suave entre vistas */}
      {/* mode="wait": Espera a que uno salga para mostrar el otro */}
      <AnimatePresence mode="wait" initial={false}>
        {currentView === "login" ? (
          <motion.div
            key="login" // La key es vital para que Motion sepa que cambió
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <LoginForm
              onClose={onClose}
              login={login}
              setUser={setUser}
              switchToRegister={() => setCurrentView("register")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <RegisterForm switchToLogin={() => setCurrentView("login")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Genérico */}
      <div className="mt-auto border-t border-gray-100 pt-6">
        <Link to="/" className="flex justify-between items-center group">
          <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">
            ¿Necesitas ayuda?
          </span>
          <ArrowRight
            size={16}
            className="text-gray-300 group-hover:text-black transition-colors"
          />
        </Link>
      </div>
    </div>
  );
};

// --- 3. SUB-COMPONENTE: LOGIN FORM ---
const LoginForm = ({ onClose, switchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isInitializing } = useAuth();
  const { googleLogin } = useGoogleAuth(onClose);

  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    setError, // <--- para setear errores manuales
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched", // Opcional: valida cuando el usuario sale del campo
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      if (onClose) onClose();
      const origin = location.state?.from?.pathname; // lógica de redirección si venía de una ruta protegida
      if (origin) {
        // CASO A: Intentó entrar a una ruta protegida sin estar logueado.
        // Lo devolvemos exactamente a donde quería ir (ej: /account/pedidos)
        navigate(origin, { replace: true });
      }
      // CASO B: Estaba navegando normal y le dio a "Iniciar Sesión".
      // Al no poner 'else', simplemente se queda en la página que ya está viendo (ej: Home o un Producto).
      // Si prefieres que SIEMPRE vaya a "Mi Cuenta" al loguearse, podrías poner:
      // else { navigate("/account/perfil") }
    } catch (error) {
      // 1. Extraemos el mensaje real que manda Django
      // Django suele mandarlo en 'non_field_errors' o 'detail'
      console.log(error.response?.data);
      const serverError = error.response?.data;
      const message =
        serverError?.non_field_errors?.[0] ||
        serverError?.detail ||
        "Email o contraseña incorrectos";

      setError("root", {
        type: "manual",
        message: message,
      });
    }
  };

  const handleGoogleLogin = () => googleLogin();

  return (
    <div className="flex flex-col h-full  py-8 overflow-y-auto custom-scrollbar">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold uppercase tracking-widest">
          Iniciar Sesión
        </h2>
        <p className="text-xs text-gray-400 mt-2 tracking-widest font-light">
          Gestiona tus pedidos y perfil
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {/* ==============================================
            INICIAR SESIÓN
           ============================================== */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
          noValidate
        >
          {/* CONTENIDO DEL FORMULARIO */}
          <div className="space-y-6 pt-2 mb-5">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                Email
              </label>
              <input
                {...register("email", {
                  onChange: () => {
                    // Si existe un error global (root), bórralo apenas escriba
                    if (errors.root) clearErrors("root");
                  },
                })}
                type="email"
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors bg-transparent"
                placeholder="tu@email.com"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-red-500 text-[10px]">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="space-y-1 relative">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                Contraseña
              </label>
              <input
                {...register("password", {
                  onChange: () => {
                    // Si existe un error global (root), bórralo apenas escriba
                    if (errors.root) clearErrors("root");
                  },
                })}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors bg-transparent pr-8 [&::-ms-reveal]:hidden"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-2 text-gray-400 hover:text-black"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && (
                <span className="text-red-500 text-[10px]">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* --- AQUÍ MOSTRAMOS EL ERROR DE CREDENCIALES --- */}
            {/* Solo aparece si errors.root existe */}
            {errors.root && (
              <div className="flex justify-center gap-3 md:gap-6 items-center bg-red-50 border border-red-200 text-red-800 text-xs p-3 text-center tracking-wide font-medium">
                <CircleX />
                {errors.root.message}
              </div>
            )}

            <Link
              to="/recovery"
              className="block text-xs text-gray-400 underline hover:text-black text-right"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            disabled={isSubmitting}
            className="w-full py-4 border border-black uppercase text-xs font-bold tracking-[0.2em] transition-all duration-300 bg-black text-white"
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* --- NUEVO: SEPARADOR Y BOTÓN DE GOOGLE --- */}
        <div>
          <div className="relative flex items-center">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink-0 mx-4 text-[10px] uppercase font-bold tracking-widest text-gray-400">
              o
            </span>
            <div className="grow border-t border-gray-200"></div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-1 border border-gray-300 bg-white py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-gray-600 hover:border-black hover:text-black transition-all"
        >
          <GoogleIcon />
          Continuar con Google
        </button>
        {/* ------------------------------------------ */}

        {/* Link Switcher */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 mb-2">¿Aún no tienes cuenta?</p>
          <button
            onClick={switchToRegister}
            className="text-xs uppercase font-bold tracking-widest border-b border-black pb-0.5 hover:opacity-60 transition-opacity"
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
};

// --- 4. SUB-COMPONENTE: REGISTER FORM ---

const RegisterForm = ({ onClose, switchToLogin }) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { register: registerUser } = useAuth(); // Renombramos para evitar conflicto con useForm
  const { googleLogin } = useGoogleAuth(onClose);

  const {
    register,
    handleSubmit,
    setError, // <--- para setear errores manuales
    //watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  //const termsAccepted = watch("terms", false);

  const onSubmit = async (data) => {
    const result = await registerUser(
      data.email,
      data.password1,
      data.password2,
    );
    if (result.success) {
      if (onClose) onClose();

      const origin = location.state?.from?.pathname; // lógica de redirección si venía de una ruta protegida
      if (origin) {
        // CASO A: Intentó entrar a una ruta protegida sin estar logueado.
        // Lo devolvemos exactamente a donde quería ir (ej: /account/pedidos)
        navigate(origin, { replace: true });
      }
      // CASO B: Estaba navegando normal y le dio a "Iniciar Sesión".
      // Al no poner 'else', simplemente se queda en la página que ya está viendo (ej: Home o un Producto).
      // Si prefieres que SIEMPRE vaya a "Mi Cuenta" al loguearse, podrías poner:
      // else { navigate("/account/perfil") }
    } else {
      // SI FALLA: Seteamos un error de tipo "root" (global del form)
      setError("root", {
        type: "manual",
        message: result.message,
      });
    }
  };

  const handleGoogleRegister = () => googleLogin();

  return (
    <div>
      {/* Botón Volver */}
      <button
        onClick={switchToLogin}
        className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-gray-500 hover:text-black mb-8"
      >
        <ArrowLeft size={14} /> Volver al Login
      </button>

      <div className="text-center mb-8">
        <h2 className="text-xl font-bold uppercase tracking-widest">
          Crear Cuenta
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent"
          />
          {errors.email && (
            <span className="text-red-500 text-[10px]">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1 relative">
          <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
            Contraseña
          </label>
          <input
            {...register("password1")}
            type={showPassword1 ? "text" : "password"}
            className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent pr-8 [&::-ms-reveal]:hidden"
          />
          <button
            type="button"
            onClick={() => setShowPassword1(!showPassword1)}
            className="absolute right-0 bottom-2 text-gray-400 hover:text-black"
          >
            {showPassword1 ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          {errors.password1 && (
            <span className="text-red-500 text-[10px]">
              {errors.password1.message}
            </span>
          )}
        </div>

        <div className="space-y-1 relative">
          <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
            Repetir contraseña
          </label>
          <input
            {...register("password2")}
            type={showPassword2 ? "text" : "password"}
            className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent pr-8 [&::-ms-reveal]:hidden"
          />
          <button
            type="button"
            onClick={() => setShowPassword2(!showPassword2)}
            className="absolute right-0 bottom-2 text-gray-400 hover:text-black"
          >
            {showPassword2 ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          {errors.password2 && (
            <span className="text-red-500 text-[10px]">
              {errors.password2.message}
            </span>
          )}
        </div>

        <div className="mt-2">
          <div className="flex items-start gap-2">
            <input
              {...register("terms")}
              type="checkbox"
              className="mt-1 accent-black"
            />
            <p className="text-[10px] text-gray-500 leading-tight">
              Acepto los Términos y Condiciones y la Política de Privacidad de
              Quilla.
            </p>
          </div>
          {errors.terms && (
            <span className="text-red-500 text-[10px] block mt-1">
              {errors.terms.message}
            </span>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity disabled:opacity-50 mt-2"
        >
          {isSubmitting ? "Registrando..." : "Crear Cuenta"}
        </button>
      </form>

      {/* --- NUEVO: SEPARADOR Y BOTÓN DE GOOGLE --- */}
      <div className="mt-2 mb-2">
        <div className="relative flex items-center">
          <div className="grow border-t border-gray-200"></div>
          <span className="shrink-0 mx-4 text-[10px] uppercase font-bold tracking-widest text-gray-400">
            O
          </span>
          <div className="grow border-t border-gray-200"></div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleRegister}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-gray-600 hover:border-black hover:text-black transition-all"
      >
        <GoogleIcon />
        Registrarse con Google
      </button>
      {/* ------------------------------------------ */}
    </div>
  );
};

// --- 5. SUB-COMPONENTE: PERFIL (Ya logueado) ---
const UserProfile = ({ user, logout, onClose }) => {
  // 1. Verificamos si tenemos los nombres y apellido
  const hasFullName = user?.first_names && user?.paternal_last_name;

  // 2. Lógica para el Nombre de Bienvenida (Navbar / Profile)
  // Si existe, tomamos el primer nombre del string; si no, el username completo.
  const displayName = hasFullName
    ? `${user.first_names.split(" ")[0]}`
    : user?.username;

  // 3. Lógica para Iniciales (Avatar)
  // Caso A: Tiene nombres -> Inicial del primero + Inicial del apellido.
  // Caso B: Está vacío -> Primeras dos letras del username.
  const initials = hasFullName
    ? (user.first_names[0] + user.paternal_last_name[0]).toUpperCase()
    : user?.username?.substring(0, 2).toUpperCase() || "??";

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al salir", error);
    } finally {
      // El finally asegura que el drawer se cierre
      // incluso si la petición al backend falló (por red, por ejemplo)
      onClose?.();
    }
  };

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl font-bold text-gray-400">{initials}</span>
        </div>
        <h2 className="text-lg font-bold uppercase tracking-widest">
          Hola, {displayName}
        </h2>
        <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          to="/account/profile/"
          className="flex items-center justify-between w-full py-4 px-4 border border-black bg-black text-white uppercase text-xs font-bold tracking-[0.2em] hover:opacity-90 transition-opacity"
        >
          <span>Mi Cuenta</span>
          <User size={16} />
        </Link>

        <button
          onClick={handleLogoutClick}
          className="flex items-center justify-between w-full py-4 px-4 border border-gray-200 uppercase text-xs font-bold tracking-[0.2em] text-gray-500 hover:text-black hover:border-black transition-all"
        >
          <span>Cerrar Sesión</span>
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
};

export default UserContent;
