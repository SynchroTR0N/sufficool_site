
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SideEffect {
  id: string;
  name: string;
  description: string;
  category: 'acute' | 'chronic' | 'late';
  severity: 'grade1' | 'grade2' | 'grade3' | 'grade4' | 'grade5';
  frequency: number; // percentage 0-100
  onset: string; // e.g., "During treatment", "2-4 weeks", "6+ months"
  duration: string; // e.g., "Temporary", "Permanent", "2-6 weeks"
  management: string[];
  reversible: boolean;
  riskFactors?: string[];
  monitoring?: string[];
}

interface Treatment {
  id: string;
  name: string;
  shortName: string;
  category: string;
  color: string;
}

interface SideEffectsTableProps {
  title?: string;
  cancerType?: string;
  treatments: Treatment[];
  sideEffects: Record<string, SideEffect[]>; // treatmentId -> side effects
  selectedTreatments?: string[];
  filterCategory?: 'all' | 'acute' | 'chronic' | 'late';
  filterSeverity?: 'all' | 'grade1' | 'grade2' | 'grade3' | 'grade4' | 'grade5';
  sortBy?: 'frequency' | 'severity' | 'name';
  showManagement?: boolean;
  className?: string;
  onTreatmentToggle?: (treatmentId: string) => void;
}

const SideEffectsTable: React.FC<SideEffectsTableProps> = ({
  title = "Treatment Side Effects Comparison",
  cancerType,
  treatments,
  sideEffects,
  selectedTreatments = treatments?.map(t => t.id) || [],
  filterCategory = 'all',
  filterSeverity = 'all',
  sortBy = 'frequency',
  showManagement = false,
  className = '',
  onTreatmentToggle
}) => {
  const [expandedEffect, setExpandedEffect] = useState<string | null>(null);
  const [currentFilterCategory, setCurrentFilterCategory] = useState(filterCategory);
  const [currentFilterSeverity, setCurrentFilterSeverity] = useState(filterSeverity);
  const [currentSortBy, setCurrentSortBy] = useState(sortBy);
  const [showManagementDetails, setShowManagementDetails] = useState(showManagement);

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'grade1': return 'bg-green-100 text-green-800 border-green-200';
      case 'grade2': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'grade3': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'grade4': return 'bg-red-100 text-red-800 border-red-200';
      case 'grade5': return 'bg-red-200 text-red-900 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'acute': return 'bg-blue-100 text-blue-800';
      case 'chronic': return 'bg-purple-100 text-purple-800';
      case 'late': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency: number): string => {
    if (frequency >= 50) return 'text-red-600 font-semibold';
    if (frequency >= 25) return 'text-orange-600 font-medium';
    if (frequency >= 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const combinedSideEffects = useMemo(() => {
    const effectMap = new Map<string, {
      effect: SideEffect;
      treatments: Array<{
        treatment: Treatment;
        frequency: number;
        severity: string;
      }>;
    }>();

    selectedTreatments.forEach(treatmentId => {
      const treatment = treatments.find(t => t.id === treatmentId);
      const effects = sideEffects[treatmentId] || [];
      
      effects.forEach(effect => {
        if (currentFilterCategory !== 'all' && effect.category !== currentFilterCategory) return;
        if (currentFilterSeverity !== 'all' && effect.severity !== currentFilterSeverity) return;

        const key = effect.name.toLowerCase().replace(/\s+/g, '-');
        
        if (effectMap.has(key)) {
          const existing = effectMap.get(key)!;
          existing.treatments.push({
            treatment: treatment!,
            frequency: effect.frequency,
            severity: effect.severity
          });
        } else {
          effectMap.set(key, {
            effect,
            treatments: [{
              treatment: treatment!,
              frequency: effect.frequency,
              severity: effect.severity
            }]
          });
        }
      });
    });

    const results = Array.from(effectMap.values());
    
    return results.sort((a, b) => {
      switch (currentSortBy) {
        case 'frequency':
          const avgFreqA = a.treatments.reduce((sum, t) => sum + t.frequency, 0) / a.treatments.length;
          const avgFreqB = b.treatments.reduce((sum, t) => sum + t.frequency, 0) / b.treatments.length;
          return avgFreqB - avgFreqA;
        case 'severity':
          const severityOrder = { grade1: 1, grade2: 2, grade3: 3, grade4: 4, grade5: 5 };
          const maxSevA = Math.max(...a.treatments.map(t => severityOrder[t.severity as keyof typeof severityOrder]));
          const maxSevB = Math.max(...b.treatments.map(t => severityOrder[t.severity as keyof typeof severityOrder]));
          return maxSevB - maxSevA;
        case 'name':
        default:
          return a.effect.name.localeCompare(b.effect.name);
      }
    });
  }, [selectedTreatments, treatments, sideEffects, currentFilterCategory, currentFilterSeverity, currentSortBy]);

  const toggleTreatment = (treatmentId: string) => {
    onTreatmentToggle?.(treatmentId);
  };

  const toggleEffectDetails = (effectName: string) => {
    setExpandedEffect(expandedEffect === effectName ? null : effectName);
  };

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
        {cancerType && (
          <p className="text-sm text-gray-600 mt-1">
            Side effects for {cancerType} cancer treatments
          </p>
        )}
      </div>

      <div className="p-6">
        {/* Controls */}
        <div className="mb-6 space-y-4">
          {/* Treatment Selection */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Treatments to Compare:</h4>
            <div className="flex flex-wrap gap-2">
              {treatments.map(treatment => (
                <motion.button
                  key={treatment.id}
                  onClick={() => toggleTreatment(treatment.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all ${
                    selectedTreatments.includes(treatment.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {treatment.shortName}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
              <select
                value={currentFilterCategory}
                onChange={(e) => setCurrentFilterCategory(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="acute">Acute (During treatment)</option>
                <option value="chronic">Chronic (Ongoing)</option>
                <option value="late">Late Effects (After treatment)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity:</label>
              <select
                value={currentFilterSeverity}
                onChange={(e) => setCurrentFilterSeverity(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="grade1">Grade 1 (Mild)</option>
                <option value="grade2">Grade 2 (Moderate)</option>
                <option value="grade3">Grade 3 (Severe)</option>
                <option value="grade4">Grade 4 (Life-threatening)</option>
                <option value="grade5">Grade 5 (Death)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
              <select
                value={currentSortBy}
                onChange={(e) => setCurrentSortBy(e.target.value as any)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="frequency">Frequency</option>
                <option value="severity">Severity</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showManagementDetails}
                  onChange={(e) => setShowManagementDetails(e.target.checked)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">Show Management</span>
              </label>
            </div>
          </div>
        </div>

        {/* Side Effects Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Side Effect</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Treatments</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Onset</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Reversible</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Details</th>
              </tr>
            </thead>
            <tbody>
              {combinedSideEffects.map((item, index) => (
                <React.Fragment key={index}>
                  <motion.tr
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      expandedEffect === item.effect.name ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => toggleEffectDetails(item.effect.name)}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{item.effect.name}</div>
                      <div className="text-xs text-gray-500">{item.effect.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.effect.category)}`}>
                        {item.effect.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        {item.treatments.map((t, tIndex) => (
                          <div key={tIndex} className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: t.treatment.color }}
                            />
                            <span className="text-sm text-gray-700">{t.treatment.shortName}</span>
                            <span className={`text-sm font-medium ${getFrequencyColor(t.frequency)}`}>
                              {t.frequency}%
                            </span>
                            <span className={`inline-flex px-1 py-0.5 text-xs rounded border ${getSeverityColor(t.severity)}`}>
                              {t.severity.replace('grade', 'G')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.effect.onset}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.effect.duration}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        item.effect.reversible 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.effect.reversible ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <svg 
                        className={`w-4 h-4 mx-auto transition-transform ${
                          expandedEffect === item.effect.name ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </td>
                  </motion.tr>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedEffect === item.effect.name && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td colSpan={7} className="py-4 px-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            {/* Management */}
                            {(showManagementDetails || item.effect.management.length > 0) && (
                              <div>
                                <h6 className="font-medium text-gray-800 mb-2">Management Strategies</h6>
                                <ul className="space-y-1 text-gray-600">
                                  {item.effect.management.map((strategy, sIndex) => (
                                    <li key={sIndex} className="flex items-start">
                                      <span className="text-blue-500 mr-2">•</span>
                                      {strategy}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Risk Factors */}
                            {item.effect.riskFactors && item.effect.riskFactors.length > 0 && (
                              <div>
                                <h6 className="font-medium text-gray-800 mb-2">Risk Factors</h6>
                                <ul className="space-y-1 text-gray-600">
                                  {item.effect.riskFactors.map((factor, fIndex) => (
                                    <li key={fIndex} className="flex items-start">
                                      <span className="text-orange-500 mr-2">⚠</span>
                                      {factor}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Monitoring */}
                            {item.effect.monitoring && item.effect.monitoring.length > 0 && (
                              <div>
                                <h6 className="font-medium text-gray-800 mb-2">Monitoring</h6>
                                <ul className="space-y-1 text-gray-600">
                                  {item.effect.monitoring.map((monitor, mIndex) => (
                                    <li key={mIndex} className="flex items-start">
                                      <span className="text-green-500 mr-2">📊</span>
                                      {monitor}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {combinedSideEffects.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No side effects found for the selected filters and treatments.
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h5 className="text-sm font-semibold text-gray-800 mb-3">Grade Severity Scale (CTCAE)</h5>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
            <div className={`p-2 rounded border text-center ${getSeverityColor('grade1')}`}>
              Grade 1<br/>Mild
            </div>
            <div className={`p-2 rounded border text-center ${getSeverityColor('grade2')}`}>
              Grade 2<br/>Moderate
            </div>
            <div className={`p-2 rounded border text-center ${getSeverityColor('grade3')}`}>
              Grade 3<br/>Severe
            </div>
            <div className={`p-2 rounded border text-center ${getSeverityColor('grade4')}`}>
              Grade 4<br/>Life-threatening
            </div>
            <div className={`p-2 rounded border text-center ${getSeverityColor('grade5')}`}>
              Grade 5<br/>Death
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-yellow-400 mr-3">⚠️</div>
              <div>
                <h6 className="text-sm font-semibold text-yellow-800 mb-1">Side Effects Information Notice</h6>
                <p className="text-xs text-yellow-700">
                  This side effects comparison is for educational purposes only. Individual patient experiences may vary 
                  significantly based on personal health factors, treatment protocols, and other medications. Always 
                  discuss potential side effects and management strategies with your healthcare team before starting treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SideEffectsTable;
