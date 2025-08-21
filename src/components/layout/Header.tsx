import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { buildNavigationFromNodes, getCancerTypesForMenu } from '@/utils/navigation-builder';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Query all cancer-related MDX files
  const data = useStaticQuery(graphql`
    query HeaderNavigationQuery {
      allMdx(filter: {
        frontmatter: {
          slug: { regex: "/^cancer-information/" }
        }
      }) {
        nodes {
          id
          frontmatter {
            slug
            title
            category
            cancerType
            cancerTypeDisplay
            isHub
            menuOrder
          }
        }
      }
    }
  `);

  // Build navigation structure
  const navigation = buildNavigationFromNodes(data.allMdx.nodes);
  const cancerTypes = getCancerTypesForMenu(navigation);

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Logo and title */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">DS</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight">Dr. Daniel Sufficool</h1>
              <p className="text-xs md:text-sm text-blue-100">Cancer Treatment Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className="px-4 py-2 hover:bg-white/10 rounded-lg transition"
            >
              Home
            </Link>
            
            <Link 
              to="/about/" 
              className="px-4 py-2 hover:bg-white/10 rounded-lg transition"
            >
              About
            </Link>
            
            {/* Cancer Information Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 hover:bg-white/10 rounded-lg transition flex items-center space-x-1">
                <span>Cancer Information</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigation.cancerTypes.map((cancerType, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0">
                      {/* Cancer Type Hub Link */}
                      <Link
                        to={`/${cancerType.slug}/`}
                        className="block px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 font-medium"
                      >
                        {cancerType.displayName}
                      </Link>
                      
                      {/* Articles Submenu */}
                      {cancerType.articles.length > 0 && (
                        <div className="bg-gray-50 px-4 pb-2">
                          {cancerType.articles.slice(0, 3).map((article) => (
                            <Link
                              key={article.id}
                              to={`/${article.slug}/`}
                              className="block px-2 py-1 text-sm text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors"
                            >
                              {article.title}
                            </Link>
                          ))}
                          {cancerType.articles.length > 3 && (
                            <Link
                              to={`/${cancerType.slug}/`}
                              className="block px-2 py-1 text-xs text-blue-500 hover:text-blue-700 font-medium"
                            >
                              View all {cancerType.articles.length} articles →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              to="/cancer-journeys/" 
              className="px-4 py-2 hover:bg-white/10 rounded-lg transition"
            >
              Cancer Journeys
            </Link>
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
          <div className="lg:hidden border-t border-white/20">
            <nav className="py-4 space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-2 hover:bg-white/10 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              <Link 
                to="/about/" 
                className="block px-4 py-2 hover:bg-white/10 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="px-4 py-2">
                <p className="text-blue-100 text-sm font-medium mb-2">Cancer Information</p>
                <div className="space-y-2 ml-4">
                  {navigation.cancerTypes.map((cancerType, index) => (
                    <div key={index} className="border-b border-blue-400/20 last:border-b-0 pb-2 last:pb-0">
                      {/* Cancer Type Hub Link */}
                      <Link
                        to={`/${cancerType.slug}/`}
                        className="block px-2 py-1 text-blue-100 hover:text-white hover:bg-white/10 rounded transition text-sm font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {cancerType.displayName}
                      </Link>
                      
                      {/* Articles Submenu */}
                      {cancerType.articles.length > 0 && (
                        <div className="ml-2 mt-1 space-y-1">
                          {cancerType.articles.slice(0, 2).map((article) => (
                            <Link
                              key={article.id}
                              to={`/${article.slug}/`}
                              className="block px-2 py-1 text-xs text-blue-200 hover:text-white hover:bg-white/10 rounded transition"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {article.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                to="/cancer-journeys/" 
                className="block px-4 py-2 hover:bg-white/10 rounded-lg transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cancer Journeys
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;