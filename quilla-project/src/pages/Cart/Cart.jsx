import React from "react";
import { useCart } from "@/context/CartContext";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const formatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

const Cart = () => {
  const { cart, loading, totalPrice, updateQuantity, removeFromCart } =
    useCart();

  if (loading)
    return (
      <div className="p-20 text-center text-xs uppercase tracking-widest text-[#B0B7BF]">
        Cargando carrito de Quilla...
      </div>
    );

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <ShoppingBag
          size={48}
          strokeWidth={0.5}
          className="mx-auto text-gray-200 mb-6"
        />
        <h1 className="text-2xl font-bold uppercase tracking-widest text-[#444444] mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-sm text-[#B0B7BF] uppercase tracking-tighter mb-10">
          Agrega productos de cuero exclusivos de Quilla.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#1a1a1a] text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-black transition-colors"
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div>
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

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <header className="mb-12 border-b border-gray-100 pb-6">
            <h1 className="text-3xl font-bold uppercase tracking-widest text-[#0F2D51]">
              Mi Carrito
            </h1>
            <p className="text-[11px] text-[#B0B7BF] uppercase tracking-tighter mt-1">
              Revisa y finaliza tu pedido exclusivo en Quilla
            </p>
          </header>

          {/* --- GRILLA RESPONSIVE (Imagen b59945) --- 
            Móvil: flex-col (resumen abajo) | Escritorio: flex-row (resumen derecha) */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* COLUMNA 1: LISTA DE PRODUCTOS (Flex-1) */}
            <main className="flex-1 w-full space-y-8">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_2fr_1fr_1fr_auto] gap-4 sm:gap-8 items-center border-b border-gray-100 pb-8 last:border-0"
                >
                  {/* Imagen Cloudinary (Responsive aspect) */}
                  <div className="aspect-3/4 sm:aspect-square bg-gray-50 overflow-hidden">
                    <img
                      src={item.feature_image}
                      alt={item.product_name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </div>

                  {/* 2. Nombre y Atributos (Flex-grow) */}
                  <div className="flex flex-col gap-1">
                    <Link
                      to={`/producto/${item.sku}`}
                      className="text-[12px] uppercase font-bold tracking-widest text-[#444444] hover:text-[#0F2D51]"
                    >
                      {item.product_name}
                    </Link>
                    <p className="text-[10px] text-[#B0B7BF] uppercase tracking-tighter">
                      {item.variant_attributes}
                    </p>
                  </div>

                  {/* 3. Precio Unitario (Solo Desktop) */}
                  <div className="hidden sm:block text-center">
                    <span className="text-[12px] font-mono font-bold text-gray-400">
                      {formatter.format(item.price)}
                    </span>
                  </div>

                  {/* 4. Selector de Cantidad y Subtotal (Agrupados para evitar colisión) */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center">
                    {/* Selector */}
                    <div className="flex items-center justify-between border border-gray-200 h-9 w-24">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 text-gray-400 hover:text-black"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-[11px] font-bold font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 text-gray-400 hover:text-black"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal Dinámico */}
                    <div className="min-w-[100px] text-right">
                      <span className="text-[14px] font-mono font-bold text-[#0F2D51]">
                        {formatter.format(item.subtotal)}
                      </span>
                    </div>
                  </div>

                  {/* 5. Botón Eliminar (Aislado al final) */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </main>

            {/* COLUMNA 2: RESUMEN DE COMPRA (Sticky en Desktop) */}
            <aside className="w-full lg:w-90 lg:shrink-0 lg:sticky lg:top-24 bg-[#fdfdfd] border border-gray-100 p-8 lg:p-10 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-[#0F2D51] border-b border-gray-100 pb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[11px] uppercase tracking-widest text-[#444444]">
                  <span>Subtotal ({cart.items.length} productos)</span>
                  <span className="font-mono font-bold text-black text-sm">
                    {formatter.format(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] uppercase tracking-widest text-[#444444]">
                  <span>Envío</span>
                  <span className="text-[#B0B7BF] tracking-tighter">
                    Calculado en checkout
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mt-6 flex justify-between items-end">
                <span className="text-[12px] uppercase font-bold tracking-[0.2em] text-[#0F2D51]">
                  Total Est.
                </span>
                <span className="text-2xl font-bold text-black tracking-tight">
                  {formatter.format(totalPrice)}
                </span>
              </div>

              <p className="text-[10px] text-[#B0B7BF] uppercase tracking-tighter leading-relaxed">
                * El total final puede variar según la dirección de envío y
                promociones exclusivas de Quilla.
              </p>

              <button className="w-full bg-[#1a1a1a] text-white py-4 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-black transition-colors pt-12">
                Proceder al Checkout
              </button>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
