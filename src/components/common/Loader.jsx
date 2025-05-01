import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative">
        <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary-600 ${sizeClasses[size]}`}></div>
        <div className={`absolute top-0 left-0 animate-spin rounded-full border-t-2 border-r-2 border-secondary-600 ${sizeClasses[size]} animate-[spin_1s_linear_infinite]`} style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  );
};

export default Loader;