import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/product.service';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="products-page">
      <header className="products-header">
        <div className="store-branding">
          <h1>Zadex</h1>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="user-actions">
          <span className="user-email">{user?.email}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="products-controls">
        <h2>All Products</h2>
        <div className="sort-controls">
          <label htmlFor="sort">Sort by:</label>
          <select 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : (
        <div className="products-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-stock">
                    <span className={product.stock > 10 ? "in-stock" : "low-stock"}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </span>
                  </div>
                  <div className="product-actions">
                    <Link to={`/products/${product.id}`} className="view-details">View Details</Link>
                    <button 
                      className="add-to-cart"
                      disabled={product.stock === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;