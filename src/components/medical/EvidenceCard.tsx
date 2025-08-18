import React from 'react';
import { motion } from 'framer-motion';
import { EvidenceCardProps } from './types/evidence.types';

// Helper function to get evidence level color
const getEvidenceLevelColor = (level: string): string => {
  const colors = {
    '1A': 'bg-green-100 text-green-800 border-green-200',
    '1B': 'bg-green-50 text-green-700 border-green-100',
    '2A': 'bg-blue-100 text-blue-800 border-blue-200',
    '2B': 'bg-blue-50 text-blue-700 border-blue-100',
    '2C': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    '3A': 'bg-orange-100 text-orange-800 border-orange-200',
    '3B': 'bg-orange-50 text-orange-700 border-orange-100',
    '4': 'bg-red-100 text-red-800 border-red-200',
    '5': 'bg-gray-100 text-gray-800 border-gray-200'
  };
  return colors[level as keyof typeof colors] || colors['5'];
};

// Helper function to get evidence type icon
const getEvidenceTypeIcon = (type: string): string => {
  const icons = {
    'study': '📊',
    'citation': '📄',
    'guideline': '📋',
    'clinical-trial': '🧪',
    'meta-analysis': '🔍',
    'systematic-review': '📚',
    'case-study': '👤',
    'expert-opinion': '🎓'
  };
  return icons[type as keyof typeof icons] || '📄';
};

// Helper function to format authors
const formatAuthors = (authors: any[]): string => {
  if (!authors || authors.length === 0) return 'Unknown authors';
  
  if (authors.length === 1) {
    return `${authors[0].lastName}, ${authors[0].firstName[0]}.`;
  } else if (authors.length <= 2) {
    return authors.map(author => `${author.lastName}, ${author.firstName[0]}.`).join(' & ');
  } else {
    return `${authors[0].lastName}, ${authors[0].firstName[0]}. et al.`;
  }
};

// Helper function to truncate text
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

const EvidenceCard: React.FC<EvidenceCardProps> = ({
  type,
  evidenceLevel,
  citation,
  title,
  summary,
  keyFindings = [],
  clinicalSignificance,
  patientPopulation,
  outcomes = [],
  onClick,
  selected = false,
  showActions = true,
  className = ''
}) => {
  const handleClick = () => {
    onClick?.();
  };

  const handleCitationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (citation.pmid) {
      window.open(`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`, '_blank');
    } else if (citation.doi) {
      window.open(`https://doi.org/${citation.doi}`, '_blank');
    }
  };

  return (
    <motion.div
      className={`
        bg-white border-2 rounded-lg shadow-sm cursor-pointer transition-all duration-200
        ${selected 
          ? 'border-blue-500 shadow-md ring-2 ring-blue-200' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
        ${className}
      `}
      onClick={handleClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <span className="text-xl flex-shrink-0" role="img" aria-label={`${type} evidence`}>
              {getEvidenceTypeIcon(type)}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-md font-semibold text-gray-900 leading-tight line-clamp-2">
                {truncateText(title, 100)}
              </h3>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEvidenceLevelColor(evidenceLevel)}`}>
                  Level {evidenceLevel}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 capitalize">
                  {type.replace('-', ' ')}
                </span>
              </div>
            </div>
          </div>
          
          {selected && (
            <div className="ml-2 flex-shrink-0">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Authors and Journal */}
        <div className="text-sm text-gray-600 mb-2">
          {formatAuthors(citation.authors)}
          {citation.journal && (
            <span className="ml-2">
              • <span className="italic">{citation.journal}</span>
            </span>
          )}
          {citation.year && (
            <span className="ml-2">• {citation.year}</span>
          )}
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
          {truncateText(summary, 200)}
        </p>

        {/* Clinical Significance Badge */}
        {clinicalSignificance && (
          <div className="mb-3">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              clinicalSignificance.level === 'high' ? 'bg-green-100 text-green-800' :
              clinicalSignificance.level === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
              clinicalSignificance.level === 'low' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              🎯 {clinicalSignificance.level.charAt(0).toUpperCase() + clinicalSignificance.level.slice(1)} clinical significance
            </span>
          </div>
        )}

        {/* Key Findings Preview */}
        {keyFindings.length > 0 && (
          <div className="mb-3">
            <h5 className="text-xs font-semibold text-gray-700 mb-2">Key Finding:</h5>
            <div className="bg-blue-50 border-l-3 border-blue-400 p-2 rounded-r">
              <p className="text-xs text-blue-800">
                {truncateText(keyFindings[0].finding, 120)}
              </p>
              {keyFindings.length > 1 && (
                <p className="text-xs text-blue-600 mt-1">
                  +{keyFindings.length - 1} more finding{keyFindings.length > 2 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Study Details */}
        <div className="text-xs text-gray-500 space-y-1">
          {patientPopulation && (
            <div>
              <span className="font-medium">Population:</span> {truncateText(patientPopulation, 60)}
            </div>
          )}
          {outcomes.length > 0 && (
            <div>
              <span className="font-medium">Outcomes:</span> {outcomes.slice(0, 2).join(', ')}
              {outcomes.length > 2 && ` +${outcomes.length - 2} more`}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      {showActions && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {citation.pmid && (
              <button
                onClick={handleCitationClick}
                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                title="View on PubMed"
              >
                📄 PubMed
              </button>
            )}
            {citation.doi && !citation.pmid && (
              <button
                onClick={handleCitationClick}
                className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                title="View DOI"
              >
                🔗 DOI
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Click to expand</span>
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EvidenceCard;