
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TNMValues {
  T: string;
  N: string;
  M: string;
}

interface StageGrouping {
  stage: string;
  description: string;
  prognosis: string;
  treatmentOptions: string[];
  fiveYearSurvival?: string;
}

interface TNMOption {
  value: string;
  label: string;
  description: string;
  color?: string;
}

interface StageSelectorProps {
  cancerType: string;
  title?: string;
  description?: string;
  tOptions: TNMOption[];
  nOptions: TNMOption[];
  mOptions: TNMOption[];
  stageGroupings: Record<string, StageGrouping>;
  onStageChange?: (tnm: TNMValues, stage: StageGrouping | null) => void;
  showAnatomyDiagram?: boolean;
  className?: string;
}

const StageSelector: React.FC<StageSelectorProps> = ({
  cancerType,
  title,
  description,
  tOptions,
  nOptions,
  mOptions,
  stageGroupings,
  onStageChange,
  showAnatomyDiagram = false,
  className = ''
}) => {
  const [selectedTNM, setSelectedTNM] = useState<TNMValues>({
    T: '',
    N: '',
    M: ''
  });
  const [showDetails, setShowDetails] = useState(false);

  const updateTNMValue = useCallback((component: 'T' | 'N' | 'M', value: string) => {
    const newTNM = { ...selectedTNM, [component]: value };
    setSelectedTNM(newTNM);
    
    const stage = determineStage(newTNM);
    onStageChange?.(newTNM, stage);
  }, [selectedTNM, onStageChange]);

  const determineStage = useCallback((tnm: TNMValues): StageGrouping | null => {
    if (!tnm.T || !tnm.N || !tnm.M) return null;
    
    const key = `${tnm.T}${tnm.N}${tnm.M}`;
    return stageGroupings[key] || null;
  }, [stageGroupings]);

  const currentStage = useMemo(() => determineStage(selectedTNM), [selectedTNM, determineStage]);

  const getOptionColor = (option: TNMOption, isSelected: boolean): string => {
    if (isSelected) {
      return 'bg-blue-500 text-white border-blue-500';
    }
    
    if (option.color) {
      return option.color;
    }
    
    // Default color scheme based on severity
    const value = option.value.toLowerCase();
    if (value.includes('0') || value.includes('x')) {
      return 'bg-green-50 border-green-200 hover:bg-green-100 text-green-800';
    }
    if (value.includes('1') || value.includes('a')) {
      return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-800';
    }
    if (value.includes('2') || value.includes('b')) {
      return 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-800';
    }
    if (value.includes('3') || value.includes('4') || value.includes('c')) {
      return 'bg-red-50 border-red-200 hover:bg-red-100 text-red-800';
    }
    return 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800';
  };

  const getStageColor = (stage: string): string => {
    switch (stage.toLowerCase()) {
      case 'stage 0':
      case 'stage i':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'stage ii':
      case 'stage iia':
      case 'stage iib':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'stage iii':
      case 'stage iiia':
      case 'stage iiib':
      case 'stage iiic':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'stage iv':
      case 'stage iva':
      case 'stage ivb':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const resetSelection = () => {
    setSelectedTNM({ T: '', N: '', M: '' });
    setShowDetails(false);
    onStageChange?.({ T: '', N: '', M: '' }, null);
  };

  const allSelected = selectedTNM.T && selectedTNM.N && selectedTNM.M;

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">
          {title || `${cancerType} TNM Staging`}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        )}
        
        {/* Current Selection Display */}
        {allSelected && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="font-medium">Selected: </span>
                  <span className="font-mono bg-white px-2 py-1 rounded border">
                    T{selectedTNM.T} N{selectedTNM.N} M{selectedTNM.M}
                  </span>
                </div>
                {currentStage && (
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStageColor(currentStage.stage)}`}>
                    {currentStage.stage}
                  </div>
                )}
              </div>
              <button
                onClick={resetSelection}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-8">
          {/* T Component - Primary Tumor */}
          <div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">T - Primary Tumor</h4>
              <p className="text-sm text-gray-600">Size and extent of the main tumor</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {tOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => updateTNMValue('T', option.value)}
                  className={`p-3 border-2 rounded-lg text-left transition-all duration-200 ${getOptionColor(option, selectedTNM.T === option.value)}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={option.description}
                >
                  <div className="font-medium">T{option.value}</div>
                  <div className="text-xs opacity-80 mt-1">{option.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* N Component - Regional Lymph Nodes */}
          <div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">N - Regional Lymph Nodes</h4>
              <p className="text-sm text-gray-600">Whether cancer has spread to nearby lymph nodes</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {nOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => updateTNMValue('N', option.value)}
                  className={`p-3 border-2 rounded-lg text-left transition-all duration-200 ${getOptionColor(option, selectedTNM.N === option.value)}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={option.description}
                >
                  <div className="font-medium">N{option.value}</div>
                  <div className="text-xs opacity-80 mt-1">{option.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* M Component - Distant Metastasis */}
          <div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">M - Distant Metastasis</h4>
              <p className="text-sm text-gray-600">Whether cancer has spread to other parts of the body</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {mOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => updateTNMValue('M', option.value)}
                  className={`p-3 border-2 rounded-lg text-left transition-all duration-200 ${getOptionColor(option, selectedTNM.M === option.value)}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={option.description}
                >
                  <div className="font-medium">M{option.value}</div>
                  <div className="text-xs opacity-80 mt-1">{option.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Stage Results */}
          <AnimatePresence>
            {currentStage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-xl font-bold border-2 ${getStageColor(currentStage.stage)}`}>
                    {currentStage.stage}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stage Information */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Description</h5>
                      <p className="text-sm text-gray-600">{currentStage.description}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Prognosis</h5>
                      <p className="text-sm text-gray-600">{currentStage.prognosis}</p>
                    </div>

                    {currentStage.fiveYearSurvival && (
                      <div>
                        <h5 className="text-sm font-semibold text-gray-800 mb-2">5-Year Survival Rate</h5>
                        <div className="text-2xl font-bold text-blue-600">
                          {currentStage.fiveYearSurvival}
                        </div>
                        <p className="text-xs text-gray-500">
                          *Survival rates are estimates and vary by individual factors
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Treatment Options */}
                  <div>
                    <h5 className="text-sm font-semibold text-gray-800 mb-3">Common Treatment Options</h5>
                    <ul className="space-y-2">
                      {currentStage.treatmentOptions.map((treatment, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Additional Details Toggle */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <span className="mr-2">
                      {showDetails ? 'Hide' : 'Show'} Detailed Information
                    </span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h6 className="font-medium text-gray-800 mb-2">T{selectedTNM.T} Details</h6>
                            <p className="text-gray-600">
                              {tOptions.find(opt => opt.value === selectedTNM.T)?.description}
                            </p>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-800 mb-2">N{selectedTNM.N} Details</h6>
                            <p className="text-gray-600">
                              {nOptions.find(opt => opt.value === selectedTNM.N)?.description}
                            </p>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-800 mb-2">M{selectedTNM.M} Details</h6>
                            <p className="text-gray-600">
                              {mOptions.find(opt => opt.value === selectedTNM.M)?.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TNM System Information */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-blue-800 mb-2">About TNM Staging</h5>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>T (Tumor):</strong> Size and extent of the primary tumor</p>
                <p><strong>N (Nodes):</strong> Whether cancer has spread to nearby lymph nodes</p>
                <p><strong>M (Metastasis):</strong> Whether cancer has spread to distant parts of the body</p>
              </div>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="border-t border-gray-200 pt-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-yellow-400 mr-3">⚠️</div>
                <div>
                  <h6 className="text-sm font-semibold text-yellow-800 mb-1">Medical Disclaimer</h6>
                  <p className="text-xs text-yellow-700">
                    This staging tool is for educational purposes only. Actual cancer staging should always be 
                    determined by qualified oncologists using complete clinical, pathological, and imaging data.
                    Treatment decisions should never be based solely on staging information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StageSelector;
