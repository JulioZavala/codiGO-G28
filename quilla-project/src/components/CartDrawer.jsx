// src/components/CartDrawer.jsx
import React from "react";
import { useCart } from "@/context/CartContext";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

const CartDrawer = ({ onClose }) => {
  const { cart, setIsDrawerOpen, totalPrice, totalItems, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  const navigateToCart = () => {
    onClose();
    navigate("/cart/current");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* HEADER MINIMALISTA */}
      <header className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <ShoppingBag size={20} className="text-[#444444]" strokeWidth={1.5} />
          <h2 className="text-xs uppercase font-bold tracking-[0.25em] text-[#0F2D51]">
            Mi Pedido ({totalItems})
          </h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-black">
          <X size={20} strokeWidth={1} />
        </button>
      </header>

      {/* LISTA DE ITEMS (Scrollable) */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {!cart?.items || cart.items.length === 0 ? (
          <p className="text-center text-[10px] uppercase tracking-widest text-[#B0B7BF] py-10">
            Tu carrito está vacío
          </p>
        ) : (
          cart.items.map((item) => (
            <div key={item.id} className="flex gap-4 items-start">
              <img
                src={item.feature_image}
                alt={item.product_name}
                className="w-16 h-16 object-cover bg-gray-50"
              />
              <div className="flex-1">
                <h3 className="text-[11px] uppercase font-bold tracking-widest text-[#444444] leading-tight">
                  {item.product_name}
                </h3>
                <p className="text-[10px] text-[#B0B7BF] mt-1 uppercase tracking-tighter">
                  {item.variant_attributes}
                </p>
                <p className="text-[10px] text-black font-mono mt-2 font-bold">
                  {formatter.format(item.price)} x {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-300 hover:text-red-500 pt-1"
              >
                <Trash2 size={14} strokeWidth={1} />
              </button>
            </div>
          ))
        )}
      </main>

      {/* FOOTER */}
      <footer className="p-6 border-t border-gray-100 bg-[#fdfdfd] space-y-4">
        <div className="flex items-end justify-between mb-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#B0B7BF]">
            Total Est.
          </span>
          <span className="text-xl font-bold text-black tracking-tight">
            {formatter.format(totalPrice)}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={navigateToCart}
            className="w-full text-center border border-[#444444] text-[#444444] py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors"
          >
            Ir al Carrito
          </button>
          <button className="w-full text-center bg-[#1a1a1a] text-white py-4 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-black transition-colors">
            Comprar
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CartDrawer;
