import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useStaticQuery, graphql } from 'gatsby';

interface SEOProps {
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
  children?: React.ReactNode;
}

interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: string;
      siteUrl: string;
      social: {
        twitter: string;
      };
    };
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  author,
  datePublished,
  dateModified,
  cancerType,
  category,
  medicalSpecialty = 'Oncology',
  isMedicalContent = false,
  children,
}) => {
  const data: SiteMetadata = useStaticQuery(graphql`
    query SEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          social {
            twitter
          }
        }
      }
    }
  `);

  const {
    title: defaultTitle,
    description: defaultDescription,
    author: defaultAuthor,
    siteUrl,
    social,
  } = data.site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    author: author || defaultAuthor,
    url: url ? `${siteUrl}${url}` : siteUrl,
    image: image ? `${siteUrl}${image}` : `${siteUrl}/images/default-og-image.jpg`,
  };

  // Generate comprehensive keywords for medical content
  const generateMedicalKeywords = (): string[] => {
    const baseKeywords = keywords || [];
    const medicalKeywords = [
      'cancer treatment',
      'oncology',
      'evidence-based medicine',
      'clinical guidelines',
      'patient education',
    ];

    if (cancerType) {
      medicalKeywords.push(
        `${cancerType} cancer`,
        `${cancerType} cancer treatment`,
        `${cancerType} oncology`,
        `${cancerType} cancer therapy`
      );
    }

    if (category === 'treatment') {
      medicalKeywords.push('cancer therapy', 'treatment options', 'medical treatment');
    }

    return [...baseKeywords, ...medicalKeywords];
  };

  // Generate JSON-LD structured data for medical content
  const generateMedicalSchema = () => {
    const baseSchema = {
      '@context': 'https://schema.org',
      '@type': isMedicalContent ? 'MedicalWebPage' : 'WebPage',
      name: seo.title,
      description: seo.description,
      url: seo.url,
      image: seo.image,
      datePublished: datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: seo.author,
        jobTitle: 'Medical Oncologist',
        affiliation: {
          '@type': 'Organization',
          name: 'Sufficool Medical Education',
        },
      },
      publisher: {
        '@type': 'Organization',
        name: 'Sufficool Medical Education',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.jpg`,
        },
      },
    };

    if (isMedicalContent) {
      return {
        ...baseSchema,
        '@type': 'MedicalWebPage',
        medicalAudience: [
          {
            '@type': 'MedicalAudience',
            audienceType: 'Patient',
          },
          {
            '@type': 'MedicalAudience',
            audienceType: 'MedicalProfessional',
          },
        ],
        specialty: {
          '@type': 'MedicalSpecialty',
          name: medicalSpecialty,
        },
        about: cancerType ? {
          '@type': 'MedicalCondition',
          name: `${cancerType} Cancer`,
          alternateName: [`${cancerType} cancer`, `${cancerType} malignancy`],
          associatedAnatomy: {
            '@type': 'AnatomicalStructure',
            name: cancerType,
          },
        } : undefined,
        mainEntity: cancerType ? {
          '@type': 'MedicalCondition',
          name: `${cancerType} Cancer Treatment`,
          description: seo.description,
          code: {
            '@type': 'MedicalCode',
            codeValue: 'ICD-10-CM',
            codingSystem: 'ICD-10-CM',
          },
        } : undefined,
        significantLink: [
          'https://www.nccn.org',
          'https://www.asco.org',
          'https://www.cancer.gov',
        ],
        lastReviewed: dateModified || datePublished,
        reviewedBy: {
          '@type': 'Person',
          name: 'Dr. Daniel Sufficool',
          jobTitle: 'Medical Oncologist',
          worksFor: {
            '@type': 'Organization',
            name: 'Sufficool Medical Education',
          },
        },
      };
    }

    return baseSchema;
  };

  const finalKeywords = isMedicalContent ? generateMedicalKeywords() : keywords;
  const jsonLdSchema = generateMedicalSchema();

  return (
    <Helmet
      title={seo.title}
      titleTemplate={title ? `%s | ${defaultTitle}` : undefined}
      htmlAttributes={{
        lang: 'en',
      }}
    >
      {/* Basic Meta Tags */}
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />
      {finalKeywords.length > 0 && (
        <meta name="keywords" content={finalKeywords.join(', ')} />
      )}

      {/* Medical Content Specific Meta Tags */}
      {isMedicalContent && (
        <>
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
          <meta name="medical-disclaimer" content="This content is for educational purposes only and does not constitute medical advice. Consult your healthcare provider for personalized medical guidance." />
          <meta name="content-type" content="medical education" />
          {cancerType && <meta name="medical-condition" content={`${cancerType} cancer`} />}
          <meta name="evidence-level" content="Level 1A - Systematic Review/Meta-Analysis" />
          <meta name="last-medical-review" content={dateModified || datePublished || ''} />
          <meta name="medical-specialty" content={medicalSpecialty} />
        </>
      )}

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={seo.author} />
          {datePublished && <meta property="article:published_time" content={datePublished} />}
          {dateModified && <meta property="article:modified_time" content={dateModified} />}
          {cancerType && <meta property="article:section" content={`${cancerType} Cancer`} />}
          {finalKeywords.map((keyword, index) => (
            <meta key={index} property="article:tag" content={keyword} />
          ))}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={social.twitter} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />

      {/* Medical Content Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdSchema, null, 2)}
      </script>

      {/* Additional Schema for Medical Organization */}
      {isMedicalContent && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalOrganization',
            name: 'Sufficool Medical Education',
            url: siteUrl,
            logo: `${siteUrl}/images/logo.jpg`,
            foundingDate: '2024',
            founder: {
              '@type': 'Person',
              name: 'Dr. Daniel Sufficool',
              jobTitle: 'Medical Oncologist',
            },
            medicalSpecialty: [
              {
                '@type': 'MedicalSpecialty',
                name: 'Medical Oncology',
              },
              {
                '@type': 'MedicalSpecialty',
                name: 'Hematology',
              },
            ],
            areaServed: {
              '@type': 'Country',
              name: 'United States',
            },
            knowsAbout: [
              'Cancer Treatment',
              'Oncology',
              'Evidence-Based Medicine',
              'Patient Education',
              'Clinical Guidelines',
            ],
          }, null, 2)}
        </script>
      )}

      {/* Additional custom elements */}
      {children}
    </Helmet>
  );
};

export default SEO;