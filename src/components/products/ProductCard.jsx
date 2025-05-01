import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiEye } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative pb-[75%]">
        <img
          src={product.image || `https://via.placeholder.com/300x200?text=${product.name}`}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary-600">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            product.stock > 10 
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {product.stock} left
          </span>
        </div>
        
        <div className="flex gap-2">
          <button
            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
            disabled={product.stock === 0}
          >
            <FiShoppingCart />
            Add to Cart
          </button>
          
          <Link
            to={`/products/${product.id}`}
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <FiEye size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;