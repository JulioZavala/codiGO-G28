import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const SideDrawer = ({ isOpen, onClose, title, children, side = "right" }) => {
  const isLeft = side === "left";
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. OVERLAY (Fondo oscuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-150 backdrop-blur-sm"
          />

          {/* 2. PANEL LATERAL (Drawer) */}
          <motion.div
            // Animación dinámica según el lado
            initial={{ x: isLeft ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isLeft ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 ${
              isLeft ? "left-0" : "right-0"
            } h-screen w-full max-w-[320px] bg-white z-200 shadow-2xl flex flex-col`}
          >
            {/* Cabecera del Drawer */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-sm uppercase font-bold tracking-widest">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="hover:rotate-90 transition-transform duration-300"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Contenido dinámico */}
            <div className="flex-1 overflow-y-auto p-8">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default SideDrawer;
