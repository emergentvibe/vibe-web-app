import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const baseClasses = 'rounded-md px-3 py-2 bg-gray-700 text-white border focus:outline-none focus:ring-2 focus:border-transparent';
  const errorClasses = error ? 'border-red-400 focus:ring-red-500' : 'border-gray-600 focus:ring-accent';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseClasses} ${errorClasses} ${widthClass}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input; 