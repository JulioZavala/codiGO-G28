import { useState } from "react";
import { Search, Eraser, X, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { NAVIGATION_DATA } from "@/constants/navigation";
import { slugify } from "@/lib/utils";

const MobileMenuContent = ({ onClose }) => {
  // 1. ESTADO DE BÚSQUEDA
  const [search, setSearch] = useState("");

  // 2. ESTADO DEL STACK (Niveles de navegación)
  // Empezamos con el nivel principal
  const [stack, setStack] = useState([
    {
      title: "Quilla",
      items: NAVIGATION_DATA,
      path: "",
    },
  ]);

  const currentLevel = stack[stack.length - 1];
  const isNested = stack.length > 1;

  // Funciones de navegación
  const handleNextLevel = (item) => {
    const newPath = `${currentLevel.path}/${slugify(item.label)}`;
    setStack([
      ...stack,
      {
        title: item.label,
        subtitle: isNested ? currentLevel.title : null,
        path: newPath,
        items: item.items,
      },
    ]);
  };

  const handleBack = () => {
    setStack(stack.slice(0, -1));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* SECCIÓN 1: BÚSQUEDA (Siempre visible arriba) */}
      <div className="relative mb-8 px-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="¿Qué estás buscando?"
          className="w-full border-b border-gray-200 py-3 pr-10 outline-none text-sm focus:border-black transition-colors italic"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
          {search.length > 0 ? (
            <Eraser
              size={20}
              strokeWidth={1}
              className="cursor-pointer text-black "
              onClick={() => setSearch("")}
            />
          ) : (
            <Search size={20} strokeWidth={1.5} />
          )}
        </div>
      </div>

      {/* SECCIÓN 2: NAVEGACIÓN DINÁMICA */}
      <div className="relative flex-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentLevel.title}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="w-full"
          >
            {/* CABECERA DE NIVEL (Solo si es nested) */}
            {isNested && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 mb-8 text-gray-400 hover:text-black transition-colors"
              >
                <ChevronLeft size={20} />
                <div className="flex flex-col items-start">
                  {currentLevel.subtitle && (
                    <span className="text-[10px] uppercase tracking-widest leading-none mb-1">
                      {currentLevel.subtitle}
                    </span>
                  )}
                  <span className="text-sm uppercase font-bold text-black tracking-widest">
                    {currentLevel.title}
                  </span>
                </div>
              </button>
            )}

            {/* LISTA DE CATEGORÍAS */}
            <ul className="space-y-1">
              {/* "Ver todo" - Solo aparece a partir del segundo nivel */}
              {isNested && (
                <li className="border-b border-gray-50">
                  <Link
                    to={currentLevel.path}
                    onClick={onClose}
                    className="w-full flex justify-between items-center py-5 group"
                  >
                    <span className="text-sm uppercase tracking-widest font-bold text-black group-hover:pl-2 transition-all">
                      Ver todo {currentLevel.title}
                    </span>
                  </Link>
                </li>
              )}

              {currentLevel.items.map((item) => {
                const hasSub = item.items && item.items.length > 0;

                return (
                  <li key={item.id} className="border-b border-gray-50">
                    {hasSub ? (
                      // CATEGORÍA CON HIJOS (Acción: Abrir nivel)
                      <button
                        onClick={() => handleNextLevel(item)}
                        className="w-full flex justify-between items-center py-5 group"
                      >
                        <span className="text-sm uppercase tracking-widest font-medium group-hover:pl-2 transition-all">
                          {item.label}
                        </span>
                        <ChevronRight
                          size={18}
                          strokeWidth={1.5}
                          className="text-gray-300"
                        />
                      </button>
                    ) : (
                      // CATEGORÍA FINAL (Acción: Link)
                      <Link
                        to={`${currentLevel.path}/${slugify(item.label)}`}
                        onClick={onClose}
                        className="w-full flex justify-between items-center py-5 group"
                      >
                        <span className="text-sm uppercase tracking-widest font-medium group-hover:pl-2 transition-all">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileMenuContent;
