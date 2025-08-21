import React from 'react';

interface ExpertiseArea {
  title: string;
  description: string;
  icon: string;
  highlights?: string[];
}

interface ExpertiseSectionProps {
  title: string;
  description?: string;
  categories: {
    title: string;
    areas: ExpertiseArea[];
  }[];
}

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ title, description, categories }) => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        {description && (
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
        )}
      </div>

      <div className="space-y-16">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              {category.title}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {category.areas.map((area, areaIndex) => (
                <div 
                  key={areaIndex}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Icon and title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                      {area.icon}
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {area.title}
                    </h4>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {area.description}
                  </p>
                  
                  {/* Highlights */}
                  {area.highlights && (
                    <ul className="space-y-2">
                      {area.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertiseSection;