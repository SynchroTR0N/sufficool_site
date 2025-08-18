import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Citation, CitationFormat, Author } from './types/evidence.types';

interface CitationManagerProps {
  citations: Citation[];
  onCitationUpdate?: (citations: Citation[]) => void;
  onExport?: (format: string, citations: Citation[]) => void;
  className?: string;
}

// Helper function to format authors for different citation styles
const formatAuthorsForStyle = (authors: Author[], format: CitationFormat, maxAuthors: number = 6): string => {
  if (!authors || authors.length === 0) return 'Unknown authors';
  
  const formatAuthor = (author: Author, format: CitationFormat): string => {
    switch (format) {
      case 'APA':
        return `${author.lastName}, ${author.firstName.charAt(0)}.${author.middleInitial ? ` ${author.middleInitial}.` : ''}`;
      case 'MLA':
        return authors.indexOf(author) === 0 
          ? `${author.lastName}, ${author.firstName}${author.middleInitial ? ` ${author.middleInitial}.` : ''}` 
          : `${author.firstName}${author.middleInitial ? ` ${author.middleInitial}.` : ''} ${author.lastName}`;
      case 'Vancouver':
        return `${author.lastName} ${author.firstName.charAt(0)}${author.middleInitial ? `${author.middleInitial}` : ''}`;
      case 'JAMA':
        return `${author.lastName} ${author.firstName.charAt(0)}${author.middleInitial ? `${author.middleInitial}` : ''}`;
      case 'Chicago':
        return authors.indexOf(author) === 0
          ? `${author.lastName}, ${author.firstName}${author.middleInitial ? ` ${author.middleInitial}.` : ''}`
          : `${author.firstName}${author.middleInitial ? ` ${author.middleInitial}.` : ''} ${author.lastName}`;
      default:
        return `${author.firstName} ${author.lastName}`;
    }
  };
  
  if (authors.length === 1) {
    return formatAuthor(authors[0], format);
  } else if (authors.length <= maxAuthors) {
    const formattedAuthors = authors.map(author => formatAuthor(author, format));
    if (format === 'MLA' || format === 'Chicago') {
      if (authors.length === 2) {
        return `${formattedAuthors[0]} and ${formattedAuthors[1]}`;
      } else {
        return `${formattedAuthors.slice(0, -1).join(', ')}, and ${formattedAuthors[formattedAuthors.length - 1]}`;
      }
    } else {
      return formattedAuthors.join(', ');
    }
  } else {
    if (format === 'Vancouver' || format === 'JAMA') {
      return `${formatAuthor(authors[0], format)}, et al`;
    } else {
      const firstSix = authors.slice(0, 6).map(author => formatAuthor(author, format));
      return `${firstSix.join(', ')}, ... ${formatAuthor(authors[authors.length - 1], format)}`;
    }
  }
};

// Generate citation text based on format
const generateCitation = (citation: Citation, format: CitationFormat): string => {
  const authorsStr = formatAuthorsForStyle(citation.authors, format);
  const { title, journal, volume, issue, pages, year, month, doi, pmid, pmc, url } = citation;
  
  switch (format) {
    case 'APA':
      return `${authorsStr} (${year}${month ? `, ${new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long' })}` : ''}). ${title}. ${journal ? `*${journal}*` : 'Unknown Journal'}${volume ? `, ${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `, ${pages}` : ''}. ${doi ? `https://doi.org/${doi}` : pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : url || ''}`;
    
    case 'MLA':
      return `${authorsStr} "${title}." ${journal ? `*${journal}*` : 'Unknown Journal'}${volume ? `, vol. ${volume}` : ''}${issue ? `, no. ${issue}` : ''}${year ? `, ${year}` : ''}${pages ? `, pp. ${pages}` : ''}. ${doi ? `doi:${doi}` : pmid ? `PubMed, pmid:${pmid}` : 'Web'}${!doi && !pmid && url ? `. ${url}` : ''}${!doi && !pmid && !url ? '. Print' : ''}.`;
    
    case 'Vancouver':
      return `${authorsStr}. ${title}. ${journal || 'Unknown Journal'}. ${year}${month ? ` ${new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short' })}` : ''}${volume ? `;${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `:${pages}` : ''}. ${doi ? `doi: ${doi}` : pmid ? `PMID: ${pmid}` : pmc ? `PMCID: ${pmc}` : ''}.`;
    
    case 'JAMA':
      return `${authorsStr}. ${title}. ${journal ? `*${journal}*` : 'Unknown Journal'}. ${year}${volume ? `;${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `:${pages}` : ''}. ${doi ? `doi:${doi}` : ''}${pmid ? ` [PubMed: ${pmid}]` : ''}`;
    
    case 'Chicago':
      return `${authorsStr} "${title}." ${journal ? `*${journal}*` : 'Unknown Journal'}${volume ? ` ${volume}` : ''}${issue ? `, no. ${issue}` : ''} (${year}${month ? `, ${new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long' })}` : ''}${pages ? `: ${pages}` : ''}. ${doi ? `https://doi.org/${doi}` : url || ''}.`;
    
    default:
      return `${authorsStr} (${year}). ${title}. ${journal || 'Unknown Journal'}.`;
  }
};

// Generate BibTeX format
const generateBibTeX = (citation: Citation): string => {
  const { title, authors, journal, volume, issue, pages, year, month, doi, pmid, url } = citation;
  const firstAuthor = authors[0];
  const key = `${firstAuthor?.lastName || 'unknown'}${year}`;
  
  const authorsList = authors.map(author => 
    `${author.firstName}${author.middleInitial ? ` ${author.middleInitial}.` : ''} ${author.lastName}`
  ).join(' and ');
  
  return `@article{${key},
  title={${title}},
  author={${authorsList}},
  journal={${journal || 'Unknown Journal'}},
  volume={${volume || ''}},
  number={${issue || ''}},
  pages={${pages || ''}},
  year={${year}},
  month={${month || ''}},
  doi={${doi || ''}},
  pmid={${pmid || ''}},
  url={${url || (doi ? `https://doi.org/${doi}` : pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : '')}}
}`;
};

// Generate RIS format
const generateRIS = (citation: Citation): string => {
  const { title, authors, journal, volume, issue, pages, year, month, doi, pmid, url } = citation;
  
  let ris = 'TY  - JOUR\n';
  
  authors.forEach(author => {
    ris += `AU  - ${author.lastName}, ${author.firstName}${author.middleInitial ? ` ${author.middleInitial}.` : ''}\n`;
  });
  
  ris += `TI  - ${title}\n`;
  if (journal) ris += `JO  - ${journal}\n`;
  if (volume) ris += `VL  - ${volume}\n`;
  if (issue) ris += `IS  - ${issue}\n`;
  if (pages) ris += `SP  - ${pages.split('-')[0]}\n`;
  if (pages && pages.includes('-')) ris += `EP  - ${pages.split('-')[1]}\n`;
  ris += `PY  - ${year}\n`;
  if (month) ris += `DA  - ${year}/${month.toString().padStart(2, '0')}/01\n`;
  if (doi) ris += `DO  - ${doi}\n`;
  if (pmid) ris += `AN  - ${pmid}\n`;
  if (url) ris += `UR  - ${url}\n`;
  ris += 'ER  -\n';
  
  return ris;
};

const CitationManager: React.FC<CitationManagerProps> = ({
  citations,
  onCitationUpdate,
  onExport,
  className = ''
}) => {
  const [selectedFormat, setSelectedFormat] = useState<CitationFormat>('APA');
  const [selectedCitations, setSelectedCitations] = useState<Set<number>>(new Set());
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'author' | 'year' | 'title' | 'journal'>('year');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Filter and sort citations
  const filteredAndSortedCitations = useCallback(() => {
    let filtered = citations.filter(citation => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        citation.title.toLowerCase().includes(search) ||
        citation.authors.some(author => 
          `${author.firstName} ${author.lastName}`.toLowerCase().includes(search)
        ) ||
        (citation.journal && citation.journal.toLowerCase().includes(search))
      );
    });
    
    return filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;
      
      switch (sortBy) {
        case 'author':
          aValue = a.authors[0]?.lastName || 'ZZZ';
          bValue = b.authors[0]?.lastName || 'ZZZ';
          break;
        case 'year':
          aValue = a.year;
          bValue = b.year;
          break;
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'journal':
          aValue = a.journal || 'ZZZ';
          bValue = b.journal || 'ZZZ';
          break;
        default:
          aValue = a.year;
          bValue = b.year;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });
  }, [citations, searchTerm, sortBy, sortOrder]);
  
  // Toggle citation selection
  const toggleCitationSelection = (index: number) => {
    const newSelected = new Set(selectedCitations);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedCitations(newSelected);
  };
  
  // Select all citations
  const selectAllCitations = () => {
    if (selectedCitations.size === filteredAndSortedCitations().length) {
      setSelectedCitations(new Set());
    } else {
      setSelectedCitations(new Set(filteredAndSortedCitations().map((_, index) => index)));
    }
  };
  
  // Copy citations to clipboard
  const copyCitations = () => {
    const selectedCitationsList = Array.from(selectedCitations)
      .map(index => filteredAndSortedCitations()[index])
      .filter(Boolean);
    
    const formattedCitations = selectedCitationsList
      .map(citation => generateCitation(citation, selectedFormat))
      .join('\n\n');
    
    navigator.clipboard.writeText(formattedCitations)
      .then(() => {
        console.log('Citations copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy citations:', err);
      });
  };
  
  // Export citations in different formats
  const exportCitations = (format: 'bibtex' | 'ris' | 'csv' | 'json') => {
    const selectedCitationsList = Array.from(selectedCitations)
      .map(index => filteredAndSortedCitations()[index])
      .filter(Boolean);
    
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (format) {
      case 'bibtex':
        content = selectedCitationsList.map(generateBibTeX).join('\n\n');
        filename = 'citations.bib';
        mimeType = 'text/plain';
        break;
      case 'ris':
        content = selectedCitationsList.map(generateRIS).join('\n');
        filename = 'citations.ris';
        mimeType = 'text/plain';
        break;
      case 'csv':
        const headers = 'Title,Authors,Journal,Year,Volume,Issue,Pages,DOI,PMID';
        const rows = selectedCitationsList.map(citation => {
          const authors = citation.authors.map(a => `${a.firstName} ${a.lastName}`).join('; ');
          return `"${citation.title}","${authors}","${citation.journal || ''}",${citation.year},"${citation.volume || ''}","${citation.issue || ''}","${citation.pages || ''}","${citation.doi || ''}","${citation.pmid || ''}"`;
        });
        content = [headers, ...rows].join('\n');
        filename = 'citations.csv';
        mimeType = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify(selectedCitationsList, null, 2);
        filename = 'citations.json';
        mimeType = 'application/json';
        break;
    }
    
    // Create download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    onExport?.(format, selectedCitationsList);
    setShowExportMenu(false);
  };
  
  const processedCitations = filteredAndSortedCitations();
  
  return (
    <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Citation Manager ({citations.length} citation{citations.length !== 1 ? 's' : ''})
          </h3>
          
          <div className="flex items-center space-x-2">
            {/* Citation Format Selector */}
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as CitationFormat)}
              className="text-sm border border-gray-300 rounded px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="APA">APA Style</option>
              <option value="MLA">MLA Style</option>
              <option value="Vancouver">Vancouver Style</option>
              <option value="JAMA">JAMA Style</option>
              <option value="Chicago">Chicago Style</option>
            </select>
            
            {/* Export Menu */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={selectedCitations.size === 0}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Export ({selectedCitations.size})
              </button>
              
              <AnimatePresence>
                {showExportMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                  >
                    <div className="py-2">
                      <button
                        onClick={copyCitations}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        📋 Copy to Clipboard
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => exportCitations('bibtex')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        📄 Export as BibTeX
                      </button>
                      <button
                        onClick={() => exportCitations('ris')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        📄 Export as RIS
                      </button>
                      <button
                        onClick={() => exportCitations('csv')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        📊 Export as CSV
                      </button>
                      <button
                        onClick={() => exportCitations('json')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        🔧 Export as JSON
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Search and Sort Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search citations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'author' | 'year' | 'title' | 'journal')}
              className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="year">Year</option>
              <option value="author">Author</option>
              <option value="title">Title</option>
              <option value="journal">Journal</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              <svg className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
          </div>
          
          <button
            onClick={selectAllCitations}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {selectedCitations.size === processedCitations.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>
      
      {/* Citations List */}
      <div className="max-h-96 overflow-y-auto">
        {processedCitations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {searchTerm ? 'No citations match your search.' : 'No citations available.'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {processedCitations.map((citation, index) => (
              <motion.div
                key={`${citation.title}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  selectedCitations.has(index) ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedCitations.has(index)}
                    onChange={() => toggleCitationSelection(index)}
                    className="mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 leading-relaxed">
                      {generateCitation(citation, selectedFormat)}
                    </div>
                    
                    {/* Links */}
                    <div className="flex items-center space-x-4 mt-2">
                      {citation.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          📄 PubMed
                        </a>
                      )}
                      {citation.doi && (
                        <a
                          href={`https://doi.org/${citation.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          🔗 DOI
                        </a>
                      )}
                      {citation.pmc && (
                        <a
                          href={`https://www.ncbi.nlm.nih.gov/pmc/articles/${citation.pmc}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          📚 PMC
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CitationManager;