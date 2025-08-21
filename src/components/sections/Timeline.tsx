import React from 'react';

interface TimelineItem {
  period: string;
  institution: string;
  title: string;
  description: string;
  highlights?: string[];
  icon?: string;
}

interface TimelineProps {
  title: string;
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ title, items }) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-300"></div>
        
        <div className="space-y-12">
          {items.map((item, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-blue-600 rounded-full shadow-lg flex-shrink-0">
                <div className="text-white text-xl md:text-2xl font-bold">
                  {item.icon || (index + 1)}
                </div>
              </div>
              
              {/* Content */}
              <div className="ml-8 md:ml-12 flex-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  {/* Period badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                    {item.period}
                  </div>
                  
                  {/* Institution and title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.institution}
                  </h3>
                  <p className="text-lg text-blue-700 font-medium mb-3">
                    {item.title}
                  </p>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {/* Highlights */}
                  {item.highlights && (
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;