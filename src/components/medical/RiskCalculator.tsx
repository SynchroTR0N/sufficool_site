
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskFactor {
  id: string;
  label: string;
  type: 'number' | 'select' | 'boolean' | 'range';
  value: any;
  options?: { value: any; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  description?: string;
}

interface RiskResult {
  score: number;
  percentage: number;
  category: 'low' | 'moderate' | 'high' | 'very-high';
  interpretation: string;
  recommendations: string[];
  timeframe: string;
}

interface RiskCalculatorProps {
  title: string;
  description?: string;
  riskFactors: RiskFactor[];
  calculator: (factors: Record<string, any>) => RiskResult;
  className?: string;
  showDisclaimer?: boolean;
}

const RiskCalculator: React.FC<RiskCalculatorProps> = ({
  title,
  description,
  riskFactors: initialFactors,
  calculator,
  className = '',
  showDisclaimer = true
}) => {
  const [factors, setFactors] = useState<RiskFactor[]>(initialFactors);
  const [showResults, setShowResults] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<RiskResult[]>([]);

  const updateFactor = useCallback((id: string, value: any) => {
    setFactors(prev => prev.map(factor => 
      factor.id === id ? { ...factor, value } : factor
    ));
  }, []);

  const factorValues = useMemo(() => {
    return factors.reduce((acc, factor) => {
      acc[factor.id] = factor.value;
      return acc;
    }, {} as Record<string, any>);
  }, [factors]);

  const result = useMemo(() => {
    try {
      return calculator(factorValues);
    } catch (error) {
      return null;
    }
  }, [factorValues, calculator]);

  const getRiskCategoryColor = (category: string): string => {
    const colors = {
      'low': 'bg-green-100 text-green-800 border-green-200',
      'moderate': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'high': 'bg-orange-100 text-orange-800 border-orange-200',
      'very-high': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[category as keyof typeof colors] || colors['low'];
  };

  const getRiskBarColor = (percentage: number): string => {
    if (percentage < 10) return 'bg-green-500';
    if (percentage < 25) return 'bg-yellow-500';
    if (percentage < 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const calculateRisk = () => {
    if (result) {
      setShowResults(true);
      setCalculationHistory(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 calculations
    }
  };

  const resetCalculator = () => {
    setFactors(initialFactors);
    setShowResults(false);
  };

  const renderFactorInput = (factor: RiskFactor) => {
    switch (factor.type) {
      case 'number':
        return (
          <input
            type="number"
            value={factor.value || ''}
            onChange={(e) => updateFactor(factor.id, parseFloat(e.target.value) || 0)}
            min={factor.min}
            max={factor.max}
            step={factor.step || 1}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter ${factor.label.toLowerCase()}`}
          />
        );

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={factor.value || factor.min || 0}
              onChange={(e) => updateFactor(factor.id, parseFloat(e.target.value))}
              min={factor.min || 0}
              max={factor.max || 100}
              step={factor.step || 1}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{factor.min || 0}{factor.unit}</span>
              <span className="font-medium text-gray-700">{factor.value || factor.min || 0}{factor.unit}</span>
              <span>{factor.max || 100}{factor.unit}</span>
            </div>
          </div>
        );

      case 'select':
        return (
          <select
            value={factor.value || ''}
            onChange={(e) => updateFactor(factor.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select {factor.label.toLowerCase()}</option>
            {factor.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateFactor(factor.id, true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                factor.value === true
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => updateFactor(factor.id, false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                factor.value === false
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              No
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const allFactorsComplete = factors.every(factor => 
    factor.value !== undefined && factor.value !== '' && factor.value !== null
  );

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-800">Risk Factors</h4>
            
            {factors.map((factor) => (
              <motion.div
                key={factor.id}
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: factors.indexOf(factor) * 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700">
                  {factor.label}
                  {factor.unit && factor.type !== 'range' && (
                    <span className="text-gray-500 ml-1">({factor.unit})</span>
                  )}
                </label>
                
                {renderFactorInput(factor)}
                
                {factor.description && (
                  <p className="text-xs text-gray-500">{factor.description}</p>
                )}
              </motion.div>
            ))}

            <div className="flex space-x-3 pt-4">
              <button
                onClick={calculateRisk}
                disabled={!allFactorsComplete}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Calculate Risk
              </button>
              <button
                onClick={resetCalculator}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h4>
            
            <AnimatePresence>
              {showResults && result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  {/* Risk Score Display */}
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {result.percentage.toFixed(1)}%
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskCategoryColor(result.category)}`}>
                      {result.category.replace('-', ' ').toUpperCase()} RISK
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Risk over {result.timeframe}
                    </div>
                  </div>

                  {/* Risk Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Risk Level</span>
                      <span>{result.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${getRiskBarColor(result.percentage)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(result.percentage, 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Interpretation */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <h5 className="text-sm font-semibold text-blue-800 mb-1">Interpretation</h5>
                    <p className="text-sm text-blue-700">{result.interpretation}</p>
                  </div>

                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-gray-800">Recommendations</h5>
                      <ul className="space-y-1">
                        {result.recommendations.map((recommendation, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {recommendation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p>Enter risk factors above to calculate risk assessment</p>
                </div>
              )}
            </AnimatePresence>

            {/* Calculation History */}
            {calculationHistory.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h5 className="text-sm font-semibold text-gray-800 mb-3">Recent Calculations</h5>
                <div className="space-y-2">
                  {calculationHistory.map((calc, index) => (
                    <div key={index} className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded">
                      <span>{calc.percentage.toFixed(1)}% ({calc.category})</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Medical Disclaimer */}
        {showDisclaimer && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-yellow-400 mr-3">⚠️</div>
                <div>
                  <h6 className="text-sm font-semibold text-yellow-800 mb-1">Medical Disclaimer</h6>
                  <p className="text-xs text-yellow-700">
                    This calculator is for educational purposes only and should not replace professional medical advice. 
                    Always consult with qualified healthcare providers for medical decisions and treatment planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RiskCalculator;
