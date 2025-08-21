import React, { useState } from 'react';
import { Link } from 'gatsby';
import SEO from './SEO';

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; path?: string }>;
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

const Layout = ({ children, breadcrumbs, seoProps }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO {...seoProps} />
      {/* Skip to content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
        Skip to main content
      </a>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo and title */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold">DS</span>
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold">Dr. Daniel Sufficool</h1>
                  <p className="text-xs md:text-sm text-blue-100">Cancer Treatment Education</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <div className="relative group">
                <button className="px-4 py-2 hover:bg-white/10 rounded-lg transition flex items-center space-x-1">
                  <span>Cancer Types</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/prostate-cancer/" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg">
                    Prostate Cancer
                  </Link>
                  <Link to="/lung-cancer/" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-b-lg">
                    Lung Cancer
                  </Link>
                </div>
              </div>
              
              <Link to="/shared/understanding-cancer/how-cancer-develops/" className="px-4 py-2 hover:bg-white/10 rounded-lg transition">
                Understanding Cancer
              </Link>
              <Link to="/shared/universal-concerns/managing-anxiety/" className="px-4 py-2 hover:bg-white/10 rounded-lg transition">
                Patient Resources
              </Link>
              <Link to="/about/dr-sufficool/" className="px-4 py-2 hover:bg-white/10 rounded-lg transition">
                About
              </Link>
              <Link to="/about/contact/" className="px-4 py-2 hover:bg-white/10 rounded-lg transition">
                Contact
              </Link>
              
              {/* Search placeholder */}
              <div className="ml-4 relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-48 px-4 py-2 rounded-lg bg-white/20 placeholder-blue-100 text-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 transition"
                />
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-blue-500">
              <Link to="/prostate-cancer/" className="block py-2 hover:text-blue-200">Prostate Cancer</Link>
              <Link to="/lung-cancer/" className="block py-2 hover:text-blue-200">Lung Cancer</Link>
              <Link to="/shared/understanding-cancer/how-cancer-develops/" className="block py-2 hover:text-blue-200">Understanding Cancer</Link>
              <Link to="/shared/universal-concerns/managing-anxiety/" className="block py-2 hover:text-blue-200">Patient Resources</Link>
              <Link to="/about/dr-sufficool/" className="block py-2 hover:text-blue-200">About</Link>
              <Link to="/about/contact/" className="block py-2 hover:text-blue-200">Contact</Link>
            </nav>
          )}
        </div>
      </header>

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="bg-gray-50 border-b" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 py-2">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-blue-600">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {crumb.path ? (
                    <Link to={crumb.path} className="text-gray-500 hover:text-blue-600">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>
      )}

      {/* Main content */}
      <main id="main-content" className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-400 text-sm">
                Evidence-based cancer treatment education by Dr. Daniel Sufficool, 
                Radiation Oncologist.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about/dr-sufficool/" className="text-gray-400 hover:text-white">About Dr. Sufficool</Link></li>
                <li><Link to="/about/contact/" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/shared/understanding-cancer/how-cancer-develops/" className="text-gray-400 hover:text-white">Understanding Cancer</Link></li>
                <li><Link to="/about/using-this-site/" className="text-gray-400 hover:text-white">Using This Site</Link></li>
              </ul>
            </div>

            {/* Cancer Types */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Cancer Types</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/prostate-cancer/" className="text-gray-400 hover:text-white">Prostate Cancer</Link></li>
                <li><Link to="/lung-cancer/" className="text-gray-400 hover:text-white">Lung Cancer</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Patient Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/shared/universal-concerns/managing-anxiety/" className="text-gray-400 hover:text-white">Managing Anxiety</Link></li>
                <li><Link to="/shared/medical-concepts/radiation-basics/" className="text-gray-400 hover:text-white">Radiation Basics</Link></li>
                <li><Link to="/prostate-cancer/staging/" className="text-gray-400 hover:text-white">Cancer Staging</Link></li>
                <li><Link to="/prostate-cancer/journey/diagnosis/" className="text-gray-400 hover:text-white">Diagnosis Journey</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Dr. Daniel Sufficool. All rights reserved.</p>
            <p className="mt-2">
              This information is for educational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;