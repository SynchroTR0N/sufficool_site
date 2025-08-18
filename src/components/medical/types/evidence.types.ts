// Evidence Component TypeScript Interfaces

export type EvidenceType = 
  | 'study' 
  | 'citation' 
  | 'guideline' 
  | 'clinical-trial' 
  | 'meta-analysis'
  | 'systematic-review'
  | 'case-study'
  | 'expert-opinion';

export type EvidenceLevel = 
  | '1A'   // Systematic review of RCTs
  | '1B'   // Individual RCT
  | '2A'   // Systematic review of cohort studies
  | '2B'   // Individual cohort study
  | '2C'   // Case-control studies
  | '3A'   // Systematic review of case-control studies
  | '3B'   // Individual case-control study
  | '4'    // Case series
  | '5';   // Expert opinion

export type CitationFormat = 'APA' | 'MLA' | 'Vancouver' | 'JAMA' | 'Chicago';

export interface Author {
  firstName: string;
  lastName: string;
  middleInitial?: string;
  affiliation?: string;
  orcid?: string;
}

export interface Citation {
  title: string;
  authors: Author[];
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  year: number;
  month?: number;
  pmid?: string;
  doi?: string;
  pmc?: string;
  url?: string;
}

export interface ClinicalSignificance {
  level: 'high' | 'moderate' | 'low' | 'uncertain';
  description: string;
  clinicalImpact?: string;
  patientBenefit?: string;
}

export interface StudyLimitations {
  category: 'methodology' | 'sample-size' | 'bias' | 'generalizability' | 'other';
  description: string;
  impact: 'minor' | 'moderate' | 'major';
}

export interface KeyFinding {
  finding: string;
  significance: string;
  statisticalData?: {
    pValue?: number;
    confidenceInterval?: string;
    hazardRatio?: number;
    oddsRatio?: number;
    riskReduction?: number;
  };
}

export interface EvidenceProps {
  // Core identification
  type: EvidenceType;
  evidenceLevel: EvidenceLevel;
  
  // Citation information
  citation: Citation;
  
  // Content
  title: string;
  summary: string;
  keyFindings?: KeyFinding[];
  clinicalSignificance?: ClinicalSignificance;
  limitations?: StudyLimitations[];
  
  // Medical specifics
  patientPopulation?: string;
  interventions?: string[];
  outcomes?: string[];
  followUpDuration?: string;
  
  // Display options
  expandable?: boolean;
  showCitation?: boolean;
  showFullText?: boolean;
  compact?: boolean;
  
  // Styling
  className?: string;
  
  // Content sections
  children?: React.ReactNode;
  
  // Callbacks
  onCitationClick?: (citation: Citation) => void;
  onExpandToggle?: (expanded: boolean) => void;
}

export interface EvidenceCardProps extends Omit<EvidenceProps, 'children'> {
  onClick?: () => void;
  selected?: boolean;
  showActions?: boolean;
}

// Evidence quality assessment
export interface QualityAssessment {
  cochrane?: {
    randomSequence: 'low' | 'high' | 'unclear';
    allocation: 'low' | 'high' | 'unclear';
    blinding: 'low' | 'high' | 'unclear';
    incompleteData: 'low' | 'high' | 'unclear';
    selectiveReporting: 'low' | 'high' | 'unclear';
    otherBias: 'low' | 'high' | 'unclear';
  };
  grade?: {
    quality: 'very-low' | 'low' | 'moderate' | 'high';
    factors: ('risk-of-bias' | 'inconsistency' | 'indirectness' | 'imprecision' | 'publication-bias')[];
  };
}

export interface EvidenceWithQuality extends EvidenceProps {
  qualityAssessment?: QualityAssessment;
}

// Data visualization interfaces
export interface MetaAnalysisData {
  studyName: string;
  effectSize: number;
  lowerCI: number;
  upperCI: number;
  weight?: number;
  pValue?: number;
  nullValue?: number;
  sampleSize?: number;
}

export interface EvidenceQualityData {
  studyName: string;
  qualityAssessment: {
    [domain: string]: 'Low' | 'Moderate' | 'High' | 'Very High';
  };
  overallQuality: 'very-low' | 'low' | 'moderate' | 'high';
}

export interface TrendData {
  year: number;
  count: number;
  category?: string;
  evidenceType?: EvidenceType;
}

export interface RiskOfBiasData {
  studyName: string;
  domains: {
    randomSequence: 'low' | 'high' | 'unclear';
    allocation: 'low' | 'high' | 'unclear';
    blinding: 'low' | 'high' | 'unclear';
    incompleteData: 'low' | 'high' | 'unclear';
    selectiveReporting: 'low' | 'high' | 'unclear';
    otherBias: 'low' | 'high' | 'unclear';
  };
}

export type VisualizationType = 
  | 'forest-plot'
  | 'evidence-quality'
  | 'publication-trends'
  | 'effect-size'
  | 'risk-of-bias'
  | 'funnel-plot'
  | 'network-meta-analysis';

export interface EvidenceVisualizationProps {
  type: VisualizationType;
  data: MetaAnalysisData[] | EvidenceQualityData[] | TrendData[] | RiskOfBiasData[] | any[];
  width?: number;
  height?: number;
  interactive?: boolean;
  showLegend?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
  onDataPointClick?: (dataPoint: any) => void;
  onExport?: (format: 'svg' | 'png' | 'csv') => void;
}