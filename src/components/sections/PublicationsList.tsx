import React from 'react';

interface Publication {
  title: string;
  journal: string;
  year: string;
  authors?: string;
  pmid?: string;
  type: 'publication' | 'presentation' | 'award';
}

interface PublicationsListProps {
  title: string;
  publications: Publication[];
  highlights?: string[];
}

const PublicationsList: React.FC<PublicationsListProps> = ({ title, publications, highlights }) => {
  const getTypeConfig = (type: Publication['type']) => {
    switch (type) {
      case 'publication':
        return {
          icon: '📄',
          color: 'bg-blue-100 text-blue-800',
          label: 'Publication'
        };
      case 'presentation':
        return {
          icon: '🎤',
          color: 'bg-green-100 text-green-800',
          label: 'Presentation'
        };
      case 'award':
        return {
          icon: '🏆',
          color: 'bg-yellow-100 text-yellow-800',
          label: 'Award'
        };
      default:
        return {
          icon: '📄',
          color: 'bg-gray-100 text-gray-800',
          label: 'Publication'
        };
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
      
      {/* Research highlights */}
      {highlights && (
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Focus</h3>
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Publications list */}
      <div className="space-y-6">
        {publications.map((pub, index) => {
          const typeConfig = getTypeConfig(pub.type);
          
          return (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{typeConfig.icon}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                    {typeConfig.label}
                  </span>
                  <span className="text-sm text-gray-500">{pub.year}</span>
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {pub.title}
              </h4>
              
              <p className="text-blue-600 font-medium mb-2">
                {pub.journal}
              </p>
              
              {pub.authors && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Authors:</strong> {pub.authors}
                </p>
              )}
              
              {pub.pmid && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">PMID:</span>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {pub.pmid}
                  </code>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Note for more publications */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          For a complete list of publications and presentations, please see my 
          <span className="text-blue-600 font-medium"> professional portfolio</span> or contact me directly.
        </p>
      </div>
    </section>
  );
};

export default PublicationsList;