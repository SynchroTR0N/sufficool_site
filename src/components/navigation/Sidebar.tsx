import React, { useState } from 'react';
import { Link } from 'gatsby';

interface SidebarLink {
  title: string;
  href: string;
  active?: boolean;
}

interface SidebarProps {
  title: string;
  links: SidebarLink[];
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title, links, className = '' }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
        >
          <span className="font-medium text-gray-900">{title}</span>
          <svg 
            className={`w-5 h-5 text-gray-500 transform transition-transform ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Mobile Sidebar */}
        {mobileOpen && (
          <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <nav className="p-4 space-y-2">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`block px-3 py-2 rounded-lg text-sm transition ${
                    link.active
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block w-72 flex-shrink-0 ${className}`}>
        <div className="sticky top-24 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      link.active
                        ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600 pl-2'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;