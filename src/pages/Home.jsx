import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CS Modul 9 - Advanced Frontend
          </h1>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to Our E-Commerce Platform
            </h2>
            
            <div className="space-y-6 text-left">
              <div className="border-b pb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Key Features:
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Browse through our extensive product catalog</li>
                  <li>Secure user authentication system</li>
                  <li>Detailed product information and images</li>
                  <li>Responsive design for all devices</li>
                  <li>Easy navigation and search functionality</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Getting Started:
                </h3>
                <p className="text-gray-600 mb-4">
                  To explore our products and make purchases, please sign in to your account. 
                  New users can create an account through our simple registration process.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    to="/auth"
                    className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/products"
                    className="px-6 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;