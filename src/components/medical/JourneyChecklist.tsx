
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  required: boolean;
  phase: string;
  cancerType?: string[];
  estimatedTime?: string;
  resources?: string[];
}

interface JourneyChecklistProps {
  items: ChecklistItem[];
  phase: string;
  cancerType: string;
  onItemToggle?: (itemId: string, completed: boolean) => void;
  editable?: boolean;
}

const JourneyChecklist: React.FC<JourneyChecklistProps> = ({
  items,
  phase,
  cancerType,
  onItemToggle,
  editable = true
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Initialize checked state from local storage or default
  useEffect(() => {
    const storageKey = `journey-checklist-${phase}-${cancerType}`;
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setCheckedItems(parsed);
      } catch (error) {
        console.warn('Failed to parse saved checklist state:', error);
      }
    }
  }, [phase, cancerType]);

  // Save to local storage when checklist changes
  useEffect(() => {
    const storageKey = `journey-checklist-${phase}-${cancerType}`;
    localStorage.setItem(storageKey, JSON.stringify(checkedItems));
  }, [checkedItems, phase, cancerType]);

  const handleItemToggle = (itemId: string) => {
    if (!editable) return;

    const newState = !checkedItems[itemId];
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: newState
    }));
    onItemToggle?.(itemId, newState);
  };

  const handleItemExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  // Filter items relevant to current cancer type
  const relevantItems = items.filter(item => 
    !item.cancerType || item.cancerType.includes(cancerType)
  );

  const completedCount = relevantItems.filter(item => checkedItems[item.id]).length;
  const totalCount = relevantItems.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const requiredItems = relevantItems.filter(item => item.required);
  const optionalItems = relevantItems.filter(item => !item.required);
  const completedRequired = requiredItems.filter(item => checkedItems[item.id]).length;

  return (
    <div className="journey-checklist">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress
          </span>
          <span className="text-sm text-gray-500">
            {completedCount}/{totalCount} completed
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Required Items Status */}
        {requiredItems.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            Required: {completedRequired}/{requiredItems.length} completed
          </div>
        )}
      </div>

      {/* Required Items */}
      {requiredItems.length > 0 && (
        <div className="mb-6">
          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Required Tasks
          </h5>
          <div className="space-y-2">
            {requiredItems.map((item) => (
              <ChecklistItemComponent
                key={item.id}
                item={item}
                checked={checkedItems[item.id] || false}
                onToggle={() => handleItemToggle(item.id)}
                onExpand={() => handleItemExpand(item.id)}
                expanded={expandedItem === item.id}
                editable={editable}
              />
            ))}
          </div>
        </div>
      )}

      {/* Optional Items */}
      {optionalItems.length > 0 && (
        <div>
          <h5 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            Optional Tasks
          </h5>
          <div className="space-y-2">
            {optionalItems.map((item) => (
              <ChecklistItemComponent
                key={item.id}
                item={item}
                checked={checkedItems[item.id] || false}
                onToggle={() => handleItemToggle(item.id)}
                onExpand={() => handleItemExpand(item.id)}
                expanded={expandedItem === item.id}
                editable={editable}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completion Celebration */}
      <AnimatePresence>
        {progressPercentage === 100 && totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-green-600 text-2xl">🎉</span>
              </div>
              <div className="ml-3">
                <h6 className="text-sm font-medium text-green-800">
                  Phase Complete!
                </h6>
                <p className="text-sm text-green-700">
                  You've completed all tasks for this phase. Great work!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Medical Reminder */}
      <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Remember:</strong> This checklist is a guide. Always follow your healthcare provider's specific instructions.
        </p>
      </div>
    </div>
  );
};

// Individual Checklist Item Component
interface ChecklistItemComponentProps {
  item: ChecklistItem;
  checked: boolean;
  onToggle: () => void;
  onExpand: () => void;
  expanded: boolean;
  editable: boolean;
}

const ChecklistItemComponent: React.FC<ChecklistItemComponentProps> = ({
  item,
  checked,
  onToggle,
  onExpand,
  expanded,
  editable
}) => {
  return (
    <motion.div
      className={`
        border rounded-lg transition-all duration-200
        ${checked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}
        ${expanded ? 'ring-2 ring-blue-200' : ''}
      `}
      layout
    >
      <div className="p-3">
        <div className="flex items-start">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            disabled={!editable}
            className={`
              flex-shrink-0 w-5 h-5 rounded border-2 mr-3 mt-0.5
              ${checked 
                ? 'bg-green-600 border-green-600' 
                : 'bg-white border-gray-300 hover:border-gray-400'
              }
              ${editable ? 'cursor-pointer' : 'cursor-default'}
              transition-colors duration-200 flex items-center justify-center
            `}
          >
            {checked && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}
          </button>

          {/* Item Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h6 className={`text-sm font-medium ${checked ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                {item.title}
                {item.required && (
                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Required
                  </span>
                )}
              </h6>
              
              {/* Expand Button */}
              <button
                onClick={onExpand}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
            </div>

            {/* Item Description */}
            <p className={`text-xs mt-1 ${checked ? 'text-green-700' : 'text-gray-600'}`}>
              {item.description}
            </p>

            {/* Estimated Time */}
            {item.estimatedTime && (
              <div className="mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Estimated time: {item.estimatedTime}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 pl-8 border-t border-gray-200 pt-3"
            >
              {/* Additional Resources */}
              {item.resources && item.resources.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-gray-700 mb-2">
                    Helpful Resources:
                  </div>
                  <ul className="space-y-1">
                    {item.resources.map((resource, index) => (
                      <li key={index} className="text-xs text-blue-600 hover:text-blue-800">
                        <a href={resource} className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Learn more
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips or Additional Info */}
              <div className="mt-2">
                <p className="text-xs text-gray-600">
                  💡 <strong>Tip:</strong> Don't hesitate to ask your healthcare team for clarification on any of these tasks.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default JourneyChecklist;
