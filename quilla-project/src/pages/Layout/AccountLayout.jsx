import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AccountLayout = () => {
  const { user } = useAuth();
  const hasFullName = user?.first_names && user?.paternal_last_name;

  const displayName = hasFullName
    ? `${user.first_names.split(" ")[0]} ${user.paternal_last_name}`
    : user?.username || "Usuario(a)";

  return (
    <div className="mx-auto animate-in fade-in duration-500">
      <div>
        <picture>
          {/* Regla para tablets y escritorio (md = 768px en Tailwind).
            Si la pantalla es ancha, usa esta imagen.
          */}
          <source media="(min-width: 768px)" srcSet="/images/header_d1.png" />
          <img
            src="/images/header_m1.png"
            alt=""
            className="w-full h-full object-cover opacity-90"
          />
        </picture>
      </div>
      <div className="max-w-5xl mx-auto">
        {/* Título de Bienvenida */}
        <h1 className="text-2xl md:text-3xl font-light tracking-wide my-6 text-center md:text-left">
          Bienvenido, {displayName}
        </h1>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Menú Lateral (Sidebar) */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-col gap-1">
              <SidebarLink to="/account/profile">Usuario</SidebarLink>
              <SidebarLink to="/account/addresses">Direcciones</SidebarLink>
              <SidebarLink to="/account/favorites">Favoritos</SidebarLink>
              <SidebarLink to="/account/orders">Pedidos</SidebarLink>
            </nav>
          </aside>

          {/* Contenido Dinámico (Derecha) */}
          <main className="flex-1 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

// Sub-componente para los links del menú (Estilo Prüne)
const SidebarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-5 py-4 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
        isActive
          ? "bg-[#1a1a1a] text-white"
          : "bg-[#f9f9f9] text-gray-500 hover:bg-gray-100 hover:text-black"
      }`
    }
  >
    {children}
  </NavLink>
);

export default AccountLayout;
