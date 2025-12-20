import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      // agregar un producto
      addItem: (product) =>
        set((state) => {
          // buscar si el producto existe en zustand
          const searchItem = state.items.find((item) => item.id === product.id);

          if (searchItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          toast.success(`El producto ${product.name} fue agregado al carrito.`);
          // si no existe lo agregamos a la lista
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        })),
      addQuantity: (productId, stock) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id == productId) {
              const currentQuantity = item.quantity + 1;
              if (currentQuantity > stock) {
                toast.error("La cantidad solicitada supera al stock");
                return item;
              }
              return {
                ...item,
                quantity: currentQuantity,
              };
            }

            return item;
          }),
        })),
      reduceQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),
      getTotal: () => {
        const { items } = get();
        // Sirve para poder hacer la sumatorio de los precios X cantidad
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getTotalItem: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      getItem: (productId) => {
        const { items } = get();
        return items.find((item) => item.id === productId);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;