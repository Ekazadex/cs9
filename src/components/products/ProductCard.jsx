import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { FiShoppingCart, FiEye } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  // If image URL is not provided, use a placeholder
  const imageUrl = product.image || `https://source.unsplash.com/random/300x200/?product-${product.id}`;
  
  return (
    <Card className="h-full flex flex-col">
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img 
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
          <span className="bg-primary-100 text-primary-800 px-2 py-1 text-xs font-medium rounded-full">
            ${product.price?.toFixed(2) || '0.00'}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description || 'No description available'}
        </p>
        
        <div className="mt-2 text-xs text-gray-500">
          {product.store_name && (
            <span className="flex items-center">
              <span className="mr-1">•</span> {product.store_name}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 pt-0 mt-auto flex space-x-2">
        <Button
          variant="primary"
          className="flex-1 flex items-center justify-center space-x-2"
        >
          <FiShoppingCart className="text-white" />
          <span>Add to Cart</span>
        </Button>
        
        <Link to={`/products/${product.id}`} className="btn btn-outline flex items-center justify-center">
          <FiEye />
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;