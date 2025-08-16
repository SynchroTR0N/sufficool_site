
import { lazy } from 'react';

export const MedicalComponents = {
  AnatomyDiagram: lazy(() => import('./AnatomyDiagram')),
  TreatmentTimeline: lazy(() => import('./TreatmentTimeline')),
  DoseDistribution: lazy(() => import('./DoseDistribution')),
  PatientJourney: lazy(() => import('./PatientJourney')),
  JourneyPhase: lazy(() => import('./JourneyPhase')),
  JourneyChecklist: lazy(() => import('./JourneyChecklist')),
  Evidence: lazy(() => import('./Evidence')),
  ProgressiveContent: lazy(() => import('./ProgressiveContent')),
  MedicalDisclaimer: lazy(() => import('./MedicalDisclaimer')),
  TreatmentComparison: lazy(() => import('./TreatmentComparison')),
  OutcomesChart: lazy(() => import('./OutcomesChart')),
  SideEffectsTable: lazy(() => import('./SideEffectsTable')),
  OutcomePredictor: lazy(() => import('./OutcomePredictor')),
  DecisionTree: lazy(() => import('./DecisionTree')),
  RiskCalculator: lazy(() => import('./RiskCalculator')),
  StageSelector: lazy(() => import('./StageSelector')),
  QuestionGenerator: lazy(() => import('./QuestionGenerator')),
  GlossaryTerm: lazy(() => import('./GlossaryTerm')),
  MedicalDiagram: lazy(() => import('./MedicalDiagram')),
  DiagramFlow: lazy(() => import('./DiagramFlow')),
  VideoEmbed: lazy(() => import('./VideoEmbed')),
  ImageComparison: lazy(() => import('./ImageComparison'))
};
