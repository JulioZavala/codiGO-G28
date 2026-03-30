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
import { useLoginForm } from "@/hooks/useLoginForm";
import useUserStore from "@/stores/useUserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- 1. ESQUEMAS DE VALIDACIÓN ZOD ---

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

const registerSchema = z.object({
  firstName: z.string().min(2, "Mínimo 2 letras"),
  lastName: z.string().min(2, "Mínimo 2 letras"),
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .max(12, "Máximo 16 caracteres")
    .regex(/[a-z]/, "Debe tener al menos una minúscula (a-z)")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula (A-Z)")
    .regex(/\d/, "Debe tener al menos un número (0-9)")
    .regex(/[^A-Za-z0-9]/, "Debe tener un símbolo especial (#$%&...)"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos",
  }),
});

const formVariants = {
  hidden: { opacity: 0, x: 20 }, // Empieza invisible y un poco a la derecha
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }, // Entra suave
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }, // Sale hacia la izquierda
};

// --- 2. COMPONENTE PRINCIPAL ---

const UserContent = ({ onClose }) => {
  const { user, setUser, logout } = useUserStore();
  // Estado para controlar la vista: 'login' o 'register'
  const [currentView, setCurrentView] = useState("login");

  const { login } = useLoginForm();

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
const LoginForm = ({ onClose, login, setUser, switchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    setError, // <--- para setear errores manuales
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await login(data.email, data.password);
    if (result.success) {
      setUser(result.user);
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

      <div className="flex flex-col gap-6">
        {/* ==============================================
            INICIAR SESIÓN
           ============================================== */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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

const RegisterForm = ({ switchToLogin }) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const termsAccepted = watch("terms", false);

  const onSubmit = (data) => {
    console.log("Registrando usuario:", data);
    // Aquí conectarías con tu función de registro real
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
            Nombre
          </label>
          <input
            {...register("firstName")}
            type="text"
            className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent"
          />
          {errors.firstName && (
            <span className="text-red-500 text-[10px]">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
            Apellido
          </label>
          <input
            {...register("lastName")}
            type="text"
            className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black bg-transparent"
          />
          {errors.lastName && (
            <span className="text-red-500 text-[10px]">
              {errors.lastName.message}
            </span>
          )}
        </div> */}

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
          {errors.password && (
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
          {errors.password && (
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
          disabled={isSubmitting || !termsAccepted}
          className="bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity disabled:opacity-50 mt-2"
        >
          {isSubmitting ? "Registrando..." : "Crear Cuenta"}
        </button>
      </form>
    </div>
  );
};

// --- 5. SUB-COMPONENTE: PERFIL (Ya logueado) ---
const UserProfile = ({ user, logout, onClose }) => {
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl font-bold text-gray-400">
            {user.firstname.charAt(0)}
            {user.lastname.charAt(0)}
          </span>
        </div>
        <h2 className="text-lg font-bold uppercase tracking-widest">
          Hola, {user.firstname}
        </h2>
        <p className="text-xs text-gray-400 mt-1">{user.email}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          to="/account/perfil"
          className="flex items-center justify-between w-full py-4 px-4 border border-black bg-black text-white uppercase text-xs font-bold tracking-[0.2em] hover:opacity-90 transition-opacity"
        >
          <span>Mi Cuenta</span>
          <User size={16} />
        </Link>

        <button
          onClick={() => {
            logout();
            onClose();
          }}
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
