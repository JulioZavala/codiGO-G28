import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { NAVIGATION_DATA } from "@/constants/navigation";

const MobileMenuContent = ({ onItemClick }) => {
  return (
    <nav className="flex flex-col">
      {NAVIGATION_DATA.map((category) => (
        <details
          key={category.id}
          className="group border-b border-gray-100 py-4 list-none"
        >
          <summary className="flex justify-between items-center cursor-pointer list-none">
            <span className="text-sm uppercase font-bold tracking-widest">
              {category.name}
            </span>
            <ChevronRight
              size={18}
              className="group-open:rotate-90 transition-transform duration-300"
            />
          </summary>

          <div className="mt-4 ml-4 space-y-6">
            {category.subcategories.map((subcat) => (
              <div key={subcat.title}>
                <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-3">
                  {subcat.title}
                </p>
                <ul className="space-y-3">
                  {subcat.items.map((item) => (
                    <li key={item}>
                      <Link
                        to={`${category.path}/${item.toLowerCase()}`}
                        onClick={onItemClick} // Cerramos el drawer al navegar
                        className="text-sm text-gray-600 block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </details>
      ))}

      {/* Enlaces fijos al final */}
      <div className="mt-8 space-y-4">
        <Link
          to="/tiendas"
          className="block text-xs uppercase tracking-widest font-medium"
          onClick={onItemClick}
        >
          Nuestras Tiendas
        </Link>
        <Link
          to="/ayuda"
          className="block text-xs uppercase tracking-widest font-medium text-gray-400"
          onClick={onItemClick}
        >
          Ayuda
        </Link>
      </div>
    </nav>
  );
};

export default MobileMenuContent;
