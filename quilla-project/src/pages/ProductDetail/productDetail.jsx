import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom"; // Añadimos Link para navegación
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Loader2,
  HardDriveDownload,
} from "lucide-react";
import { motion } from "framer-motion";
import { getProductBySlug } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// IMPORTACIONES DE ESTILOS DE SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- ANIMACIONES (Framer Motion) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const ProductDetail = () => {
  const { slug } = useParams(); // Obtenemos el slug de la URL (/producto/billetera-compacta)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // ESTADOS PARA LA SELECCIÓN DE VARIANTES
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // 1. CARGA DE DATOS REALES
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        console.error("Error cargando el detalle en Quilla:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  const variantOptions = useMemo(() => {
    if (!product?.variants) return { sizes: [], colors: [] };

    const sizes = new Set();
    const colors = new Set();

    product.variants.forEach((variant) => {
      variant.attributes.forEach((attr) => {
        // Asumiendo que tus atributos vienen como "Talla: M" o similar
        if (attr.includes("Talla")) sizes.add(attr.replace("Talla: ", ""));
        if (attr.includes("Color")) colors.add(attr.replace("Color: ", ""));
      });
    });

    return { sizes: Array.from(sizes), colors: Array.from(colors) };
  }, [product]);

  // Actualizar la variante seleccionada cuando cambian los filtros
  useEffect(() => {
    if (!product?.variants) return;

    // 1. Verificamos qué opciones existen realmente para este producto
    const tieneTallas = variantOptions.sizes.length > 0;
    const tieneColores = variantOptions.colors.length > 0;

    // 2. La selección está completa si:
    // (No hay tallas O ya seleccionó una) Y (No hay colores O ya seleccionó uno)
    const seleccionCompleta =
      (!tieneTallas || selectedSize) && (!tieneColores || selectedColor);

    if (seleccionCompleta) {
      const match = product.variants.find((v) => {
        // Verificamos que la variante contenga los atributos seleccionados
        const matchTalla =
          !tieneTallas ||
          v.attributes.some((attr) => attr.includes(`Talla: ${selectedSize}`));
        const matchColor =
          !tieneColores ||
          v.attributes.some((attr) => attr.includes(`Color: ${selectedColor}`));

        return matchTalla && matchColor;
      });

      setSelectedVariant(match);
    } else {
      // Si falta algo, nos aseguramos de que no haya variante seleccionada
      setSelectedVariant(null);
    }
  }, [selectedSize, selectedColor, product, variantOptions]);

  // Formateador de moneda (Ej: S/ 1,250.00)
  const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  });

  // Pantalla de carga profesional
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-200" size={48} />
      </div>
    );
  }

  // Manejo de producto no encontrado
  if (!product)
    return (
      <div className="p-20 text-center uppercase tracking-widest">
        Producto no encontrado
      </div>
    );



  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    try {
      setIsAdding(true);
      // Llamamos al contexto, que a su vez llama al ordersService
      const result = await addToCart(selectedVariant.id, 1);

      if (!result.success) {
        toast.error(result.message || "Error al añadir al carrito");
      }
      // El SideDrawer se abre automáticamente por la lógica del Contexto
    } catch (error) {
      console.error("Error en la operación:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto min-h-screen bg-white"
    >
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

      {/* GRILLA PRINCIPAL RESPONSIVE */}
      {/* 1 col en móvil, 2 cols en desktop (md:) */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(400px,480px)] lg:grid-cols-[1fr_minmax(480px,560px)]">
        {/* --- COLUMNA IZQUIERDA: CARRUSEL HORIZONTAL --- */}
        <div className="relative bg-[#fdfdfd] md:h-screen md:sticky md:top-0 overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="w-full h-full"
          >
            {/* Iteramos sobre el array de imágenes que envía el Serializer */}
            {product.images.map((img) => (
              <SwiperSlide key={img.id}>
                <div className="flex items-center justify-center w-full h-full p-4 md:p-12 lg:p-20">
                  <img
                    src={img.image_url}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply" // mix-blend ayuda a integrar fotos si el fondo no es blanco puro
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación Custom (Estilo Prüne, minimalistas) */}
          {/* Ocultos en móvil, aparecen en hover en desktop */}
          <button className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full text-gray-400 hover:text-black hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-gray-100 shadow-sm">
            <ChevronLeft size={20} strokeWidth={1} />
          </button>
          <button className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 rounded-full text-gray-400 hover:text-black hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center border border-gray-100 shadow-sm">
            <ChevronRight size={20} strokeWidth={1} />
          </button>

          {/* Estilos custom para los puntos de paginación (Tailwind no llega aquí directo) */}
          <style>{`
            .swiper-pagination-bullet { background: #d1d5db; opacity: 1; }
            .swiper-pagination-bullet-active { background: #1a1a1a; }
            .swiper-pagination { bottom: 20px !important; }
            @media (min-width: 768px) { .swiper-pagination { bottom: 40px !important; } }
          `}</style>
        </div>

        {/* --- COLUMNA DERECHA: INFORMACIÓN DEL PRODUCTO --- */}
        <motion.aside
          variants={fadeInUp}
          className="px-6 py-10 md:px-12 lg:px-20 md:py-16 lg:py-24 border-t md:border-t-0 md:border-l border-gray-100"
        >
          {/* Breadcrumbs Dinámicos */}
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 mb-10 flex gap-2 items-center">
            <Link to="/" className="hover:text-black transition-colors">
              Inicio
            </Link>

            {product.category_slug && (
              <>
                <span className="text-gray-300">/</span>
                <Link
                  to={`/${product.category_slug.replace(/-/g, "/")}`}
                  className="hover:text-black transition-colors"
                >
                  {product.category_name}
                </Link>
              </>
            )}

            <span className="text-gray-300">/</span>
            <span className="text-black font-medium">{product.name}</span>
          </div>

          {/* Nombre del Producto */}
          <h1 className="text-xl md:text-2xl font-medium tracking-wide text-black mb-4 uppercase">
            {product.name}
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest font-mono mb-6 uppercase">
            Rango: {product.price_range}
          </p>

          {/* Precios (Estilo Prüne) */}
          <div className="flex items-end gap-3 mb-12 border-b border-gray-100 pb-8">
            <span className="text-xl font-bold text-black tracking-tight">
              {/* Si hay variante, usamos su precio; si no, el precio base del producto */}
              {selectedVariant
                ? formatter.format(selectedVariant.price)
                : formatter.format(product.price)}
            </span>
            {/* Lógica para el precio tachado (Discount) */}
            {(selectedVariant?.compare_at_price ||
              (!selectedVariant && product.compare_at_price)) && (
              <span className="text-sm text-gray-400 line-through tracking-tight pb-0.5">
                {selectedVariant
                  ? formatter.format(selectedVariant.compare_at_price)
                  : formatter.format(product.compare_at_price)}
              </span>
            )}

            {/* Badge de Ahorro Opcional */}
            {selectedVariant?.compare_at_price > selectedVariant?.price && (
              <span className="ml-2 text-[10px] bg-black text-white px-2 py-1 uppercase font-bold">
                Oferta
              </span>
            )}
          </div>

          {/* Descripción Corta */}
          <div className="mb-12 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Descripción
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Detalles del Producto (Lista minimalista) */}
          {/* <div className="mb-16 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Detalles</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-2 font-light">
              {product.details.map((detail, index) => (
                <li key={index} className="pl-1">{detail}</li>
              ))}
            </ul>
          </div> */}
          {/* --- SELECTOR DE COLORES --- */}
          {variantOptions.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
                Color
              </h3>
              <div className="flex gap-3">
                {variantOptions.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- SELECTOR DE TALLAS --- */}
          {variantOptions.sizes.length > 0 && (
            <div className="mb-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
                Talla
              </h3>
              <div className="flex gap-3">
                {variantOptions.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-[10px] border flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-400 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- INFO DE STOCK Y SKU DINÁMICO --- */}
          {selectedVariant && (
            <div className="mb-8 p-4 bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                SKU:{" "}
                <span className="text-black font-bold">
                  {selectedVariant.sku}
                </span>{" "}
                | Stock:{" "}
                <span className="text-black font-bold">
                  {selectedVariant.stock} unidades
                </span>
              </p>
            </div>
          )}

          {/* --- BLOQUE DE ACCIONES FIJO EN MÓVIL --- */}
          {/* En móvil se pega abajo (fixed), en desktop es parte del scroll normal (static) */}
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] md:relative md:p-0 md:border-0 md:shadow-none md:z-auto">
            <div className="flex flex-col gap-4">
              {/* Botón Añadir a Carrito (Primario, Negro, Grande) */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className={`flex items-center justify-center gap-3 w-full py-4 text-xs font-bold uppercase tracking-[0.25em] transition-colors ${
                  selectedVariant && selectedVariant.stock > 0
                    ? "bg-[#1a1a1a] text-white hover:bg-black"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {isAdding ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <ShoppingBag size={16} strokeWidth={1.5} />
                )}
                {!selectedVariant
                  ? "Selecciona opciones"
                  : selectedVariant.stock > 0
                    ? isAdding
                      ? "Añadiendo..."
                      : "Añadir al Carrito"
                    : "Agotado"}
              </button>

              {/* Botón Favoritos (Estilo Prüne, al final, sutil) */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center justify-center gap-2 w-full py-3 text-gray-500 hover:text-black transition-colors"
              >
                <Heart
                  size={18}
                  strokeWidth={isFavorite ? 0 : 1.5}
                  className={
                    isFavorite ? "fill-black text-black" : "currentColor"
                  }
                />
                <span className="text-[11px] uppercase font-bold tracking-[0.2em]">
                  {isFavorite ? "En Favoritos" : "Añadir a Favoritos"}
                </span>
              </button>
            </div>
          </div>

          {/* Espaciador para que el contenido no quede debajo del botón fijo en móvil */}
          <div className="h-28 md:hidden"></div>
        </motion.aside>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
