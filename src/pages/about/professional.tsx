import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import BaseLayout from '@/components/layout/BaseLayout';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import TabNavigation from '@/components/navigation/TabNavigation';
import CredentialsHero from '@/components/sections/CredentialsHero';
import Timeline from '@/components/sections/Timeline';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import PublicationsList from '@/components/sections/PublicationsList';

const ProfessionalPage: React.FC<PageProps> = ({ location }) => {
  const seoProps = {
    title: "Professional Background - Dr. Daniel Sufficool",
    description: "Professional background, education, and expertise of Dr. Daniel Sufficool, Board-Certified Radiation Oncologist at Aultman Hospital.",
    url: location.pathname,
    type: 'website' as const,
    isMedicalContent: true,
    keywords: [
      'daniel sufficool education',
      'radiation oncologist training',
      'loma linda residency',
      'aultman hospital',
      'radiation oncology expertise'
    ],
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about/' },
    { label: 'Professional' }
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

  // Education and career timeline
  const timelineItems = [
    {
      period: "November 2024 - Present",
      institution: "Aultman Hospital - Canton, Ohio",
      title: "Radiation Oncologist",
      description: "Providing comprehensive radiation therapy services specializing in prostate, lung, gynecologic, and gastrointestinal cancers. Leading advanced brachytherapy programs including HDR gynecologic treatments and prostate seed implants.",
      highlights: [
        "Specialty focus: Prostate, Lung, Gyn, GI cancers",
        "HDR Gynecologic Brachytherapy program",
        "Prostate Seed Brachytherapy",
        "Comprehensive radiation oncology services"
      ],
      icon: "🏥"
    },
    {
      period: "September 2022 - October 2024",
      institution: "Alabama Cancer Care - Montgomery, Selma",
      title: "Radiation Oncologist",
      description: "Pioneered innovative cancer care programs across multiple locations in Alabama. Led groundbreaking initiatives in SBRT development and multidisciplinary care coordination for 12 clinical sites.",
      highlights: [
        "Pioneered Barrigel Program in Alabama",
        "Ground-up development of SBRT program",
        "Developed and led chart rounds for 12 sites",
        "Advanced cancer care program leadership"
      ],
      icon: "🚀"
    },
    {
      period: "October 2021 - September 2022",
      institution: "Sufficool Enterprises, LLC",
      title: "Founder & Locums Tenens Physician",
      description: "Founded independent medical practice providing specialized radiation oncology services across multiple healthcare systems nationwide. Demonstrated entrepreneurial leadership while delivering expert clinical care and maintaining treatment continuity for cancer patients.",
      highlights: [
        "Founded and operated independent medical practice",
        "Multi-system healthcare delivery expertise",
        "Entrepreneurial leadership in healthcare",
        "Maintained clinical excellence across diverse facilities",
        "Flexible, patient-centered care delivery model"
      ],
      icon: "🚀"
    },
    {
      period: "August 2020 - October 2021",
      institution: "Kettering Health Network",
      title: "Radiation Oncologist",
      description: "Led innovative clinical programs including the establishment of Urology Tumor Board and comprehensive care path development. Achieved exceptional 4.8/5-star patient satisfaction rating while mastering advanced radiation technologies.",
      highlights: [
        "Started and headed Urology Tumor Board",
        "Care Path Development leadership",
        "4.8/5-star patient satisfaction rating",
        "Advanced technologies: Gamma Knife, SBRT, SRS, IMRT, 3D, HDR Brachytherapy",
        "Comprehensive cancer care across multiple treatment modalities"
      ],
      icon: "⭐"
    },
    {
      period: "July 2016 - June 2020",
      institution: "Loma Linda University Medical Center",
      title: "Chief Resident - Radiation Oncology (ACGME 4300521006)",
      description: "Distinguished residency training with Chief Resident appointment and Quality Improvement Project leadership. Led a multidisciplinary group of 12-15 talented individuals to exceed quality benchmark goals. Received specialized training in cutting-edge techniques including proton therapy.",
      highlights: [
        "Chief Resident - demonstrated exceptional leadership",
        "Quality Improvement Project Leader: led 12-15 member multidisciplinary team",
        "Advanced training: Proton Therapy, IMRT, SBRT, SRS, Brachytherapy (LDR, HDR)",
        "Clinical research leading to national recognition and awards",
        "American Radium Society Young Oncologist Award (2019)",
        "American Brachytherapy Society Prostate Workshop (2019)"
      ],
      icon: "👨‍⚕️"
    },
    {
      period: "June 2015 - June 2016",
      institution: "Huntington Memorial Hospital",
      title: "Preliminary Internal Medicine Internship (ACGME 1400511056)",
      description: "Foundational medical training with comprehensive internal medicine experience, building essential clinical skills and medical decision-making abilities in preparation for specialized radiation oncology training.",
      highlights: [
        "ACGME accredited program (1400511056)",
        "Comprehensive internal medicine training",
        "Foundation for specialized residency",
        "Clinical excellence and patient care focus"
      ],
      icon: "🩺"
    },
    {
      period: "August 2011 - May 2015",
      institution: "Loma Linda University School of Medicine",
      title: "Doctor of Medicine (MD)",
      description: "Distinguished medical education with Class President leadership role, demonstrating exceptional academic performance and commitment to medical excellence. Developed early interest in oncology and radiation physics that would shape future specialization.",
      highlights: [
        "Class President - elected leadership position",
        "Medical degree with academic distinction",
        "Early research involvement in oncology",
        "Strong foundation in medical sciences and patient care",
        "Community service and leadership involvement"
      ],
      icon: "🎓"
    },
    {
      period: "August 2006 - May 2010",
      institution: "Union College",
      title: "Bachelor of Science - International Rescue and Relief",
      description: "Unique undergraduate education combining humanitarian service with global health perspectives. This distinctive background in international rescue and relief operations provided exceptional preparation for patient-centered medical care and cross-cultural communication.",
      highlights: [
        "Specialized degree in International Rescue and Relief",
        "Global perspective on healthcare delivery",
        "Service-oriented educational foundation",
        "Cross-cultural communication skills",
        "Humanitarian service preparation"
      ],
      icon: "🌍"
    }
  ];

  // Clinical expertise areas
  const expertiseCategories = [
    {
      title: "Primary Cancer Sites",
      areas: [
        {
          title: "Prostate Cancer",
          description: "Comprehensive radiation therapy for all stages of prostate cancer, including brachytherapy seed implants, SBRT, and advanced treatment planning with proven clinical outcomes.",
          icon: "🎯",
          highlights: [
            "Prostate Seed Brachytherapy (LDR)",
            "Stereotactic Body Radiation Therapy (SBRT)",
            "Ultra-hypofractionated radiotherapy",
            "Post-prostatectomy radiation",
            "Oligometastatic disease treatment"
          ]
        },
        {
          title: "Lung Cancer",
          description: "Advanced treatment techniques for both small cell and non-small cell lung cancers, including stereotactic ablative radiotherapy for early-stage disease.",
          icon: "🫁",
          highlights: [
            "Stereotactic Ablative Radiotherapy (SABR)",
            "Concurrent chemoradiation protocols",
            "Motion management techniques",
            "Central and peripheral lung lesions"
          ]
        },
        {
          title: "Gynecologic Cancers",
          description: "Advanced treatment of cervical, endometrial, and other gynecologic malignancies with specialized HDR brachytherapy expertise and comprehensive care coordination.",
          icon: "🌸",
          highlights: [
            "HDR Gynecologic Brachytherapy specialist",
            "IMRT for complex pelvic anatomy",
            "Combined modality treatments",
            "Multidisciplinary care coordination",
            "Fertility-sparing approaches when appropriate"
          ]
        },
        {
          title: "Gastrointestinal Cancers",
          description: "Treatment of colorectal, pancreatic, and hepatobiliary cancers with advanced radiation techniques and multidisciplinary coordination.",
          icon: "🔬",
          highlights: [
            "Rectal cancer short-course radiotherapy",
            "Pancreatic SBRT techniques",
            "Hepatic metastases treatment",
            "Neoadjuvant and adjuvant protocols"
          ]
        }
      ]
    },
    {
      title: "Technical Expertise",
      areas: [
        {
          title: "Stereotactic Techniques",
          description: "Advanced training and clinical expertise in stereotactic radiosurgery (SRS) and stereotactic body radiation therapy (SBRT) for precise, high-dose treatments.",
          icon: "⚡",
          highlights: [
            "Cranial and spinal SRS",
            "Lung and liver SBRT",
            "Oligometastatic disease protocols",
            "Motion management and gating"
          ]
        },
        {
          title: "Treatment Planning",
          description: "Expertise in advanced treatment planning techniques including IMRT, VMAT, and specialized planning for complex anatomic sites.",
          icon: "📊",
          highlights: [
            "IMRT/VMAT optimization",
            "Plan evaluation and quality assurance",
            "Organ-at-risk constraint management",
            "Adaptive radiation therapy protocols"
          ]
        },
        {
          title: "Brachytherapy",
          description: "Specialized expertise in both high-dose-rate gynecologic brachytherapy and low-dose-rate prostate seed implants, with comprehensive training and clinical experience.",
          icon: "🎚️",
          highlights: [
            "HDR Gynecologic Brachytherapy",
            "Prostate Seed Implants (LDR)",
            "Advanced treatment planning and optimization",
            "Quality assurance protocols",
            "Patient safety and monitoring"
          ]
        }
      ]
    }
  ];

  // Research and publications
  const researchHighlights = [
    "Phase I/II Clinical Trial leadership in Proton SBRT for liver metastases",
    "Groundbreaking translational research in liver metastases treatment",
    "Published outcomes research with 5-year follow-up data",
    "National conference presentations and peer-reviewed publications"
  ];

  const publications = [
    {
      title: "Interim Results of a Phase I/II Trial of Proton Stereotactic Body Radiation Therapy (SBRT) for Liver Metastases",
      journal: "International Journal of Radiation Oncology Biology Physics",
      year: "2019",
      authors: "Sufficool, Daniel & Kang, Joseph, et al.",
      type: "publication" as const,
      pmid: "doi: 10.1016/S0360-3016(19)30409-2"
    },
    {
      title: "A Phase I Trial of Proton Stereotactic Body Radiation Therapy for Liver Metastases",
      journal: "Journal of Gastrointestinal Oncology",
      year: "2019",
      authors: "Kang JI, Sufficool DC, Hsueh CT, et al.",
      type: "publication" as const,
      pmid: "DOI: 10.21037/jgo.2018.08.17"
    },
    {
      title: "Proton stereotactic body radiation therapy for liver metastases—results of 5-year experience for 81 hepatic lesions",
      journal: "Journal of Gastrointestinal Oncology",
      year: "2021",
      authors: "Coffman, Alex & Sufficool, Daniel et al.",
      type: "publication" as const,
      pmid: "10.21037/jgo-20-424"
    },
    {
      title: "Real world outcomes of combination and timing of immunotherapy with radiotherapy for melanoma with brain metastases",
      journal: "Cancer Medicine",
      year: "2021",
      authors: "Moyers, Justin & Chong, Esther & Peng, Jiahao & Tsai, Hsin & Sufficool, Daniel et al.",
      type: "publication" as const,
      pmid: "10.1002/cam4.3716"
    },
    {
      title: "American Radium Society: Young Oncologist Award",
      journal: "American Radium Society",
      year: "2019",
      type: "award" as const
    },
    {
      title: "American Brachytherapy Society: Prostate Workshop",
      journal: "American Brachytherapy Society",
      year: "2019",
      type: "award" as const
    }
  ];

  return (
    <BaseLayout seoProps={seoProps}>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab="professional" className="mb-8" />

      {/* Credentials Hero Section */}
      <CredentialsHero />

      {/* Education and Career Timeline */}
      <Timeline 
        title="Education & Career Path"
        items={timelineItems}
      />

      {/* Clinical Expertise */}
      <ExpertiseSection 
        title="Clinical Expertise"
        description="Specialized knowledge and experience across multiple cancer sites with advanced radiation therapy techniques"
        categories={expertiseCategories}
      />

      {/* Research and Publications */}
      <PublicationsList 
        title="Research & Publications"
        publications={publications}
        highlights={researchHighlights}
      />

      {/* Professional Philosophy */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Philosophy</h2>
          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="text-lg leading-relaxed">
              <strong>"Dedicated to exemplary patient care."</strong> My approach centers on building trust through clear, 
              effective communication with patients, referring offices, collaborating doctors, and the entire medical team. 
              As a self-motivated lifelong learner with diverse interests spanning medicine, psychology, ethics, and business, 
              I bring a comprehensive perspective to cancer care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🤝 Communication-First Approach</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Strong focus on clear, effective communication and trust building with patients, referring offices, 
                collaborating doctors, medical team and the general community. Every interaction is an opportunity 
                to provide comfort, clarity, and confidence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Clinical Excellence</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Demonstrated through leadership roles including Chief Resident, pioneering new programs like 
                Alabama's Barrigel Program, and achieving 4.8/5-star patient satisfaction ratings through 
                commitment to exceptional, evidence-based care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📚 Lifelong Learning</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Self-motivated continuous learner with expertise spanning advanced radiation techniques, 
                data analytics, psychology, and business. This diverse knowledge base enhances patient care 
                through innovative, holistic treatment approaches.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🌟 Leadership & Innovation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Proven track record of program development, from ground-up SBRT programs to leading chart rounds 
                across 12 sites. Recognition includes the American Radium Society Young Oncologist Award and 
                specialized training in cutting-edge techniques.
              </p>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default ProfessionalPage;

export const Head: HeadFC = () => (
  <>
    <title>Professional Background - Dr. Daniel Sufficool | Radiation Oncologist</title>
    <meta name="description" content="Professional background, education, and expertise of Dr. Daniel Sufficool, Board-Certified Radiation Oncologist at Aultman Hospital." />
  </>
);