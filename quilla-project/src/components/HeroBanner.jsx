import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroBanner = ({
  desktopImageSrc, // Imagen para desktop
  mobileImageSrc, // Imagen para mobile
  title,
  subtitle,
  ctaLink,
  ctaText,
  height = "h-screen", // Por defecto ocupa toda la pantalla
}) => {
  // Variantes de animación para el efecto escalonado (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Retraso entre la aparición de cada elemento hijo
        delayChildren: 0.2, // Retraso inicial antes de empezar
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }, // Curva suave
    },
  };

  return (
    <div className={`relative w-full ${height} overflow-hidden bg-black`}>
      {/* 1. IMAGEN DE FONDO RESPONSIVE */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <picture>
          {/* Regla para tablets y escritorio (md = 768px en Tailwind).
            Si la pantalla es ancha, usa esta imagen.
          */}
          <source media="(min-width: 768px)" srcSet={desktopImageSrc} />

          {/* Imagen por defecto (Móvil).
            El navegador cargará esta si no se cumple la condición de arriba.
            Es vital que la etiqueta <img> esté al final como fallback.
          */}
          <img
            src={mobileImageSrc}
            alt={title}
            className="w-full h-full object-cover opacity-90"
          />
        </picture>
      </motion.div>

      {/* 2. OVERLAY (Capa oscura para mejorar lectura) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 3. CONTENIDO DE TEXTO (Centrado) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6 z-10"
      >
        {/* Título Principal */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.2em] mb-6 leading-tight max-w-4xl"
        >
          {title}
        </motion.h1>

        {/* Subtítulo (Opcional) */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="text-xs md:text-sm uppercase tracking-[0.3em] mb-10 font-light max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Botón CTA (Call to Action) */}
        <motion.div variants={itemVariants}>
          <Link
            to={ctaLink}
            className="group relative inline-block px-12 py-4 border border-white uppercase tracking-[0.3em] text-xs font-bold overflow-hidden transition-all hover:text-black"
          >
            {/* Efecto de llenado al hover */}
            <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform group-hover:translate-x-0 duration-300 ease-out" />
            <span className="relative z-10">{ctaText}</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
