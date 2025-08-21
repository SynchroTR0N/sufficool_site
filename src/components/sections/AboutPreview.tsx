import React from 'react';
import { Link } from 'gatsby';

const AboutPreview: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Partner in Cancer Care
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Dr. Sufficool's approach to cancer treatment centers on clear communication, 
          comprehensive education, and compassionate care for every patient.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Communication First */}
        <div className="bg-blue-50 rounded-xl p-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Communication First</h3>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            I believe that understanding your diagnosis and treatment options is 
            fundamental to your healing journey. My approach prioritizes clear, 
            compassionate communication in every interaction.
          </p>
          <Link 
            to="/about/" 
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition"
          >
            Learn more about my approach
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Comprehensive Education */}
        <div className="bg-green-50 rounded-xl p-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Comprehensive Education</h3>
          </div>
          <p className="text-gray-700 mb-6 leading-relaxed">
            This website provides detailed information about various cancer types 
            and treatments. Take your time exploring, and bring any questions to 
            your appointment.
          </p>
          <Link 
            to="/prostate-cancer/" 
            className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition"
          >
            Explore cancer information
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;