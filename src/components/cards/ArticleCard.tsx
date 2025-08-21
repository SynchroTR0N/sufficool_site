import React from 'react';
import { Link } from 'gatsby';

interface ArticleCardProps {
  number: string;
  title: string;
  description: string;
  readTime: string;
  href: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  number, 
  title, 
  description, 
  readTime, 
  href 
}) => {
  return (
    <Link 
      to={href}
      className="group block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
    >
      <div className="flex items-start space-x-4">
        {/* Article Number Badge */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg group-hover:bg-blue-700 transition">
            {number}
          </div>
        </div>

        {/* Article Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
          
          {/* Meta Information */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readTime}</span>
            </div>
            
            <div className="flex items-center text-blue-600 group-hover:text-blue-700 text-sm font-medium">
              <span>Read article</span>
              <svg 
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;