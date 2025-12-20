import { X } from "lucide-react";

// props: objeto
// destructuracion const {children, title, ...} = props
function Modal({ children, title, open, onClose, onConfirm }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        open ? "block" : "hidden"
      }`}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50"></div>

      <div className="relative z-50 w-full max-w-md mx-4 bg-white rounded-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button 
          onClick={onClose}
          className="cursor-pointer border rounded-full border-red-700 hover:bg-red-400">
            <X className="text-red-700"/>
          </button>
        </div>
        {/* Body */}
        <div className="p-4">{children}</div>
        {/* Footer */}
        <div className="flex items-center justify-end gap-5 p-4 border-t border-gray-300">
          <button 
            onClick={onClose}
            className="bg-red-400 text-white cursor-pointer px-3 py-2 rounded-md">
            Cancelar
          </button>
          <button
            onClick={onConfirm} 
            className="bg-gray-950 text-white cursor-pointer px-3 py-2 rounded-md">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;