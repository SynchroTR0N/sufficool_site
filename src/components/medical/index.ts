import { lazy } from 'react';

// Individual component exports for MDX
export const PatientJourney = lazy(() => import('./PatientJourney'));
export const JourneyPhase = lazy(() => import('./JourneyPhase'));
export const JourneyChecklist = lazy(() => import('./JourneyChecklist'));
export const Evidence = lazy(() => import('./Evidence'));
export const ProgressiveContent = lazy(() => import('./ProgressiveContent'));
export const MedicalDisclaimer = lazy(() => import('./MedicalDisclaimer'));
export const TreatmentComparison = lazy(() => import('./TreatmentComparison'));
export const QuestionGenerator = lazy(() => import('./QuestionGenerator'));
export const AnatomyDiagram = lazy(() => import('./AnatomyDiagram'));
export const TreatmentTimeline = lazy(() => import('./TreatmentTimeline'));
export const OutcomePredictor = lazy(() => import('./OutcomePredictor'));
export const EvidenceVisualization = lazy(() => import('./EvidenceVisualization'));
export const EvidenceCard = lazy(() => import('./EvidenceCard'));
export const MedicalSearch = lazy(() => import('./MedicalSearch'));
export const SearchFilters = lazy(() => import('./SearchFilters'));
export const CitationManager = lazy(() => import('./CitationManager'));

// Component collection for programmatic access
export const MedicalComponents = {
  // Anatomy & Visualization
  AnatomyDiagram: lazy(() => import('./AnatomyDiagram')),
  TreatmentTimeline: lazy(() => import('./TreatmentTimeline')),
  DoseDistribution: lazy(() => import('./DoseDistribution')),
  
  // Patient Journey
  PatientJourney: lazy(() => import('./PatientJourney')),
  JourneyPhase: lazy(() => import('./JourneyPhase')),
  JourneyChecklist: lazy(() => import('./JourneyChecklist')),
  
  // Evidence & Information
  Evidence: lazy(() => import('./Evidence')),
  EvidenceCard: lazy(() => import('./EvidenceCard')),
  EvidenceVisualization: lazy(() => import('./EvidenceVisualization')),
  MedicalSearch: lazy(() => import('./MedicalSearch')),
  SearchFilters: lazy(() => import('./SearchFilters')),
  CitationManager: lazy(() => import('./CitationManager')),
  ProgressiveContent: lazy(() => import('./ProgressiveContent')),
  MedicalDisclaimer: lazy(() => import('./MedicalDisclaimer')),
  
  // Comparison & Analysis  
  TreatmentComparison: lazy(() => import('./TreatmentComparison')),
  OutcomesChart: lazy(() => import('./OutcomesChart')),
  SideEffectsTable: lazy(() => import('./SideEffectsTable')),
  OutcomePredictor: lazy(() => import('./OutcomePredictor')),
  
  // Interactive Tools
  DecisionTree: lazy(() => import('./DecisionTree')),
  RiskCalculator: lazy(() => import('./RiskCalculator')),
  StageSelector: lazy(() => import('./StageSelector')),
  QuestionGenerator: lazy(() => import('./QuestionGenerator')),
  
  // Content Enhancement
  GlossaryTerm: lazy(() => import('./GlossaryTerm')),
  MedicalDiagram: lazy(() => import('./MedicalDiagram')),
  DiagramFlow: lazy(() => import('./DiagramFlow')),
  
  // Media
  VideoEmbed: lazy(() => import('./VideoEmbed')),
  ImageComparison: lazy(() => import('./ImageComparison'))
};