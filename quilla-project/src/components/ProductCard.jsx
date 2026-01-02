import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { calculatePrice, formatCurrency } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const ProductCard = ({ product }) => {
  const { name, price, discount, images, id } = product;
  const isMobile = useIsMobile();

  // Estado para controlar qué imagen se muestra
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  // Estado para saber si el mouse está encima (para mostrar controles)
  const [isHovered, setIsHovered] = useState(false);

  const { final, hasDiscount } = calculatePrice(price, discount);

  // MANEJO DEL HOVER
  const handleMouseEnter = () => {
    setIsHovered(true);
    // Si hay más de una imagen, mostramos la segunda al hacer hover (regla de negocio)
    if (images.length > 1) {
      setCurrentImgIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Al salir, reseteamos a la imagen principal (portada)
    setCurrentImgIndex(0);
  };

  // NAVEGACIÓN DEL CARRUSEL (Loop Infinito)
  const prevImage = (e) => {
    e.preventDefault(); // Evita que el Link se active
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="group flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* --- 1. ZONA DE IMAGEN Y CONTROLES --- */}
      <div className="relative w-full aspect-3/4 overflow-hidden bg-gray-100 mb-3">
        {/* IMAGEN PRINCIPAL */}
        <Link to={`/producto/${id}`} className="block w-full h-full">
          <img
            src={images[currentImgIndex]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
        </Link>

        {/* BADGE DE DESCUENTO (Izquierda Superior - Estilo Vélez) */}
        {hasDiscount && (
          <div className="absolute top-4 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-20">
            -{discount}
          </div>
        )}
        {/* BOTÓN FAVORITOS (Derecha Superior) */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full text-black hover:bg-white hover:scale-110 transition-all z-20"
          onClick={(e) => {
            e.preventDefault();
            console.log("Add to wishlist");
          }}
        >
          <Heart
            size={20}
            strokeWidth={1.5}
            className={isHovered ? "fill-transparent" : "fill-transparent"}
          />
        </button>

        {/* CONTROLES CARRUSEL (Chevrons - Solo visibles en Hover y si hay > 1 imagen) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-0.5 lg:left-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/50 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20 hover:shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0.5 lg:right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/50 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20 hover:shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* BOTÓN AGREGAR RÁPIDO (Abajo Centro) */}
        <div className="absolute bottom-2 lg:bottom-4 left-0 right-0 flex justify-end lg:justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-20 px-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("Add to cart");
            }}
            className="lg:px-10 lg:border lg:border-black  hover:bg-black hover:text-white text-black text-xs font-bold uppercase tracking-[0.2em] py-0 lg:py-3 transition-all duration-300 flex items-center justify-center gap-2 border border-transparent hover:border-black"
          >
            <ShoppingBag size={isMobile ? 20 : 14} className="mb-0.5" /> <span className="hidden lg:block">Agregar</span>
          </button>
        </div>

        {/* INDICADOR DE PÁGINA */}
        {isHovered && images.length > 1 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-0.5 w-4 transition-colors ${
                  idx === currentImgIndex ? "bg-black" : "bg-gray-300/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- 2. ZONA DE INFORMACIÓN (Footer) --- */}
      <div className="flex flex-col gap-1">
        {/* Nombre del Producto */}
        <Link
          to={`/producto/${id}`}
          className="text-[11px] text-center uppercase text-gray-600 font-medium hover:text-black truncate"
        >
          {name}
        </Link>

        {/* Precios */}
        <div className="flex justify-center items-center gap-3 mt-1">
          {hasDiscount ? (
            <>
              {/* Precio Original Tachado */}
              <span className="text-xs text-gray-400 line-through decoration-gray-400">
                {formatCurrency(price)}
              </span>

              {/* Precio Final */}
              <span className="bg-black text-white text-xs font-bold px-2 py-0.5 tracking-wide">
                {formatCurrency(final)}
              </span>
            </>
          ) : (
            // Precio Normal (Sin descuento)
            <span className="text-sm text-black font-bold">
              {formatCurrency(price)}
            </span>
          )}
        </div>

        {/* Atributos (Color) - Opcional */}
        {product.attributes?.color && (
          <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-1">
            {product.attributes.color}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
