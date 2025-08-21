import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const CredentialsHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 -mx-6 md:-mx-12 px-6 md:px-12 py-16 mb-16 rounded-lg">
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Professional Photo */}
        <div className="relative order-2 lg:order-1">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-8 shadow-lg">
            <div className="bg-white rounded-xl p-8 text-center shadow-md">
              {/* Dr. Sufficool's professional photo */}
              <div className="w-64 h-80 mx-auto mb-6 overflow-hidden rounded-xl">
                <StaticImage
                  src="../../images/headshots/headshot2.webp"
                  alt="Dr. Daniel Sufficool, MD, DABR - Board-Certified Radiation Oncologist"
                  placeholder="blurred"
                  layout="constrained"
                  width={256}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-30"></div>
        </div>

        {/* Credentials Content */}
        <div className="space-y-6 order-1 lg:order-2">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-2">
              Daniel Sufficool, MD, DABR
            </h1>
            <p className="text-xl text-blue-700 font-medium mb-4">
              Board-Certified Radiation Oncologist
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
              <p className="text-lg text-gray-700">
                <strong>Aultman Hospital</strong> - Canton, Ohio
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
              <p className="text-lg text-gray-700">
                <strong>American Board of Radiology</strong> - Board Certified
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
              <p className="text-lg text-gray-700">
                <strong>Loma Linda University</strong> - Chief Resident
              </p>
            </div>
          </div>
          
          <div className="bg-white/80 rounded-lg p-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Dedicated to providing exceptional, evidence-based cancer care with 
              advanced radiation therapy techniques to patients throughout Northeast Ohio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsHero;