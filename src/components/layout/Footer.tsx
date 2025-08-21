import React from 'react';
import { Link } from 'gatsby';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto max-w-[1200px] px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Dr. Sufficool Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Daniel Sufficool, MD, DABR
            </h4>
            <div className="space-y-2">
              <p className="text-gray-400">Radiation Oncologist</p>
              <p className="text-gray-400">Aultman Hospital - Canton, Ohio</p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-500">
                  Board-certified radiation oncologist dedicated to patient education 
                  and compassionate cancer care.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link 
                to="/about/" 
                className="block hover:text-white transition"
              >
                About Dr. Sufficool
              </Link>
              <Link 
                to="/prostate-cancer/" 
                className="block hover:text-white transition"
              >
                Prostate Cancer Information
              </Link>
              <Link 
                to="/lung-cancer/" 
                className="block hover:text-white transition"
              >
                Lung Cancer Information
              </Link>
              <Link 
                to="/cancer-journeys/" 
                className="block hover:text-white transition"
              >
                Cancer Journeys
              </Link>
              <Link 
                to="/contact/" 
                className="block hover:text-white transition"
              >
                Contact Information
              </Link>
            </div>
          </div>

          {/* Languages Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Languages</h4>
            <div className="space-y-2">
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>English</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Español</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Português</span>
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-500">
                Educational resources available in multiple languages to serve 
                our diverse community.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2024 Dr. Daniel Sufficool. All rights reserved.
          </div>
          <div className="text-sm text-gray-500">
            <p>
              <strong>Medical Disclaimer:</strong> This information is for educational purposes only 
              and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;