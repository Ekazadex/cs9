import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch product details
    const fetchProduct = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock product data - replace with actual API call
        const mockProducts = {
          1: { 
            id: 1, 
            name: 'Smartphone X', 
            price: 499.99, 
            image: '/api/placeholder/400/400',
            category: 'Electronics',
            stock: 15,
            description: 'The latest Smartphone X features a high-resolution display, powerful processor, and an amazing camera system. Perfect for photography enthusiasts and mobile gamers alike.',
            specs: ['6.5" OLED display', '128GB storage', '12MP triple camera', 'Fingerprint sensor', 'Fast charging']
          },
          2: { 
            id: 2, 
            name: 'Laptop Pro', 
            price: 1299.99, 
            image: '/api/placeholder/400/400',
            category: 'Electronics',
            stock: 8,
            description: 'Experience unparalleled performance with the Laptop Pro. Designed for professionals who need reliable computing power for demanding tasks.',
            specs: ['15.6" 4K display', '16GB RAM', '512GB SSD', 'Dedicated graphics', 'Backlit keyboard']
          },
          3: { 
            id: 3, 
            name: 'Wireless Headphones', 
            price: 89.99, 
            image: '/api/placeholder/400/400',
            category: 'Audio',
            stock: 23,
            description: 'Immerse yourself in rich, detailed sound with these premium wireless headphones. Features active noise cancellation and long battery life.',
            specs: ['Bluetooth 5.0', '30-hour battery life', 'Active noise cancellation', 'Foldable design', 'Built-in microphone']
          },
          4: { 
            id: 4, 
            name: 'Coffee Maker', 
            price: 59.99, 
            image: '/api/placeholder/400/400',
            category: 'Home',
            stock: 12,
            description: 'Start your morning right with this programmable coffee maker. Brew your favorite coffee with precision and convenience.',
            specs: ['12-cup capacity', 'Programmable timer', 'Keep-warm function', 'Removable filter basket', 'Auto shut-off']
          },
          5: { 
            id: 5, 
            name: 'Gaming Console', 
            price: 399.99, 
            image: '/api/placeholder/400/400',
            category: 'Gaming',
            stock: 5,
            description: 'The ultimate gaming experience awaits with this next-generation console. Features stunning graphics and a vast library of games.',
            specs: ['4K gaming', '1TB storage', 'Ray tracing support', 'Digital edition', 'Wireless controller included']
          },
          6: { 
            id: 6, 
            name: 'Wireless Mouse', 
            price: 29.99, 
            image: '/api/placeholder/400/400',
            category: 'Accessories',
            stock: 30,
            description: 'Enhance your computing experience with this ergonomic wireless mouse. Designed for comfort during extended use.',
            specs: ['Bluetooth connectivity', '12-month battery life', 'Adjustable DPI', 'Ergonomic design', 'Compatible with all major OS']
          }
        };
        
        const foundProduct = mockProducts[id];
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        
        setProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name}(s) to cart`);
    // Implement actual cart functionality here
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <header className="detail-header">
          <div className="store-branding">
            <h1>Zadex</h1>
          </div>
          <div className="user-actions">
            <span className="user-email">{localStorage.getItem('userEmail')}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <header className="detail-header">
          <div className="store-branding">
            <h1>Zadex</h1>
          </div>
          <div className="user-actions">
            <span className="user-email">{localStorage.getItem('userEmail')}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </header>
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="back-to-products">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <header className="detail-header">
        <div className="store-branding">
          <Link to="/products" className="logo-link">
            <h1>Zadex</h1>
          </Link>
        </div>
        <div className="user-actions">
          <span className="user-email">{localStorage.getItem('userEmail')}</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>
      
      <div className="breadcrumb">
        <Link to="/products">Products</Link> / {product.name}
      </div>
      
      <div className="product-detail-container">
        <div className="product-detail-left">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>
        
        <div className="product-detail-right">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <div className="product-detail-stock">
            <span className={product.stock > 10 ? "in-stock" : "low-stock"}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
          
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-detail-specs">
            <h3>Specifications</h3>
            <ul>
              {product.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
          
          {product.stock > 0 && (
            <>
              <div className="product-detail-quantity">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    id="quantity" 
                    min="1" 
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button 
                    onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="add-to-cart-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </>
          )}
          
          {product.stock === 0 && (
            <div className="out-of-stock-message">
              This product is currently out of stock.
            </div>
          )}
          
          <div className="back-link">
            <Link to="/products">← Back to all products</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;