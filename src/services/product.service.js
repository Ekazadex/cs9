import api from './api';

export const getAllProducts = () => {
  return api.get('/item');
};

export const getProductById = (id) => {
  return api.get(`/item/${id}`);
};

export const getStores = () => {
  return api.get('/store');
};

export const createTransaction = (data) => {
  return api.post('/transaction', data);
};