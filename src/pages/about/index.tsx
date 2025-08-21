import React, { useEffect } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { navigate } from 'gatsby';
import BaseLayout from '@/components/layout/BaseLayout';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import TabNavigation from '@/components/navigation/TabNavigation';

const AboutIndexPage: React.FC<PageProps> = ({ location }) => {
  const seoProps = {
    title: "About Dr. Daniel Sufficool",
    description: "Learn about Dr. Daniel Sufficool, Board-Certified Radiation Oncologist at Aultman Hospital in Canton, Ohio.",
    url: location.pathname,
    type: 'website' as const,
    isMedicalContent: true,
    keywords: [
      'daniel sufficool',
      'radiation oncologist',
      'aultman hospital',
      'canton ohio',
      'cancer treatment'
    ],
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'About' }
  ];

  const tabs = [
    {
      id: 'professional',
      label: 'Professional',
      href: '/about/professional/'
    },
    {
      id: 'personal',
      label: 'Personal & Philosophy',
      href: '/about/personal-philosophy/'
    }
  ];

  // Redirect to professional tab by default
  useEffect(() => {
    navigate('/about/professional/', { replace: true });
  }, []);

  return (
    <BaseLayout seoProps={seoProps}>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Dr. Daniel Sufficool
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed">
          Board-Certified Radiation Oncologist dedicated to providing exceptional cancer care 
          to the Canton community and Northeast Ohio.
        </p>
      </div>

      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab="professional" className="mb-8" />

      {/* Content will be handled by redirect to professional page */}
      <div className="text-center py-12">
        <p className="text-gray-600">Redirecting to professional information...</p>
      </div>
    </BaseLayout>
  );
};

export default AboutIndexPage;

export const Head: HeadFC = () => (
  <>
    <title>About Dr. Daniel Sufficool | Radiation Oncologist</title>
    <meta name="description" content="Learn about Dr. Daniel Sufficool, Board-Certified Radiation Oncologist at Aultman Hospital in Canton, Ohio." />
  </>
);