import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import * as ordersService from "@/services/ordersService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Cargar carrito inicial
  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ordersService.getCart();
      setCart(data);
    } catch (error) {
      console.error("No se pudo sincronizar el carrito de Quilla.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Lógica de Ingeniería: Añadir y abrir drawer
  const addToCart = async (variantId, quantity) => {
    try {
      const data = await ordersService.addItemToCart(variantId, quantity);
      setCart(data);
      setIsDrawerOpen(true); // Abrimos el drawer automáticamente
      return { success: true };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, error: error.response?.data?.error || "Error" };
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const data = await ordersService.updateItemQuantity(itemId, quantity);
      setCart(data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const data = await ordersService.removeItemFromCart(itemId);
      setCart(data);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const value = {
    cart,
    loading,
    isDrawerOpen,
    setIsDrawerOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    totalItems: cart?.total_items || 0,
    totalPrice: cart?.total_price || 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  // Si el contexto es undefined, significa que estamos fuera del Provider
  if (context === undefined) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }

  return context;
};
