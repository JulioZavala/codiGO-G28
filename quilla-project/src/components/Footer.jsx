import { FOOTER_DATA } from "@/constants/footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* SECCIÓN SUPERIOR: NEWSLETTER & LINKS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-10">
          {/* 1. Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-[11px] uppercase font-bold tracking-[0.4em]">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm">
              Suscríbete para recibir novedades y promociones exclusivas.
            </p>
            <form className="relative max-w-sm group">
              <input
                type="email"
                placeholder="TU EMAIL"
                className="w-full bg-transparent border-b border-gray-500 py-3 outline-none text-sm tracking-[0.2em] focus:border-white transition-colors placeholder:text-gray-600"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-1 transition-transform">
                <ArrowRight size={18} strokeWidth={1.2} />
              </button>
            </form>
          </div>

          {/* 2. Columnas de Links (Contenido Renzo Costa) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {FOOTER_DATA.columns.map((col) => (
              <div key={col.title} className="space-y-6">
                <h3 className="text-[11px] uppercase font-bold tracking-[0.3em]">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest "
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN INFERIOR: LIBRO, REDES, PAGOS */}
        <div className="lg:flex flex-row-reverse justify-between">
          {/* Métodos de Pago */}
          <div className="flex flex-col items-center justify-center gap-4 py-4 lg:w-94">
            <h3 className="text-[11px] uppercase font-bold tracking-[0.3em]">
              FORMAS DE PAGO
            </h3>
            <div className="flex gap-3 items-center invert brightness-0 opacity-50">
              <div className="w-10 h-10 p-1">
                <img src="/src/assets/images/icons/visa.svg" alt="" />
              </div>
              <div className="w-10 h-10 p-1">
                <img src="/src/assets/images/icons/mastercard.svg" alt="" />
              </div>
              <div className="w-10 h-10 p-1">
                <img
                  src="/src/assets/images/icons/americanexpress.svg"
                  alt=""
                />
              </div>
              <div className="w-10 h-10 p-1">
                <img src="/src/assets/images/icons/dinersclub.svg" alt="" />
              </div>
              <div className="w-10 h-10 p-1">
                <img src="/src/assets/images/icons/yape.svg" alt="" />
              </div>
            </div>
          </div>
          {/* Redes Sociales */}
          <div className="flex flex-col items-center justify-center gap-4 py-4 lg:w-94">
            <h3 className="text-[11px] uppercase font-bold tracking-[0.3em]">
              NUESTRAS REDES SOCIALES
            </h3>
            <div className="flex gap-3 items-center invert brightness-0">
              <a href="#" className="w-10 h-10 p-1 flex ">
                <img
                  src="./src/assets/images/icons/tiktok.svg"
                  alt="tiktok"
                  className="h-6 opacity-50 hover:opacity-100 transition-opacity"
                />
              </a>
              <a href="#" className="w-10 h-10 p-1 rounded-sm">
                <img
                  src="./src/assets/images/icons/instagram.svg"
                  alt="instagram"
                  className="opacity-50 hover:opacity-100 transition-opacity"
                />
              </a>
              <a href="#" className="w-10 h-10 p-1 rounded-sm">
                <img
                  src="./src/assets/images/icons/facebook.svg"
                  alt="facebook"
                  className="opacity-50 hover:opacity-100 transition-opacity"
                />
              </a>
              <a href="#" className="w-10 h-10 p-1 rounded-sm">
                <img
                  src="./src/assets/images/icons/youtube.svg"
                  alt="youtube"
                  className="opacity-50 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
          {/* Libro de Reclamaciones (Indispensable para marca local) */}
          <div className="flex gap-4 justify-center">
            <Link to="/libroreclamaciones" className="flex items-center">
              <img
                src="/src/assets/images/icons/libro.svg"
                alt="Libro de Reclamaciones"
                className="h-15 invert brightness-0 opacity-50 hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="py-4">
              <h3 className="text-[11px] uppercase font-bold tracking-[0.3em] pb-1.5">
                Libro de Reclamaciones
              </h3>
              <p className="text-justify text-[10px] text-gray-400 uppercase tracking-tighter w-65 lg:w-75">
                Conforme a lo establecido en el código de protección y defensa
                del consumidor. Este establecimiento cuenta con un libro de
                reclamaciones virtual a disposición.
                <br />
                <Link to="/libroreclamaciones" className="underline">
                  Haz click aquí{" "}
                </Link>{" "}
                para registrar una queja o reclamo.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-5 lg:pt-10 border-t border-gray-50 flex flex-col justify-between items-center gap-8">
          {/* Copyright y Marca */}
          <div className="text-center">
            <span className="font-audiowide text-xl tracking-[0.4em]">
              quilla
            </span>
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
              © 2026 Quilla. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
