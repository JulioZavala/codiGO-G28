import { Link } from "react-router-dom";
import { Search, User, ShoppingBag } from "lucide-react";

const NavActions = ({ onOpenDrawer }) => {
  const cartCount = 19;
  return (
    <div className="flex justify-end  gap-1.5 lg:flex-col">
      {/* BUSCADOR */}
      <button
        onClick={() => onOpenDrawer("search")}
        className="hidden lg:flex justify-end items-center gap-1.5 hover:opacity-50 transition-opacity"
      >
        <Search size={22} strokeWidth={1.5} />
        <span>Buscar</span>
      </button>
      {/* CUENTA / LOGIN */}
      <button
        onClick={() => onOpenDrawer("user")}
        className="flex justify-end items-center gap-1.5 hover:opacity-50 transition-opacity"
      >
        <User size={22} strokeWidth={1.5} />
        <span className="hidden lg:block">Mi Cuenta</span>
      </button>
      {/* CARRITO (Shopping Bag) */}
      <button
        onClick={() => onOpenDrawer("cart")}
        className="flex justify-end items-center gap-1.5  hover:opacity-50 transition-opacity"
      >
        <div className="relative">
          <ShoppingBag size={22} strokeWidth={1.5} />
          {/* Burbuja de notificación (Solo se muestra si hay items) */}
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>
        <span className="hidden lg:block">Mi Pedido</span>
      </button>
    </div>
  );
};
export default NavActions;
