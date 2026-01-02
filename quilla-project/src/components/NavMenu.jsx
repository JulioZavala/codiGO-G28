import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAVIGATION_DATA } from "@/constants/navigation";
import { slugify } from "@/lib/utils";

const NavMenu = ({ skipHeavyAssets }) => {
  // Estado para controlar qué menú está activo. Null = ninguno.
  const [activeMenu, setActiveMenu] = useState(null);

  // Función auxiliar para cerrar el menú
  const handleCloseMenu = () => setActiveMenu(null);

  return (
    <nav className="hidden lg:flex h-full">
      <ul className="flex h-full gap-2 z-20 ">
        {NAVIGATION_DATA.map((category) => (
          <li
            key={category.id}
            className="h-full flex items-center w-20"
            onMouseEnter={() => setActiveMenu(category.id)}
            onMouseLeave={handleCloseMenu}
          >
            {/* Link Principal */}
            <Link
              to={`/${slugify(category.label)}`}
              // cerrar menú al hacer click
              onClick={handleCloseMenu}
              className={`uppercase transition-all duration-400
            ${
              activeMenu === category.id
                ? "font-semibold border-b-2 border-black"
                : "border-b-2 border-transparent"
            }`}
            >
              {category.label}
            </Link>
            {/* SUBMENÚ: Se muestra al hacer hover en el 'li' padre */}
            {/* AnimatePresence permite animar cuando el componente se desmonta (exit) */}
            <AnimatePresence>
              {/* Renderizado Condicional: Solo mostramos si el estado coincide con el nombre */}
              {activeMenu === category.id && (
                <motion.div
                  // Se define los estados de la animación
                  initial={{ opacity: 0.5 }} // inicio
                  animate={{ opacity: 1 }} // final
                  exit={{ opacity: 0.5 }} // Cómo se va
                  // Configuración de la transición (suavizado tipo "easeOut")
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                  className="absolute top-full z-0 left-0 bg-white w-full shadow-2xl border-t border-gray-100" //hidden group-hover:block
                >
                  <div className="flex gap-12">
                    <div className="w-[18%] shrink-0">
                      {/* <img src={category.img} alt={`Imangen ${category.label}`} /> */}

                      {!skipHeavyAssets && category.img && (
                        <motion.img
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          src={category.img}
                          alt={`Imangen ${category.label}`}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="w-[82%] grid grid-cols-7 gap-12 py-5">
                      {category.items.map((subcat) => (
                        <div key={subcat.id}>
                          <h4 className="font-bold text-sm mb-2 uppercase tracking-wider text-gray-900">
                            {subcat.label}
                          </h4>
                          <ul className="space-y-3">
                            <li>
                              <Link
                                to={`${slugify(category.label)}/${slugify(
                                  subcat.label
                                )}`}
                                className="block text-[14px] text-gray-500 hover:text-black capitalize transition-colors"
                                onClick={handleCloseMenu}
                              >
                                Ver todo
                              </Link>
                            </li>
                            {subcat.items.map((item) => (
                              <li key={item.id}>
                                <Link
                                  to={`${slugify(category.label)}/${slugify(
                                    subcat.label
                                  )}/${slugify(item.label)}`}
                                  className="block text-[14px] text-gray-500 hover:text-black capitalize transition-colors"
                                  // cerrar menú al hacer click
                                  onClick={handleCloseMenu}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavMenu;
