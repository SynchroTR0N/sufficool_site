import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SEO from '../SEO';

interface BaseLayoutProps {
  children: React.ReactNode;
  seoProps?: {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    author?: string;
    datePublished?: string;
    dateModified?: string;
    cancerType?: string;
    category?: string;
    medicalSpecialty?: string;
    isMedicalContent?: boolean;
  };
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, seoProps }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO {...seoProps} />
      
      {/* Skip to content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-grow">
        <div className="container mx-auto max-w-[1200px] px-6 md:px-12 py-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BaseLayout;