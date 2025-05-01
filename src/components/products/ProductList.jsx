import { useState } from 'react';
import ProductCard from './ProductCard';
import Loader from '../common/Loader';
import { FiSearch, FiFilter } from 'react-icons/fi';

const ProductList = ({ products, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort products based on selected criteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'store') {
      return a.store_name.localeCompare(b.store_name);
    }
    return 0;
  });  

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="store">Sort by Store</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}  
