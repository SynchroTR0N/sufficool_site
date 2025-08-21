import React from 'react';
import { MDXProvider } from '@mdx-js/react';

// Direct imports for SSR compatibility (no lazy loading)
import AnatomyDiagram from './medical/AnatomyDiagram';
import TreatmentTimeline from './medical/TreatmentTimeline';
import Evidence from './medical/Evidence';
import ProgressiveContent from './medical/ProgressiveContent';
import TreatmentComparison from './medical/TreatmentComparison';
import QuestionGenerator from './medical/QuestionGenerator';
import SideEffectsTable from './medical/SideEffectsTable';
import JourneyPhase from './medical/JourneyPhase';
import PatientJourney from './medical/PatientJourney';
import JourneyChecklist from './medical/JourneyChecklist';
import MedicalDisclaimer from './medical/MedicalDisclaimer';
import OutcomePredictor from './medical/OutcomePredictor';
import EvidenceVisualization from './medical/EvidenceVisualization';
import EvidenceCard from './medical/EvidenceCard';
import MedicalSearch from './medical/MedicalSearch';
import SearchFilters from './medical/SearchFilters';
import CitationManager from './medical/CitationManager';
import DoseDistribution from './medical/DoseDistribution';
import OutcomesChart from './medical/OutcomesChart';
import DecisionTree from './medical/DecisionTree';
import RiskCalculator from './medical/RiskCalculator';
import StageSelector from './medical/StageSelector';
import GlossaryTerm from './medical/GlossaryTerm';
import MedicalDiagram from './medical/MedicalDiagram';
import DiagramFlow from './medical/DiagramFlow';
import VideoEmbed from './medical/VideoEmbed';
import ImageComparison from './medical/ImageComparison';

// Fallback component for missing implementations
const FallbackComponent: React.FC<{ name: string; children?: React.ReactNode }> = ({ 
  name, 
  children 
}) => (
  <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
    <div className="text-sm text-gray-600 mb-2">
      <strong>{name}</strong> component (coming soon)
    </div>
    {children && (
      <div className="text-gray-700">
        {children}
      </div>
    )}
  </div>
);

// Error boundary for MDX components
class ComponentErrorBoundary extends React.Component<
  { name: string; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { name: string; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn(`Error in ${this.props.name} component:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackComponent name={this.props.name} />;
    }
    return this.props.children;
  }
}

// Safe wrapper that catches errors and provides fallbacks
const createSafeComponent = (Component: React.ComponentType<any>, name: string) => {
  return React.forwardRef<any, any>((props, ref) => {
    // SSR safety check
    if (typeof window === 'undefined') {
      // During SSR, validate props to prevent undefined errors
      const safeProps = Object.keys(props).reduce((acc, key) => {
        if (props[key] !== undefined && props[key] !== null) {
          acc[key] = props[key];
        }
        return acc;
      }, {} as any);
      
      try {
        return (
          <ComponentErrorBoundary name={name}>
            <Component ref={ref} {...safeProps} />
          </ComponentErrorBoundary>
        );
      } catch (error) {
        console.warn(`SSR error rendering ${name} component:`, error);
        return <FallbackComponent name={name} />;
      }
    }

    // Client-side rendering with full error boundary
    return (
      <ComponentErrorBoundary name={name}>
        <Component ref={ref} {...props} />
      </ComponentErrorBoundary>
    );
  });
};

// MDX components mapping with error handling
const mdxComponents = {
  // Anatomy & Visualization
  AnatomyDiagram: createSafeComponent(AnatomyDiagram, 'AnatomyDiagram'),
  TreatmentTimeline: createSafeComponent(TreatmentTimeline, 'TreatmentTimeline'),
  DoseDistribution: createSafeComponent(DoseDistribution, 'DoseDistribution'),
  MedicalDiagram: createSafeComponent(MedicalDiagram, 'MedicalDiagram'),
  DiagramFlow: createSafeComponent(DiagramFlow, 'DiagramFlow'),
  
  // Patient Journey
  PatientJourney: createSafeComponent(PatientJourney, 'PatientJourney'),
  JourneyPhase: createSafeComponent(JourneyPhase, 'JourneyPhase'),
  JourneyChecklist: createSafeComponent(JourneyChecklist, 'JourneyChecklist'),
  
  // Evidence & Information
  Evidence: createSafeComponent(Evidence, 'Evidence'),
  EvidenceCard: createSafeComponent(EvidenceCard, 'EvidenceCard'),
  EvidenceVisualization: createSafeComponent(EvidenceVisualization, 'EvidenceVisualization'),
  MedicalSearch: createSafeComponent(MedicalSearch, 'MedicalSearch'),
  SearchFilters: createSafeComponent(SearchFilters, 'SearchFilters'),
  CitationManager: createSafeComponent(CitationManager, 'CitationManager'),
  ProgressiveContent: createSafeComponent(ProgressiveContent, 'ProgressiveContent'),
  MedicalDisclaimer: createSafeComponent(MedicalDisclaimer, 'MedicalDisclaimer'),
  
  // Comparison & Analysis  
  TreatmentComparison: createSafeComponent(TreatmentComparison, 'TreatmentComparison'),
  OutcomesChart: createSafeComponent(OutcomesChart, 'OutcomesChart'),
  SideEffectsTable: createSafeComponent(SideEffectsTable, 'SideEffectsTable'),
  OutcomePredictor: createSafeComponent(OutcomePredictor, 'OutcomePredictor'),
  
  // Interactive Tools
  DecisionTree: createSafeComponent(DecisionTree, 'DecisionTree'),
  RiskCalculator: createSafeComponent(RiskCalculator, 'RiskCalculator'),
  StageSelector: createSafeComponent(StageSelector, 'StageSelector'),
  QuestionGenerator: createSafeComponent(QuestionGenerator, 'QuestionGenerator'),
  
  // Content Enhancement
  GlossaryTerm: createSafeComponent(GlossaryTerm, 'GlossaryTerm'),
  
  // Media
  VideoEmbed: createSafeComponent(VideoEmbed, 'VideoEmbed'),
  ImageComparison: createSafeComponent(ImageComparison, 'ImageComparison'),
};

interface MedicalMDXProviderProps {
  children: React.ReactNode;
}

const MedicalMDXProvider: React.FC<MedicalMDXProviderProps> = ({ children }) => {
  return (
    <MDXProvider components={mdxComponents}>
      {children}
    </MDXProvider>
  );
};

export default MedicalMDXProvider;
export { mdxComponents };