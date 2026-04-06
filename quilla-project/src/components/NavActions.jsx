import { Link } from "react-router-dom";
import { Search, User, ShoppingBag } from "lucide-react";
//import useUserStore from "@/stores/useUserStore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "@/context/CartContext";

const NavActions = ({ onOpenDrawer }) => {
  const { totalItems } = useCart();
  const cartCount = totalItems;
  //const { user } = useUserStore();
  const { user } = useAuth();
  const hasFullName = user?.first_names && user?.paternal_last_name;

  const displayName = hasFullName
    ? `${user.first_names.split(" ")[0]} ${user.paternal_last_name}`
    : user?.username;

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
        <span className="hidden lg:block">
          {
            user
              ? displayName // Si hay usuario
              : "Mi Cuenta" // Si no hay usuario
          }
        </span>
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
