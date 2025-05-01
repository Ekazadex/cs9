import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  const hoverClass = hover ? 'hover:shadow-lg' : '';
  
  return (
    <div className={`card ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;