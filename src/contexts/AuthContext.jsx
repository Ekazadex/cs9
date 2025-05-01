import { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/auth.service';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in by retrieving from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const response = await login(email, password);
      
      if (response.data) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Login successful!');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await register(name, email, password);
      
      if (response.data) {
        toast.success('Registration successful! Please log in.');
        return { success: true };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };
  
  const value = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};