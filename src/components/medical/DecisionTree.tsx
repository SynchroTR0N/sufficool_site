
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DecisionNode {
  id: string;
  type: 'question' | 'outcome' | 'branch';
  title: string;
  description?: string;
  question?: string;
  choices?: Choice[];
  outcome?: {
    recommendation: string;
    explanation: string;
    evidenceLevel?: string;
    nextSteps?: string[];
    warnings?: string[];
  };
  parentId?: string;
}

interface Choice {
  id: string;
  label: string;
  value: any;
  nextNodeId: string;
  description?: string;
  color?: string;
}

interface DecisionPath {
  nodeId: string;
  choice?: Choice;
  timestamp: Date;
}

interface DecisionTreeProps {
  title: string;
  description?: string;
  nodes: DecisionNode[];
  startNodeId: string;
  onPathComplete?: (path: DecisionPath[], outcome: DecisionNode) => void;
  className?: string;
  showProgress?: boolean;
}

const DecisionTree: React.FC<DecisionTreeProps> = ({
  title,
  description,
  nodes,
  startNodeId,
  onPathComplete,
  className = '',
  showProgress = true
}) => {
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);
  const [decisionPath, setDecisionPath] = useState<DecisionPath[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentNode = nodes.find(node => node.id === currentNodeId);
  const totalNodes = nodes.filter(node => node.type === 'question').length;
  const currentStep = decisionPath.filter(path => path.choice).length + 1;

  const makeChoice = useCallback((choice: Choice) => {
    const newPath: DecisionPath = {
      nodeId: currentNodeId,
      choice,
      timestamp: new Date()
    };

    setDecisionPath(prev => [...prev, newPath]);
    setCurrentNodeId(choice.nextNodeId);

    const nextNode = nodes.find(node => node.id === choice.nextNodeId);
    if (nextNode?.type === 'outcome') {
      setIsCompleted(true);
      onPathComplete?.([...decisionPath, newPath], nextNode);
    }
  }, [currentNodeId, decisionPath, nodes, onPathComplete]);

  const goBack = useCallback(() => {
    if (decisionPath.length > 0) {
      const previousPath = decisionPath.slice(0, -1);
      setDecisionPath(previousPath);
      
      if (previousPath.length > 0) {
        setCurrentNodeId(previousPath[previousPath.length - 1].nodeId);
      } else {
        setCurrentNodeId(startNodeId);
      }
      
      setIsCompleted(false);
    }
  }, [decisionPath, startNodeId]);

  const restart = useCallback(() => {
    setCurrentNodeId(startNodeId);
    setDecisionPath([]);
    setIsCompleted(false);
  }, [startNodeId]);

  const getChoiceColor = (choice: Choice): string => {
    if (choice.color) return choice.color;
    
    // Default color scheme based on choice content
    const label = choice.label.toLowerCase();
    if (label.includes('yes') || label.includes('positive') || label.includes('high')) {
      return 'bg-green-50 border-green-200 hover:bg-green-100 text-green-800';
    }
    if (label.includes('no') || label.includes('negative') || label.includes('low')) {
      return 'bg-red-50 border-red-200 hover:bg-red-100 text-red-800';
    }
    if (label.includes('moderate') || label.includes('maybe') || label.includes('unsure')) {
      return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-800';
    }
    return 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800';
  };

  const getOutcomeColor = (outcome: DecisionNode['outcome']): string => {
    if (!outcome) return 'bg-blue-50 border-blue-200';
    
    const recommendation = outcome.recommendation.toLowerCase();
    if (recommendation.includes('immediate') || recommendation.includes('urgent') || recommendation.includes('emergency')) {
      return 'bg-red-50 border-red-200';
    }
    if (recommendation.includes('monitor') || recommendation.includes('follow-up') || recommendation.includes('watch')) {
      return 'bg-yellow-50 border-yellow-200';
    }
    if (recommendation.includes('routine') || recommendation.includes('standard') || recommendation.includes('normal')) {
      return 'bg-green-50 border-green-200';
    }
    return 'bg-blue-50 border-blue-200';
  };

  if (!currentNode) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: Node not found. Please check the decision tree configuration.
      </div>
    );
  }

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-2">{description}</p>
            )}
          </div>
          
          {showProgress && !isCompleted && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Step {currentStep} of {totalNodes}</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalNodes) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {currentNode.type === 'question' && (
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Question */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentNode.title}
                </h4>
                {currentNode.question && (
                  <p className="text-gray-700">{currentNode.question}</p>
                )}
                {currentNode.description && (
                  <p className="text-sm text-gray-600 mt-2">{currentNode.description}</p>
                )}
              </div>

              {/* Choices */}
              <div className="grid gap-3 max-w-2xl mx-auto">
                {currentNode.choices?.map((choice, index) => (
                  <motion.button
                    key={choice.id}
                    onClick={() => makeChoice(choice)}
                    className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${getChoiceColor(choice)}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-medium">{choice.label}</div>
                    {choice.description && (
                      <div className="text-sm opacity-80 mt-1">{choice.description}</div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {currentNode.type === 'outcome' && (
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Outcome Header */}
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-xl font-bold text-gray-900">{currentNode.title}</h4>
              </div>

              {/* Recommendation */}
              {currentNode.outcome && (
                <div className={`p-6 border-2 rounded-lg ${getOutcomeColor(currentNode.outcome)}`}>
                  <h5 className="text-lg font-semibold mb-3">Recommendation</h5>
                  <p className="text-gray-800 mb-4">{currentNode.outcome.recommendation}</p>
                  
                  {currentNode.outcome.explanation && (
                    <div className="mb-4">
                      <h6 className="font-medium text-gray-700 mb-2">Explanation</h6>
                      <p className="text-sm text-gray-600">{currentNode.outcome.explanation}</p>
                    </div>
                  )}

                  {currentNode.outcome.evidenceLevel && (
                    <div className="mb-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Evidence Level: {currentNode.outcome.evidenceLevel}
                      </span>
                    </div>
                  )}

                  {currentNode.outcome.nextSteps && currentNode.outcome.nextSteps.length > 0 && (
                    <div className="mb-4">
                      <h6 className="font-medium text-gray-700 mb-2">Next Steps</h6>
                      <ul className="space-y-1">
                        {currentNode.outcome.nextSteps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentNode.outcome.warnings && currentNode.outcome.warnings.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <h6 className="font-medium text-yellow-800 mb-2 flex items-center">
                        <span className="mr-2">⚠️</span>
                        Important Considerations
                      </h6>
                      <ul className="space-y-1">
                        {currentNode.outcome.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-yellow-700 flex items-start">
                            <span className="text-yellow-500 mr-2">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={goBack}
            disabled={decisionPath.length === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button
            onClick={restart}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </button>
        </div>

        {/* Decision Path Summary */}
        {decisionPath.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h5 className="text-sm font-semibold text-gray-800 mb-3">Decision Path</h5>
            <div className="space-y-2">
              {decisionPath.map((path, index) => {
                const node = nodes.find(n => n.id === path.nodeId);
                return (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">{index + 1}.</span>
                    <span className="mr-2">{node?.title}</span>
                    {path.choice && (
                      <>
                        <span className="mr-2">→</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {path.choice.label}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-yellow-400 mr-3">⚠️</div>
              <div>
                <h6 className="text-sm font-semibold text-yellow-800 mb-1">Clinical Decision Support</h6>
                <p className="text-xs text-yellow-700">
                  This decision support tool is for educational purposes and should supplement, not replace, 
                  clinical judgment. Always consider individual patient factors and consult current guidelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DecisionTree;
