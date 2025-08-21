import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import BaseLayout from "../components/layout/BaseLayout"
import HeroSection from "../components/sections/HeroSection"
import AboutPreview from "../components/sections/AboutPreview"
import CancerCard from "../components/cards/CancerCard"
import FeaturedCard from "../components/cards/FeaturedCard"

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const seoProps = {
    title: "Evidence-Based Cancer Treatment Education",
    description: "Comprehensive, evidence-based cancer treatment information with interactive tools and patient resources by Dr. Daniel Sufficool, Radiation Oncologist.",
    url: location.pathname,
    type: 'website' as const,
    isMedicalContent: true,
    keywords: [
      'cancer treatment',
      'radiation oncology',
      'evidence-based medicine',
      'patient education',
      'cancer care',
      'radiation therapy',
    ],
  };

  const cancerTypes = [
    {
      icon: "🎯",
      title: "Prostate Cancer",
      description: "Comprehensive treatment guidance for prostate cancer patients and families",
      href: "/prostate-cancer/",
      color: "#4A90E2",
      articleCount: 15
    },
    {
      icon: "🫁",
      title: "Lung Cancer", 
      description: "Evidence-based information for lung cancer diagnosis and treatment",
      href: "/lung-cancer/",
      color: "#7ED321",
      articleCount: 12
    },
    {
      icon: "🌸",
      title: "Gynecologic Cancers",
      description: "Specialized care information for gynecologic cancer patients",
      href: "/gynecologic-cancers/",
      color: "#9B59B6",
      articleCount: 10
    },
    {
      icon: "🔬",
      title: "GI Cancers",
      description: "Comprehensive resources for gastrointestinal cancer treatment",
      href: "/gi-cancers/",
      color: "#E67E22", 
      articleCount: 8
    }
  ];

  const featuredContent = [
    {
      type: 'article' as const,
      title: "Understanding Your Radiation Treatment",
      excerpt: "A comprehensive guide to what happens during radiation therapy, from planning to completion.",
      readTime: "15 min",
      href: "/prostate-cancer/radiation-treatment-overview/"
    },
    {
      type: 'journey' as const,
      title: "Newly Diagnosed with Prostate Cancer",
      excerpt: "A curated reading path for patients beginning their prostate cancer journey.",
      articleCount: 8,
      href: "/cancer-journeys/newly-diagnosed-prostate/"
    },
    {
      type: 'article' as const,
      title: "Managing Side Effects",
      excerpt: "Practical strategies for managing common radiation side effects and improving quality of life.",
      readTime: "20 min",
      href: "/shared/side-effects-management/"
    }
  ];

  return (
    <BaseLayout seoProps={seoProps}>
      <HeroSection />
      
      <AboutPreview />

      {/* Cancer Type Cards */}
      <section className="py-20 bg-medical-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-medical-gray-900 mb-6">
              Cancer Information by Type
            </h2>
            <p className="text-xl text-medical-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive educational resources tailored to specific cancer diagnoses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cancerTypes.map((cancer, index) => (
              <CancerCard key={index} {...cancer} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-medical-gray-900 mb-6">
              Featured Educational Resources
            </h2>
            <p className="text-xl text-medical-gray-600 max-w-3xl mx-auto leading-relaxed">
              Carefully curated content to help you understand your diagnosis and treatment options
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {featuredContent.map((content, index) => (
              <FeaturedCard key={index} {...content} />
            ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Evidence-Based Cancer Treatment Education | Dr. Daniel Sufficool</title>
    <meta name="description" content="Comprehensive, evidence-based cancer treatment information with interactive tools and patient resources by Dr. Daniel Sufficool, Radiation Oncologist." />
  </>
)