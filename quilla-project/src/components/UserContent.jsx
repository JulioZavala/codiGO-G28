import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoginForm } from "@/hooks/useLoginForm";
import useUserStore from "@/stores/useUserStore";

const UserContent = () => {
  const { values, handleInputChange, handleSubmit } = useLoginForm();
  const { user, logout } = useUserStore();

  const [showPassword, setShowPassword] = useState(false);

  // --- VISTA: USUARIO LOGUEADO (Botones Mi Cuenta / Salir) ---
  if (user) {
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
            onClick={() => logout()}
            className="flex items-center justify-between w-full py-4 px-4 border border-gray-200 uppercase text-xs font-bold tracking-[0.2em] text-gray-500 hover:text-black hover:border-black transition-all"
          >
            <span>Cerrar Sesión</span>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-6 py-8 overflow-y-auto custom-scrollbar">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold uppercase tracking-[0.3em]">
          Mi Cuenta
        </h2>
        <p className="text-xs text-gray-400 mt-2 tracking-widest font-light">
          Gestiona tus pedidos y perfil
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* ==============================================
            INICIAR SESIÓN
           ============================================== */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* CONTENIDO DEL FORMULARIO (Aparece ARRIBA del botón) */}
          <AnimatePresence>
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: "auto", opacity: 1, marginBottom: 20 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-6 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                    Email
                  </label>
                  <input
                    type="email"
                    value={values.email}
                    name="email"
                    onChange={handleInputChange}
                    className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors bg-transparent"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div className="space-y-1 relative">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                    Contraseña
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onChange={handleInputChange}
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
                </div>
                <Link
                  to="/recovery"
                  className="block text-[10px] text-gray-400 underline hover:text-black"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            type="submit"
            className="w-full py-4 border border-black uppercase text-xs font-bold tracking-[0.2em] transition-all duration-300 bg-black text-white"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserContent;
