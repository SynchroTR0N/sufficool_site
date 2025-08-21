import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 -mx-6 md:-mx-12 px-6 md:px-12 py-16 mb-16 rounded-lg">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Hero Content */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Empowering Patients Through Understanding
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Clear communication and comprehensive education for your cancer journey
          </p>
          
          <p className="text-lg text-blue-700 font-medium">
            Proudly serving Canton at Aultman Hospital
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              to="/prostate-cancer/" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md text-center"
            >
              Explore Cancer Information
            </Link>
            <Link 
              to="/about/" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition text-center"
            >
              About Dr. Sufficool
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-8 shadow-lg">
            <div className="bg-white rounded-xl p-6 text-center shadow-md">
              {/* Dr. Sufficool's professional photo */}
              <div className="w-48 h-60 mx-auto mb-4 overflow-hidden rounded-xl">
                <StaticImage
                  src="../../images/headshots/headshot1.webp"
                  alt="Dr. Daniel Sufficool, MD, DABR - Board-Certified Radiation Oncologist"
                  placeholder="blurred"
                  layout="constrained"
                  width={192}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">
                  Daniel Sufficool, MD, DABR
                </h3>
                <p className="text-blue-600 font-medium">Radiation Oncologist</p>
                <p className="text-gray-600 text-sm">
                  Board-certified specialist in radiation oncology<br />
                  Aultman Hospital, Canton, Ohio
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;