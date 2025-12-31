import React from 'react';

export default function Card({ 
  children, 
  className = '',
  padding = 'p-6',
  hover = false 
}) {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm 
        ${padding}
        ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}