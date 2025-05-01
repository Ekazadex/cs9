import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching products
    const fetchProducts = async () => {
      try {
        // Replace this with your actual API call
        const mockProducts = [
          { id: 1, name: 'Product 1', price: 19.99, image: 'placeholder.jpg' },
          { id: 2, name: 'Product 2', price: 29.99, image: 'placeholder.jpg' },
          { id: 3, name: 'Product 3', price: 39.99, image: 'placeholder.jpg' },
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;