import React from 'react';

interface ProgressiveContentProps {
  children?: React.ReactNode;
  className?: string;
}

const ProgressiveContent: React.FC<ProgressiveContentProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`progressive-content ${className}`}>
      {children}
    </div>
  );
};

export default ProgressiveContent;