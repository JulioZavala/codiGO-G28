import * as React from "react";
import NavMenu from "./NavMenu";
import NavActions from "./NavActions";
import { Link } from "react-router-dom";
import { useState } from "react";
import SideDrawer from "@/components/SideDrawer";
import MobileMenuContent from "./MobileMenuContent";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import UserContent from "@/components/UserContent";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  // Detectamos si el usuario ha hecho scroll más de 50px
  const isScrolled = useScrollThreshold(50);
  // El header se vuelve sólido SI hay scroll O SI hay hover
  const isSolid = isScrolled || isHovered;
  const isMobile = useIsMobile(); // Solo lo usamos para optimizar carga de datos
  const [activeDrawer, setActiveDrawer] = useState(null); // null, 'search', 'user', 'cart'

  // Clases dinámicas para el contenedor principal
  const headerClasses = `fixed top-0 left-0 w-full py-4 z-[100] transition-all duration-500 ease-in-out border-b ${
    isSolid
      ? "bg-white border-gray-100 shadow-sm" // Estado Sólido
      : "bg-transparent border-transparent" // Estado Transparente
  }`;

  // Clases dinámicas para el color del texto (blanco sobre fondo oscuro, negro sobre blanco)
  const textColorClass = isSolid ? "text-black" : "text-white";

  return (
    <header
      className={headerClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative mx-auto px-6 h-full flex items-center justify-between ${textColorClass}`}
      >
        {/* 1. Menú Móvil BOTÓN HAMBURGUESA */}
        <button
          className="lg:hidden p-2 -ml-2"
          onClick={() => setActiveDrawer("menu")}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
        {/* 2. Menú Desktop (Siempre en el DOM, oculto en móvil con CSS) */}
        <NavMenu skipHeavyAssets={isMobile} />
        {/* 3. Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center">
          <Link
            to="/"
            className={`font-audiowide tracking-widest transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${
              isSolid
                ? "text-5xl md:text-6xl text-black" // Logo normal (scrolled/hover)
                : "text-6xl md:text-8xl text-white  mt-7 lg:mt-15" // LOGO GIGANTE (transparente)
            }`}
          >
            quilla
          </Link>
        </div>
        {/* 4. Menu Actions */}
        <NavActions onOpenDrawer={setActiveDrawer} />
      </div>

      <SideDrawer
        isOpen={activeDrawer !== null}
        onClose={() => setActiveDrawer(null)}
        side={activeDrawer === "menu" ? "left" : "right"}
        title={
          activeDrawer === "menu"
            ? "Quilla"
            : activeDrawer === "search"
            ? "Buscar"
            : activeDrawer === "user"
            ? "Mi Cuenta"
            : "Bolsa de Compras"
        }
      >
        {activeDrawer === "menu" && (
          <MobileMenuContent onClose={() => setActiveDrawer(null)} />
        )}
        {activeDrawer === "search" && (
          <div className="space-y-6">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="w-full border-b border-black py-2 outline-none text-lg"
            />
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Sugerencias: Carteras, Botines, Casacas
            </p>
          </div>
        )}

        {activeDrawer === "user" && <UserContent />}

        {activeDrawer === "cart" && (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <p className="text-gray-500 uppercase text-xs tracking-widest">
              Tu bolsa está vacía
            </p>
            <button
              onClick={() => setActiveDrawer(null)}
              className="mt-6 underline uppercase text-xs font-bold"
            >
              Volver a la tienda
            </button>
          </div>
        )}
      </SideDrawer>
    </header>
  );
};

{
  /* RENDERIZADO DE DRAWERS SEGÚN EL ESTADO */
}

export default Navbar;
