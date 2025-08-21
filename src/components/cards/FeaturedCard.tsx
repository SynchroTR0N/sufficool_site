import React from 'react';
import { Link } from 'gatsby';

interface FeaturedCardProps {
  type: 'article' | 'journey';
  title: string;
  excerpt: string;
  href: string;
  readTime?: string;
  articleCount?: number;
}

// Professional icons for featured content
const FeatureIcons = {
  article: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  ),
  journey: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 20l-5.447-2.724A1 1 0 0 1 3 16.382V5.618a1 1 0 0 1 .553-.894L9 2l6 3 5.447-2.724A1 1 0 0 1 21 3.618v10.764a1 1 0 0 1-.553.894L15 18l-6-3z"/>
      <polyline points="9,2 9,18"/>
      <polyline points="15,6 15,20"/>
    </svg>
  )
};

const FeaturedCard: React.FC<FeaturedCardProps> = ({ 
  type, 
  title, 
  excerpt, 
  href, 
  readTime, 
  articleCount 
}) => {
  const typeConfig = {
    article: {
      icon: FeatureIcons.article,
      label: 'Article',
      color: 'bg-medical-info/10 text-medical-info border-medical-info/20',
      borderColor: 'border-medical-info/20',
      hoverColor: 'group-hover:border-medical-info/40'
    },
    journey: {
      icon: FeatureIcons.journey,
      label: 'Journey',
      color: 'bg-medical-secondary/10 text-medical-secondary border-medical-secondary/20',
      borderColor: 'border-medical-secondary/20',
      hoverColor: 'group-hover:border-medical-secondary/40'
    }
  };

  const config = typeConfig[type];

  return (
    <Link 
      to={href}
      className={`group block bg-white border-2 ${config.borderColor} ${config.hoverColor} rounded-xl p-8 hover:shadow-xl transition-all duration-300 h-full flex flex-col`}
    >
      {/* Type Indicator */}
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${config.color}`}>
          {config.icon}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
          {config.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-medical-gray-900 group-hover:text-medical-primary transition mb-4 leading-tight">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-medical-gray-600 leading-relaxed mb-6 flex-grow">
        {excerpt}
      </p>

      {/* Meta Information */}
      <div className="flex items-center justify-between text-sm text-medical-gray-500 mt-auto pt-6 border-t border-medical-gray-200">
        {type === 'article' && readTime ? (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{readTime} read</span>
          </div>
        ) : type === 'journey' && articleCount ? (
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="font-medium">{articleCount} articles</span>
          </div>
        ) : null}

        <div className="flex items-center space-x-2 text-medical-primary group-hover:text-medical-primary-dark transition">
          <span className="font-medium">Read more</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCard;