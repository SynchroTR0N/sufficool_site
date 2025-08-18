import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple placeholder - basic filter component
interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
  className?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onFiltersChange,
  className = ''
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    
    setSelectedFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const filterOptions = [
    'Clinical Trials',
    'Meta-Analysis',
    'Systematic Reviews',
    'Case Studies',
    'Guidelines'
  ];

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-2">
        {filterOptions.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedFilters.includes(option)}
              onChange={() => toggleFilter(option)}
              className="mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      
      {selectedFilters.length > 0 && (
        <button
          onClick={() => {
            setSelectedFilters([]);
            onFiltersChange?.([]);
          }}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default SearchFilters;