import { useState, useEffect } from 'react';
import { getAllProducts, getProductById } from '../services/product.service';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      toast.error('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProduct = async (id) => {
    try {
      setLoading(true);
      const response = await getProductById(id);
      return response.data;
    } catch (err) {
      toast.error('Failed to load product details.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProduct,
  };
};