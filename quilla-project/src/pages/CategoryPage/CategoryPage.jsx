import { useState } from "react";
import { useParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SideDrawer from "@/components/SideDrawer"; // Reutilizamos tu SideDrawer
import { MOCK_PRODUCTS } from "@/constants/mockProducts";

const CategoryPage = () => {
  // Obtenemos la categoría de la URL (ej: /hombre/ropa)
  const { category, subcategory, sub_subcategory } = useParams();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Título dinámico de la página
  const pageTitle = sub_subcategory
    ? `${category} / ${subcategory} / ${sub_subcategory}`
    : subcategory
    ? `${category} / ${subcategory}`
    : category;

  // --- COMPONENTE DE FILTROS LATERALES ---
  const FilterSidebar = () => (
    <div className="hidden lg:block w-64 shrink-0 pr-8 border-r border-gray-100">
      <h3 className="font-bold uppercase tracking-widest mb-6">Filtros</h3>
      {/* Ejemplo de un grupo de filtros (Acordeón simple) */}
      <div className="border-b border-gray-100 py-4">
        <button className="flex justify-between items-center w-full uppercase text-sm tracking-wider font-medium">
          <span>Color</span>
          <ChevronDown size={16} />
        </button>
        <ul className="mt-4 space-y-2 text-sm text-gray-600 pl-2">
          <li>
            <label className="flex items-center gap-2 cursor-pointer hover:text-black">
              <input type="checkbox" className="accent-black" /> Negro (12)
            </label>
          </li>
          <li>
            <label className="flex items-center gap-2 cursor-pointer hover:text-black">
              <input type="checkbox" className="accent-black" /> Marrón (8)
            </label>
          </li>
        </ul>
      </div>
      <div className="border-b border-gray-100 py-4">
        <button className="flex justify-between items-center w-full uppercase text-sm tracking-wider font-medium">
          <span>Precio</span>
          <ChevronDown size={16} />
        </button>
        {/* Placeholder de rango de precio */}
        <div className="mt-4 text-sm text-gray-500 pl-2">S/ 100 - S/ 2000</div>
      </div>
    </div>
  );

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

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-8 pt-4">
        {" "}
        {/* CABECERA DE CATEGORÍA */}
        <header className="mb-8 lg:mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
          <div>
            {/* Breadcrumbs simples */}
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              Inicio / {pageTitle}
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-widest">
              {sub_subcategory || subcategory || category || "Productos"}
            </h1>
          </div>

          {/* Controles Filtrar y Ordenar */}
          <div className="w-full lg:w-auto flex gap-4">
            {/* Selector de Ordenar (Mobile) */}
            <button className="flex-1 border border-gray-200 py-3 uppercase text-xs font-medium tracking-widest text-gray-500 lg:hidden">
              Ordenar
            </button>
            {/* Selector de Ordenar (Desktop) */}
            <div className="hidden lg:block">
              <select className="border-b border-gray-200 py-2 outline-none text-sm uppercase tracking-widest bg-transparent cursor-pointer">
                <option>Más relevantes</option>
                <option>Precio: Bajo a Alto</option>
                <option>Precio: Alto a Bajo</option>
              </select>
            </div>
            {/* Filtrar */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 border lg:border-none border-black py-3 uppercase text-xs font-bold tracking-widest"
            >
              <SlidersHorizontal size={16} /> Filtrar
            </button>
          </div>
        </header>
        <div className="flex">
          {/* GRILLA DE PRODUCTOS */}
          <div className="flex-1 lg:pl-8">
            {/* Grid Responsiva:
            - 2 columnas en móvil (grid-cols-2)
            - 3 columnas en tablet (md:grid-cols-3)
            - 4 columnas en desktop grande (xl:grid-cols-4)
          */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-12">
              {MOCK_PRODUCTS.map((product) => (
                // Usamos index como key solo para este mock data repetido
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>

            {/* Paginación simple (Estilo Prüne: botón "Cargar más") */}
            <div className="mt-16 text-center">
              <button className="uppercase tracking-[0.2em] text-xs border-b-2 border-black pb-1 font-bold hover:opacity-60 transition-opacity">
                Cargar más productos
              </button>
              <p className="text-gray-400 text-xs mt-4">
                Mostrando 12 de 48 productos
              </p>
            </div>
          </div>
        </div>
        {/* DRAWER DE FILTROS (Solo móvil) - Reutilizando tu componente */}
        <SideDrawer
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          side="left lg:right"
          title="Filtrar por"
        >
          {/* El contenido del sidebar lateral se renderiza aquí en móvil */}
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">
              Aquí irían los mismos filtros que en el sidebar de escritorio.
            </p>
            {/* Ejemplo de estructura móvil */}
            <div className="border-b py-4 font-medium uppercase tracking-widest text-sm">
              Color
            </div>
            <div className="border-b py-4 font-medium uppercase tracking-widest text-sm">
              Talla
            </div>
            <div className="border-b py-4 font-medium uppercase tracking-widest text-sm">
              Precio
            </div>
          </div>
        </SideDrawer>
      </div>
    </div>
  );
};

export default CategoryPage;
