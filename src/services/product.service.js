import api from './api';

export const getAllProducts = () => {
  return api.get('/products');  // Changed from '/item' to '/products'
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);  // Changed from '/item/:id' to '/products/:id'
};

// Add any other product-related API calls