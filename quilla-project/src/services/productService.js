import api from '../api/axios';

/**
 * Obtiene la lista de productos para la grilla.
 * Soporta filtros (categoría, orden, búsqueda).
 */
export const getProducts = async (params = {}) => {
  try {
    // GET http://127.0.0.1:8000/api/products/items/?category__slug=...
    const response = await api.get('products/items/', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Obtiene el detalle de un producto específico por su slug.
 */
export const getProductBySlug = async (slug) => {
  try {
    // GET http://127.0.0.1:8000/api/products/items/slug-del-producto/
    const response = await api.get(`products/items/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    throw error;
  }
};