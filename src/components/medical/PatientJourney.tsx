import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import JourneyPhase from './JourneyPhase';
import JourneyChecklist from './JourneyChecklist';

interface JourneyPhaseData {
  id: string;
  name: 'diagnosis' | 'planning' | 'treatment' | 'recovery' | 'follow-up';
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  resources: Resource[];
  checklist: ChecklistItem[];
  typicalDuration: string;
  isOptional?: boolean;
  cancerSpecific?: string[];
}

interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'tool' | 'guide';
  url: string;
  description?: string;
  evidenceLevel?: string;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  required: boolean;
  phase: string;
  cancerType?: string[];
}

interface PatientJourneyProps {
  cancerType: string;
  stage?: string;
  treatmentChoice?: string;
  currentPhase: string;
  showFullJourney?: boolean;
  interactive?: boolean;
  onPhaseChange?: (phase: string) => void;
}

const PatientJourney: React.FC<PatientJourneyProps> = ({
  cancerType,
  stage,
  treatmentChoice,
  currentPhase,
  showFullJourney = false,
  interactive = true,
  onPhaseChange
}) => {
  const [selectedPhase, setSelectedPhase] = useState(currentPhase);
  const [expandedChecklist, setExpandedChecklist] = useState(false);

  // Generate personalized journey based on inputs
  const journeyPhases = useMemo((): JourneyPhaseData[] => {
    const basePhases: JourneyPhaseData[] = [
      {
        id: 'diagnosis',
        name: 'diagnosis',
        title: 'Diagnosis & Understanding',
        description: 'Learn about your diagnosis and what it means for your care.',
        currentStep: currentPhase === 'diagnosis' ? 1 : currentPhase === 'planning' ? 2 : 3,
        totalSteps: 3,
        typicalDuration: '1-2 weeks',
        resources: [
          {
            id: 'understanding-diagnosis',
            title: `Understanding Your ${cancerType} Cancer Diagnosis`,
            type: 'guide',
            url: `/${cancerType}/staging/`,
            description: 'Comprehensive guide to cancer staging and prognosis',
            evidenceLevel: '1A'
          },
          {
            id: 'questions-doctor',
            title: 'Questions to Ask Your Doctor',
            type: 'tool',
            url: `/${cancerType}/questions-generator/`,
            description: 'Generate personalized questions for your medical team'
          }
        ],
        checklist: [
          {
            id: 'medical-records',
            title: 'Gather Medical Records',
            description: 'Collect all relevant test results, imaging, and pathology reports',
            required: true,
            phase: 'diagnosis'
          },
          {
            id: 'second-opinion',
            title: 'Consider Second Opinion',
            description: 'Seek additional medical perspective on diagnosis and treatment options',
            required: false,
            phase: 'diagnosis'
          },
          {
            id: 'support-system',
            title: 'Build Support System',
            description: 'Identify family members, friends, or support groups to help during treatment',
            required: true,
            phase: 'diagnosis'
          }
        ]
      },
      {
        id: 'planning',
        name: 'planning',
        title: 'Treatment Planning',
        description: 'Work with your medical team to develop your treatment plan.',
        currentStep: currentPhase === 'planning' ? 1 : currentPhase === 'treatment' ? 2 : currentPhase === 'diagnosis' ? 0 : 3,
        totalSteps: 4,
        typicalDuration: '2-4 weeks',
        resources: [
          {
            id: 'treatment-options',
            title: `${cancerType} Treatment Options`,
            type: 'guide',
            url: `/${cancerType}/treatments/`,
            description: 'Compare different treatment approaches and their outcomes'
          },
          {
            id: 'decision-guide',
            title: 'Treatment Decision Guide',
            type: 'tool',
            url: `/${cancerType}/decision-guide/`,
            description: 'Interactive tool to compare treatment options'
          }
        ],
        checklist: [
          {
            id: 'multidisciplinary-team',
            title: 'Meet Multidisciplinary Team',
            description: 'Consult with oncologist, surgeon, radiation oncologist as needed',
            required: true,
            phase: 'planning'
          },
          {
            id: 'treatment-decision',
            title: 'Finalize Treatment Decision',
            description: 'Choose primary treatment approach with your medical team',
            required: true,
            phase: 'planning'
          },
          {
            id: 'pre-treatment-tests',
            title: 'Complete Pre-treatment Testing',
            description: 'Undergo required imaging, lab work, and consultations',
            required: true,
            phase: 'planning'
          }
        ]
      },
      {
        id: 'treatment',
        name: 'treatment',
        title: 'Active Treatment',
        description: `Undergo your ${treatmentChoice || 'prescribed'} treatment with ongoing monitoring.`,
        currentStep: currentPhase === 'treatment' ? 1 : currentPhase === 'recovery' ? 2 : currentPhase === 'planning' ? 0 : 3,
        totalSteps: treatmentChoice === 'surgery' ? 1 : treatmentChoice === 'radiation' ? 5 : 6,
        typicalDuration: treatmentChoice === 'surgery' ? '1 day + recovery' : treatmentChoice === 'radiation' ? '5-8 weeks' : '3-6 months',
        resources: [
          {
            id: 'treatment-timeline',
            title: `${treatmentChoice || 'Treatment'} Timeline`,
            type: 'guide',
            url: `/${cancerType}/treatments/${treatmentChoice || 'overview'}/`,
            description: 'What to expect during your treatment'
          },
          {
            id: 'side-effects',
            title: 'Managing Side Effects',
            type: 'guide',
            url: '/shared/universal-concerns/managing-side-effects/',
            description: 'Strategies for handling treatment side effects'
          }
        ],
        checklist: [
          {
            id: 'treatment-schedule',
            title: 'Follow Treatment Schedule',
            description: 'Attend all scheduled treatment appointments',
            required: true,
            phase: 'treatment'
          },
          {
            id: 'side-effect-monitoring',
            title: 'Monitor Side Effects',
            description: 'Track and report any side effects to your medical team',
            required: true,
            phase: 'treatment'
          },
          {
            id: 'lifestyle-adjustments',
            title: 'Make Lifestyle Adjustments',
            description: 'Follow nutrition, exercise, and rest recommendations',
            required: true,
            phase: 'treatment'
          }
        ]
      },
      {
        id: 'recovery',
        name: 'recovery',
        title: 'Recovery & Healing',
        description: 'Focus on healing and returning to normal activities.',
        currentStep: currentPhase === 'recovery' ? 1 : currentPhase === 'follow-up' ? 2 : currentPhase === 'treatment' ? 0 : 3,
        totalSteps: 3,
        typicalDuration: '4-12 weeks',
        resources: [
          {
            id: 'recovery-guide',
            title: 'Recovery Guidelines',
            type: 'guide',
            url: `/${cancerType}/recovery/`,
            description: 'Guidelines for optimal recovery and healing'
          },
          {
            id: 'nutrition-exercise',
            title: 'Nutrition and Exercise',
            type: 'guide',
            url: '/shared/universal-concerns/nutrition-exercise/',
            description: 'Recommendations for maintaining health during recovery'
          }
        ],
        checklist: [
          {
            id: 'recovery-plan',
            title: 'Follow Recovery Plan',
            description: 'Adhere to post-treatment care instructions',
            required: true,
            phase: 'recovery'
          },
          {
            id: 'gradual-activity',
            title: 'Gradually Increase Activity',
            description: 'Slowly return to normal activities as tolerated',
            required: true,
            phase: 'recovery'
          },
          {
            id: 'healing-assessment',
            title: 'Healing Assessment',
            description: 'Attend follow-up appointments to assess healing',
            required: true,
            phase: 'recovery'
          }
        ]
      },
      {
        id: 'follow-up',
        name: 'follow-up',
        title: 'Long-term Follow-up',
        description: 'Ongoing monitoring and surveillance for your health.',
        currentStep: currentPhase === 'follow-up' ? 1 : 2,
        totalSteps: 5,
        typicalDuration: 'Ongoing for 5+ years',
        resources: [
          {
            id: 'surveillance-schedule',
            title: 'Surveillance Schedule',
            type: 'guide',
            url: `/${cancerType}/follow-up/surveillance/`,
            description: 'Understanding your long-term monitoring plan'
          },
          {
            id: 'survivorship-care',
            title: 'Survivorship Care Plan',
            type: 'guide',
            url: '/shared/survivorship/care-plan/',
            description: 'Comprehensive plan for long-term health'
          }
        ],
        checklist: [
          {
            id: 'surveillance-appointments',
            title: 'Regular Surveillance Appointments',
            description: 'Attend scheduled follow-up visits and imaging',
            required: true,
            phase: 'follow-up'
          },
          {
            id: 'health-maintenance',
            title: 'General Health Maintenance',
            description: 'Maintain overall health with regular screenings',
            required: true,
            phase: 'follow-up'
          },
          {
            id: 'quality-of-life',
            title: 'Monitor Quality of Life',
            description: 'Address any ongoing effects on quality of life',
            required: true,
            phase: 'follow-up'
          }
        ]
      }
    ];

    // Filter phases based on cancer type and treatment if needed
    return basePhases.filter(phase => {
      if (phase.cancerSpecific && !phase.cancerSpecific.includes(cancerType)) {
        return false;
      }
      return true;
    });
  }, [cancerType, stage, treatmentChoice, currentPhase]);

  const currentPhaseData = journeyPhases.find(phase => phase.id === selectedPhase);
  const currentPhaseIndex = journeyPhases.findIndex(phase => phase.id === selectedPhase);

  const handlePhaseSelect = (phaseId: string) => {
    if (interactive) {
      setSelectedPhase(phaseId);
      onPhaseChange?.(phaseId);
    }
  };

  const getPhaseStatus = (phase: JourneyPhaseData, index: number) => {
    if (index < currentPhaseIndex) return 'completed';
    if (index === currentPhaseIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="patient-journey bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-3 h-8 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Your Treatment Journey
          </h2>
        </div>
        <p className="text-gray-600 text-lg">
          {stage && `Stage ${stage} `}{cancerType} cancer treatment roadmap
        </p>
      </div>

      {/* Journey Timeline */}
      <div className="journey-timeline mb-8">
        <div className="hidden md:flex items-center justify-between mb-8">
          {journeyPhases.map((phase, index) => (
            <JourneyPhase
              key={phase.id}
              phase={phase}
              status={getPhaseStatus(phase, index)}
              isSelected={phase.id === selectedPhase}
              onClick={() => handlePhaseSelect(phase.id)}
              interactive={interactive}
              showConnector={index < journeyPhases.length - 1}
            />
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-4 mb-8">
          {journeyPhases.map((phase, index) => (
            <JourneyPhase
              key={phase.id}
              phase={phase}
              status={getPhaseStatus(phase, index)}
              isSelected={phase.id === selectedPhase}
              onClick={() => handlePhaseSelect(phase.id)}
              interactive={interactive}
              mobile={true}
            />
          ))}
        </div>
      </div>

      {/* Selected Phase Details */}
      {currentPhaseData && (
        <motion.div
          key={selectedPhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="phase-details"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentPhaseData.title}
                </h3>
                <p className="text-gray-700 mb-4">{currentPhaseData.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Duration: {currentPhaseData.typicalDuration}
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Step {currentPhaseData.currentStep} of {currentPhaseData.totalSteps}
                  </span>
                </div>
              </div>

              {/* Resources */}
              <div className="resources mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Helpful Resources
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentPhaseData.resources.map((resource) => (
                    <motion.a
                      key={resource.id}
                      href={resource.url}
                      className="resource-card block p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-medium">
                              {resource.type === 'guide' ? '📖' : 
                               resource.type === 'tool' ? '🛠️' : 
                               resource.type === 'video' ? '🎥' : '📄'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">{resource.title}</h5>
                          {resource.description && (
                            <p className="text-sm text-gray-600">{resource.description}</p>
                          )}
                          {resource.evidenceLevel && (
                            <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Evidence Level {resource.evidenceLevel}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Phase Checklist
                  </h4>
                  <button
                    onClick={() => setExpandedChecklist(!expandedChecklist)}
                    className="md:hidden text-blue-600 hover:text-blue-800"
                  >
                    {expandedChecklist ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className={`${expandedChecklist ? 'block' : 'hidden'} md:block`}>
                  <JourneyChecklist
                    items={currentPhaseData.checklist}
                    phase={currentPhaseData.id}
                    cancerType={cancerType}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Medical Disclaimer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          <strong>Medical Disclaimer:</strong> This journey timeline is for educational purposes only. 
          Your actual treatment plan may vary based on your specific medical situation. 
          Always follow your healthcare provider's recommendations.
        </p>
      </div>
    </div>
  );
};

export default PatientJourney;