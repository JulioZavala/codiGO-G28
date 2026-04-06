import api from '../api/axios';

/**
 * Obtiene el carrito actual del usuario o sesión de invitado.
 * Endpoint: GET /api/orders/cart/current/
 */
export const getCart = async () => {
  try {
    const response = await api.get('orders/cart/current/');
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

/**
 * Añade una variante de producto al carrito.
 * Endpoint: POST /api/orders/cart/add_item/
 */
export const addItemToCart = async (variantId, quantity = 1) => {
  try {
    const response = await api.post('orders/cart/add_item/', {
      product_variant_id: variantId,
      quantity: quantity
    });
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

/**
 * Actualiza la cantidad de un item específico.
 * Endpoint: PATCH /api/orders/cart/update_item_quantity/
 */
export const updateItemQuantity = async (itemId, quantity) => {
  try {
    const response = await api.patch('orders/cart/update_item_quantity/', {
      item_id: itemId,
      quantity: quantity
    });
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
};

/**
 * Elimina un item del carrito.
 * Endpoint: DELETE /api/orders/cart/remove_item/
 */
export const removeItemFromCart = async (itemId) => {
  try {
    // En DELETE con Axios, los datos van en la propiedad 'data'
    const response = await api.delete('orders/cart/remove_item/', {
      data: { item_id: itemId }
    });
    return response.data;
  } catch (error) {
    console.error("Error removing item:", error);
    throw error;
  }
};