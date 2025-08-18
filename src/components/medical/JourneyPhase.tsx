
import React from 'react';
import { motion } from 'framer-motion';

interface JourneyPhaseData {
  id: string;
  name: 'diagnosis' | 'planning' | 'treatment' | 'recovery' | 'follow-up';
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  typicalDuration: string;
  isOptional?: boolean;
}

type PhaseStatus = 'completed' | 'current' | 'pending';

interface JourneyPhaseProps {
  phase: JourneyPhaseData;
  status: PhaseStatus;
  isSelected: boolean;
  onClick: () => void;
  interactive?: boolean;
  showConnector?: boolean;
  mobile?: boolean;
}

const JourneyPhase: React.FC<JourneyPhaseProps> = ({
  phase,
  status,
  isSelected,
  onClick,
  interactive = true,
  showConnector = false,
  mobile = false
}) => {
  const getStatusConfig = (status: PhaseStatus) => {
    switch (status) {
      case 'completed':
        return {
          bgColor: 'bg-green-600',
          borderColor: 'border-green-600',
          textColor: 'text-green-600',
          icon: '✓',
          connectorColor: 'bg-green-600'
        };
      case 'current':
        return {
          bgColor: 'bg-blue-600',
          borderColor: 'border-blue-600',
          textColor: 'text-blue-600',
          icon: phase.currentStep.toString(),
          connectorColor: 'bg-gray-300'
        };
      case 'pending':
        return {
          bgColor: 'bg-gray-300',
          borderColor: 'border-gray-300',
          textColor: 'text-gray-500',
          icon: '●',
          connectorColor: 'bg-gray-300'
        };
    }
  };

  const config = getStatusConfig(status);
  const isClickable = interactive && (status === 'completed' || status === 'current');

  const phaseContent = (
    <div className="flex flex-col items-center text-center">
      {/* Phase Indicator */}
      <motion.div
        className={`
          relative w-12 h-12 rounded-full border-4 flex items-center justify-center
          ${config.bgColor} ${config.borderColor}
          ${isClickable ? 'cursor-pointer shadow-lg' : 'cursor-default'}
          ${isSelected ? 'ring-4 ring-blue-200' : ''}
          transition-all duration-200
        `}
        whileHover={isClickable ? { scale: 1.1 } : {}}
        whileTap={isClickable ? { scale: 0.95 } : {}}
        onClick={onClick}
      >
        <span className="text-white font-bold text-sm">
          {config.icon}
        </span>
        
        {/* Pulse animation for current phase */}
        {status === 'current' && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-600 opacity-30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* Phase Title */}
      <div className="mt-3">
        <h4 className={`font-semibold text-sm ${config.textColor}`}>
          {phase.title}
        </h4>
        {!mobile && (
          <p className="text-xs text-gray-500 mt-1 max-w-20">
            {phase.typicalDuration}
          </p>
        )}
      </div>

      {/* Progress Indicator for Current Phase */}
      {status === 'current' && phase.totalSteps > 1 && (
        <div className="mt-2">
          <div className="flex items-center space-x-1">
            {Array.from({ length: phase.totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < phase.currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Step {phase.currentStep} of {phase.totalSteps}
          </p>
        </div>
      )}
    </div>
  );

  if (mobile) {
    return (
      <motion.div
        className={`
          p-4 rounded-lg border-2 transition-all duration-200
          ${isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}
          ${isClickable ? 'cursor-pointer hover:border-blue-300 hover:shadow-md' : ''}
        `}
        onClick={onClick}
        layout
      >
        <div className="flex items-center space-x-4">
          {/* Mobile Phase Indicator */}
          <div
            className={`
              w-10 h-10 rounded-full border-3 flex items-center justify-center flex-shrink-0
              ${config.bgColor} ${config.borderColor}
            `}
          >
            <span className="text-white font-bold text-sm">
              {config.icon}
            </span>
          </div>

          {/* Mobile Phase Content */}
          <div className="flex-1">
            <h4 className={`font-semibold ${config.textColor}`}>
              {phase.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              {phase.description}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>Duration: {phase.typicalDuration}</span>
              {status === 'current' && phase.totalSteps > 1 && (
                <span>Step {phase.currentStep} of {phase.totalSteps}</span>
              )}
            </div>
          </div>

          {/* Mobile Status Indicator */}
          <div className="flex-shrink-0">
            {status === 'completed' && (
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
            )}
            {status === 'current' && (
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
              </div>
            )}
            {status === 'pending' && (
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Progress Bar for Current Phase */}
        {status === 'current' && phase.totalSteps > 1 && (
          <div className="mt-4 ml-14">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(phase.currentStep / phase.totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      {phaseContent}
      
      {/* Desktop Connector Line */}
      {showConnector && (
        <div className="absolute top-6 left-full w-full h-1 flex items-center">
          <div className={`flex-1 h-0.5 ${config.connectorColor} mx-4`} />
        </div>
      )}
    </div>
  );
};

export default JourneyPhase;
