import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EvidenceProps, 
  CitationFormat, 
  KeyFinding, 
  StudyLimitations,
  ClinicalSignificance 
} from './types/evidence.types';

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
    'clinical-trial': '🧬',
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
  } else if (authors.length <= 3) {
    return authors.map(author => `${author.lastName}, ${author.firstName[0]}.`).join(', ');
  } else {
    return `${authors[0].lastName}, ${authors[0].firstName[0]}. et al.`;
  }
};

// Helper function to generate citation
const generateCitation = (citation: any, format: CitationFormat = 'APA'): string => {
  const authorsStr = formatAuthors(citation.authors);
  
  switch (format) {
    case 'APA':
      return `${authorsStr} (${citation.year}). ${citation.title}. ${citation.journal || 'Unknown Journal'}${citation.volume ? `, ${citation.volume}` : ''}${citation.pages ? `, ${citation.pages}` : ''}. ${citation.doi ? `https://doi.org/${citation.doi}` : ''}`;
    
    case 'Vancouver':
      return `${authorsStr} ${citation.title}. ${citation.journal || 'Unknown Journal'}. ${citation.year}${citation.volume ? `;${citation.volume}` : ''}${citation.issue ? `(${citation.issue})` : ''}${citation.pages ? `:${citation.pages}` : ''}. ${citation.doi ? `doi: ${citation.doi}` : ''}`;
    
    default:
      return `${authorsStr} (${citation.year}). ${citation.title}. ${citation.journal || 'Unknown Journal'}.`;
  }
};

const Evidence: React.FC<EvidenceProps> = ({
  type,
  evidenceLevel,
  citation,
  title,
  summary,
  keyFindings = [],
  clinicalSignificance,
  limitations = [],
  patientPopulation,
  interventions = [],
  outcomes = [],
  followUpDuration,
  expandable = true,
  showCitation = true,
  showFullText = false,
  compact = false,
  className = '',
  children,
  onCitationClick,
  onExpandToggle
}) => {
  const [isExpanded, setIsExpanded] = useState(showFullText);
  const [citationFormat, setCitationFormat] = useState<CitationFormat>('APA');

  const handleExpandToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandToggle?.(newExpanded);
  };

  const handleCitationClick = () => {
    onCitationClick?.(citation);
  };

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <span className="text-2xl" role="img" aria-label={`${type} evidence`}>
              {getEvidenceTypeIcon(type)}
            </span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {title}
              </h3>
              {!compact && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEvidenceLevelColor(evidenceLevel)}`}>
                    Level {evidenceLevel}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 capitalize">
                    {type.replace('-', ' ')}
                  </span>
                  {citation.year && (
                    <span className="text-sm text-gray-500">
                      {citation.year}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {expandable && (
            <button
              onClick={handleExpandToggle}
              className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-md hover:bg-gray-50"
              aria-label={isExpanded ? 'Collapse evidence' : 'Expand evidence'}
            >
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Summary */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {summary}
          </p>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {(isExpanded || !expandable) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-6"
            >
              {/* Key Findings */}
              {keyFindings.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Key Findings
                  </h4>
                  <ul className="space-y-2">
                    {keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">
                            {finding.finding}
                          </p>
                          {finding.significance && (
                            <p className="text-xs text-gray-500 mt-1">
                              <strong>Significance:</strong> {finding.significance}
                            </p>
                          )}
                          {finding.statisticalData && (
                            <div className="text-xs text-gray-500 mt-1 space-x-3">
                              {finding.statisticalData.pValue && (
                                <span>p = {finding.statisticalData.pValue}</span>
                              )}
                              {finding.statisticalData.confidenceInterval && (
                                <span>CI: {finding.statisticalData.confidenceInterval}</span>
                              )}
                              {finding.statisticalData.hazardRatio && (
                                <span>HR: {finding.statisticalData.hazardRatio}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clinical Significance */}
              {clinicalSignificance && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Clinical Significance
                  </h4>
                  <div className={`p-3 rounded-md border-l-4 ${
                    clinicalSignificance.level === 'high' ? 'bg-green-50 border-green-400' :
                    clinicalSignificance.level === 'moderate' ? 'bg-yellow-50 border-yellow-400' :
                    clinicalSignificance.level === 'low' ? 'bg-orange-50 border-orange-400' :
                    'bg-gray-50 border-gray-400'
                  }`}>
                    <div className="flex items-center mb-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        clinicalSignificance.level === 'high' ? 'bg-green-100 text-green-800' :
                        clinicalSignificance.level === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        clinicalSignificance.level === 'low' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {clinicalSignificance.level.charAt(0).toUpperCase() + clinicalSignificance.level.slice(1)} significance
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {clinicalSignificance.description}
                    </p>
                    {clinicalSignificance.patientBenefit && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Patient benefit:</strong> {clinicalSignificance.patientBenefit}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Study Details */}
              {(patientPopulation || interventions.length > 0 || outcomes.length > 0 || followUpDuration) && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Study Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {patientPopulation && (
                      <div>
                        <span className="font-medium text-gray-600">Population:</span>
                        <p className="text-gray-700 mt-1">{patientPopulation}</p>
                      </div>
                    )}
                    {interventions.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-600">Interventions:</span>
                        <ul className="text-gray-700 mt-1">
                          {interventions.map((intervention, index) => (
                            <li key={index}>• {intervention}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {outcomes.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-600">Outcomes:</span>
                        <ul className="text-gray-700 mt-1">
                          {outcomes.map((outcome, index) => (
                            <li key={index}>• {outcome}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {followUpDuration && (
                      <div>
                        <span className="font-medium text-gray-600">Follow-up:</span>
                        <p className="text-gray-700 mt-1">{followUpDuration}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Limitations */}
              {limitations.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Study Limitations
                  </h4>
                  <ul className="space-y-2">
                    {limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                          limitation.impact === 'major' ? 'bg-red-500' :
                          limitation.impact === 'moderate' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">
                            {limitation.description}
                          </p>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                            limitation.impact === 'major' ? 'bg-red-100 text-red-800' :
                            limitation.impact === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {limitation.impact} impact
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom children content */}
              {children && (
                <div className="prose prose-sm max-w-none">
                  {children}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Citation */}
      {showCitation && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h5 className="text-xs font-semibold text-gray-700 mb-2">
                Citation
              </h5>
              <div className="text-xs text-gray-600 leading-relaxed">
                {generateCitation(citation, citationFormat)}
              </div>
              
              {/* Links */}
              <div className="flex items-center space-x-4 mt-3">
                {citation.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="mr-1">📄</span>
                    PubMed
                  </a>
                )}
                {citation.doi && (
                  <a
                    href={`https://doi.org/${citation.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="mr-1">🔗</span>
                    DOI
                  </a>
                )}
                {citation.pmc && (
                  <a
                    href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${citation.pmc}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="mr-1">📚</span>
                    PMC
                  </a>
                )}
              </div>
            </div>
            
            {/* Citation format selector */}
            <div className="ml-4">
              <select
                value={citationFormat}
                onChange={(e) => setCitationFormat(e.target.value as CitationFormat)}
                className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="APA">APA</option>
                <option value="Vancouver">Vancouver</option>
                <option value="MLA">MLA</option>
                <option value="JAMA">JAMA</option>
                <option value="Chicago">Chicago</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Evidence;