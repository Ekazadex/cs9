import api from './api';

export const login = (email, password) => {
  return api.post('/user/login', { email, password });
};

export const register = (name, email, password) => {
  return api.post('/user/register', { name, email, password });
};

export const logout = () => {
  // For a JWT-based auth, we just need to remove the token
  // No need for a server call unless you're managing sessions server-side
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};