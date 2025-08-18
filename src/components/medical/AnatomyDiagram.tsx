
import React from 'react';

interface AnatomyDiagramProps {
  title?: string;
  description?: string;
  highlights?: string[];
  className?: string;
}

const AnatomyDiagram: React.FC<AnatomyDiagramProps> = ({ 
  title = "Anatomy Diagram", 
  description = "",
  highlights = [],
  className = '' 
}) => {
  return (
    <div className={`anatomy-diagram bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-48 h-48 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-4xl text-blue-500">🫁</span>
          </div>
          <p className="text-sm text-gray-600">
            Interactive anatomy diagram
            {highlights.length > 0 && (
              <span className="block mt-1 text-xs">
                Highlighting: {highlights.join(', ')}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnatomyDiagram;
