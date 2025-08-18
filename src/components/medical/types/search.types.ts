// Medical Search TypeScript Interfaces

import { EvidenceType, EvidenceLevel, Citation } from './evidence.types';

export interface SearchFilters {
  // Evidence characteristics
  evidenceTypes: EvidenceType[];
  evidenceLevels: EvidenceLevel[];
  
  // Publication details
  dateRange: {
    start?: Date;
    end?: Date;
  };
  journals?: string[];
  
  // Medical specifics
  medicalSpecialties?: string[];
  patientPopulations?: string[];
  interventions?: string[];
  outcomes?: string[];
  
  // Geographic/demographic
  countries?: string[];
  languages?: string[];
  
  // Database sources
  sources?: ('pubmed' | 'cochrane' | 'clinicaltrials' | 'embase' | 'other')[];
}

export interface SearchQuery {
  query: string;
  filters: SearchFilters;
  sortBy: 'relevance' | 'date' | 'citations' | 'evidence-level';
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

export interface SearchResult {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  pmid?: string;
  doi?: string;
  
  // Evidence metadata
  evidenceType: EvidenceType;
  evidenceLevel: EvidenceLevel;
  
  // Content
  abstract?: string;
  summary: string;
  keyFindings?: string[];
  
  // Search metadata
  relevanceScore: number;
  citationCount?: number;
  
  // Additional data
  meshTerms?: string[];
  keywords?: string[];
  
  // Full citation data
  citation: Citation;
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  totalPages: number;
  currentPage: number;
  searchTime: number;
  facets?: SearchFacets;
  suggestions?: string[];
}

export interface SearchFacets {
  evidenceTypes: FacetCount[];
  evidenceLevels: FacetCount[];
  journals: FacetCount[];
  years: FacetCount[];
  authors: FacetCount[];
  countries: FacetCount[];
  medicalSpecialties: FacetCount[];
}

export interface FacetCount {
  value: string;
  count: number;
  selected?: boolean;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: SearchQuery;
  createdAt: Date;
  lastUsed: Date;
  resultCount: number;
  isAlert?: boolean;
  alertFrequency?: 'daily' | 'weekly' | 'monthly';
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: Date;
  resultCount: number;
}

export interface MedicalTermSuggestion {
  term: string;
  type: 'mesh' | 'keyword' | 'author' | 'journal' | 'condition';
  category?: string;
  synonyms?: string[];
  definition?: string;
}

export interface SearchAutoComplete {
  query: string;
  suggestions: MedicalTermSuggestion[];
  recentSearches: string[];
  popularSearches: string[];
}

// PubMed specific interfaces
export interface PubMedSearchParams {
  term: string;
  retmax: number;
  retstart: number;
  sort: 'relevance' | 'pub_date' | 'author' | 'journal';
  datetype: 'pdat' | 'mdat' | 'edat';
  mindate?: string;
  maxdate?: string;
  field?: string;
}

export interface PubMedResult {
  pmid: string;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: string;
  month?: string;
  day?: string;
  doi?: string;
  pmc?: string;
  abstract?: string;
  meshTerms?: string[];
  publicationTypes?: string[];
  url: string;
}

// Component props
export interface MedicalSearchProps {
  placeholder?: string;
  initialQuery?: string;
  initialFilters?: Partial<SearchFilters>;
  onSearch?: (query: SearchQuery) => void;
  onResultSelect?: (result: SearchResult) => void;
  showFilters?: boolean;
  showSavedSearches?: boolean;
  enableAutoComplete?: boolean;
  enableAdvancedSearch?: boolean;
  maxResults?: number;
  className?: string;
}

export interface SearchFiltersProps {
  filters: SearchFilters;
  facets?: SearchFacets;
  onFiltersChange: (filters: SearchFilters) => void;
  onReset?: () => void;
  collapsed?: boolean;
  className?: string;
}

export interface SearchResultsProps {
  results: SearchResult[];
  loading?: boolean;
  error?: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  onResultClick: (result: SearchResult) => void;
  onPageChange: (page: number) => void;
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  showPagination?: boolean;
  resultsPerPage?: number;
  className?: string;
}