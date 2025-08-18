
import React from 'react';

interface TimelineEvent {
  phase: string;
  duration: string;
  description: string;
  tasks: string[];
}

interface TreatmentTimelineProps {
  title?: string;
  events?: TimelineEvent[];
  className?: string;
}

const TreatmentTimeline: React.FC<TreatmentTimelineProps> = ({ 
  title = "Treatment Timeline", 
  events = [],
  className = '' 
}) => {
  return (
    <div className={`treatment-timeline bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-900">{event.phase}</h4>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {event.duration}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{event.description}</p>
              {event.tasks && event.tasks.length > 0 && (
                <ul className="text-xs text-gray-500 space-y-1">
                  {event.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentTimeline;
