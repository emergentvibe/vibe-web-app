import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accent-glow focus:ring-indigo-500',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-400',
    outline: 'border border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-400'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const fullWidthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidthClass} ${className}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button; 