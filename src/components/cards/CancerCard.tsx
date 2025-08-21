import React from 'react';
import { Link } from 'gatsby';

interface CancerCardProps {
  icon: string;
  title: string;
  articleCount: number;
  href: string;
  color: string;
  description?: string;
}

// Professional Medical Icons as SVG components
const MedicalIcons = {
  prostate: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C9.24 2 7 4.24 7 7c0 2.85 2.92 5.21 5 9.88C14.08 12.21 17 9.85 17 7c0-2.76-2.24-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      <circle cx="12" cy="19" r="3"/>
    </svg>
  ),
  lung: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.5 2.5c-.83 0-1.5.67-1.5 1.5v1c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-1c0-.83-.67-1.5-1.5-1.5zm5 0c-.83 0-1.5.67-1.5 1.5v1c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-1c0-.83-.67-1.5-1.5-1.5zM7 7v10c0 2.76 2.24 5 5 5s5-2.24 5-5V7c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2z"/>
      <path d="M9 9h6v2H9V9zm0 3h6v2H9v-2zm0 3h4v2H9v-2z"/>
    </svg>
  ),
  gynecologic: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.69 2 6 4.69 6 8c0 2.34 1.36 4.35 3.35 5.35L8 16h8l-1.35-2.65C16.64 12.35 18 10.34 18 8c0-3.31-2.69-6-6-6zm0 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"/>
      <path d="M11 18v4h2v-4h-2z"/>
    </svg>
  ),
  gi: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.69 2 6 4.69 6 8v8c0 3.31 2.69 6 6 6s6-2.69 6-6V8c0-3.31-2.69-6-6-6zm4 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V8c0-2.21 1.79-4 4-4s4 1.79 4 4v8z"/>
      <circle cx="12" cy="8" r="1"/>
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="16" r="1"/>
    </svg>
  )
};

const getIconForType = (iconEmoji: string, colorClass: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    '🎯': <div className={`${colorClass}`}>{MedicalIcons.prostate}</div>,
    '🫁': <div className={`${colorClass}`}>{MedicalIcons.lung}</div>,
    '🌸': <div className={`${colorClass}`}>{MedicalIcons.gynecologic}</div>,
    '🔬': <div className={`${colorClass}`}>{MedicalIcons.gi}</div>,
  };
  
  return iconMap[iconEmoji] || <span className="text-3xl">{iconEmoji}</span>;
};

const CancerCard: React.FC<CancerCardProps> = ({ 
  icon, 
  title, 
  articleCount, 
  href, 
  color,
  description 
}) => {
  // Map colors to Tailwind medical colors
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string, text: string, badge: string, icon: string } } = {
      '#4A90E2': { 
        bg: 'bg-medical-gray-50 border-medical-cancer-prostate/20', 
        text: 'text-medical-cancer-prostate', 
        badge: 'bg-medical-cancer-prostate text-white',
        icon: 'text-medical-cancer-prostate'
      },
      '#7ED321': { 
        bg: 'bg-medical-gray-50 border-medical-cancer-lung/20', 
        text: 'text-medical-cancer-lung', 
        badge: 'bg-medical-cancer-lung text-white',
        icon: 'text-medical-cancer-lung'
      },
      '#9B59B6': { 
        bg: 'bg-medical-gray-50 border-medical-cancer-gynecologic/20', 
        text: 'text-medical-cancer-gynecologic', 
        badge: 'bg-medical-cancer-gynecologic text-white',
        icon: 'text-medical-cancer-gynecologic'
      },
      '#E67E22': { 
        bg: 'bg-medical-gray-50 border-medical-cancer-gi/20', 
        text: 'text-medical-cancer-gi', 
        badge: 'bg-medical-cancer-gi text-white',
        icon: 'text-medical-cancer-gi'
      },
    };
    
    return colorMap[color] || { 
      bg: 'bg-medical-gray-50 border-medical-gray-200', 
      text: 'text-medical-primary', 
      badge: 'bg-medical-primary text-white',
      icon: 'text-medical-primary'
    };
  };

  const colorClasses = getColorClasses(color);

  return (
    <Link 
      to={href}
      className={`group block bg-white border-2 ${colorClasses.bg} rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col`}
    >
      <div className="text-center space-y-6 flex-grow">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-100">
          {getIconForType(icon, colorClasses.icon)}
        </div>

        {/* Title */}
        <h3 className={`text-xl font-bold group-hover:opacity-90 transition ${colorClasses.text}`}>
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-medical-gray-600 text-sm leading-relaxed px-2">
            {description}
          </p>
        )}

        {/* Article Count Badge */}
        <div className="flex items-center justify-center mt-auto">
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${colorClasses.badge}`}>
            {articleCount} Articles
          </div>
        </div>

        {/* Learn More Arrow */}
        <div className={`flex items-center justify-center ${colorClasses.text} group-hover:opacity-80 transition pt-4`}>
          <span className="text-sm font-medium mr-2">Learn more</span>
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

export default CancerCard;