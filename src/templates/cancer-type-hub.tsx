import * as React from 'react';
import { graphql, HeadFC, PageProps, Link } from 'gatsby';
import BaseLayout from '@/components/layout/BaseLayout';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import Sidebar from '@/components/navigation/Sidebar';
import ArticleCard from '@/components/cards/ArticleCard';

interface CancerTypeHubData {
  mdx: {
    frontmatter: {
      title: string;
      description?: string;
      category?: string;
      cancerType?: string;
      lastUpdated?: string;
    };
  };
  allMdx: {
    nodes: Array<{
      id: string;
      frontmatter: {
        title: string;
        slug: string;
        category?: string;
        cancerType?: string;
        journeyPhase?: string;
        medicalTopic?: string;
        treatmentType?: string;
      };
    }>;
  };
}

interface CancerTypeHubProps {
  data: CancerTypeHubData;
  location: PageProps['location'];
  children?: React.ReactNode;
}

const CancerTypeHub: React.FC<CancerTypeHubProps> = ({ data, children, location }) => {
  const { frontmatter } = data.mdx;
  const cancerType = frontmatter.cancerType || 'cancer';
  
  // Filter related pages by cancer type
  const relatedPages = data.allMdx.nodes.filter(node => 
    node.frontmatter.cancerType === cancerType && 
    node.frontmatter.slug !== frontmatter.title?.toLowerCase()
  );

  // Organize pages by category
  const journeyPages = relatedPages.filter(page => page.frontmatter.journeyPhase);
  const treatmentPages = relatedPages.filter(page => page.frontmatter.treatmentType);
  const stagingPages = relatedPages.filter(page => page.frontmatter.medicalTopic === 'staging');
  const otherPages = relatedPages.filter(page => 
    !page.frontmatter.journeyPhase && 
    !page.frontmatter.treatmentType && 
    page.frontmatter.medicalTopic !== 'staging'
  );

  // Create sidebar links
  const sidebarLinks = [
    ...journeyPages.map(page => ({
      title: page.frontmatter.title,
      href: `/${page.frontmatter.slug}/`,
      active: false
    })),
    ...stagingPages.map(page => ({
      title: page.frontmatter.title,
      href: `/${page.frontmatter.slug}/`,
      active: false
    })),
    ...treatmentPages.map(page => ({
      title: page.frontmatter.title,
      href: `/${page.frontmatter.slug}/`,
      active: false
    })),
    ...otherPages.map(page => ({
      title: page.frontmatter.title,
      href: `/${page.frontmatter.slug}/`,
      active: false
    }))
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: frontmatter.title }
  ];

  const seoProps = {
    title: frontmatter.title,
    description: frontmatter.description,
    url: location.pathname,
    type: 'website' as const,
    isMedicalContent: true,
    cancerType: frontmatter.cancerType,
    category: frontmatter.category
  };

  // Sample articles for now - in real implementation, these would come from GraphQL
  const articles = [
    {
      number: "01",
      title: `Understanding ${frontmatter.title}`,
      description: `Learn about the basics, how it develops, and key terminology for ${frontmatter.title.toLowerCase()}.`,
      readTime: "15 min",
      href: `/${cancerType}/understanding-${cancerType}/`
    },
    {
      number: "02", 
      title: "Diagnosis and Staging",
      description: "Understanding the diagnostic process, staging systems, and what the results mean.",
      readTime: "20 min",
      href: `/${cancerType}/diagnosis-staging/`
    },
    {
      number: "03",
      title: "Treatment Options Overview",
      description: "Comprehensive overview of available treatment options and how they work.",
      readTime: "25 min", 
      href: `/${cancerType}/treatment-options/`
    },
    {
      number: "04",
      title: "Managing Side Effects",
      description: "Practical strategies for managing common treatment side effects and improving quality of life.",
      readTime: "18 min",
      href: `/${cancerType}/side-effects/`
    }
  ];

  return (
    <BaseLayout seoProps={seoProps}>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-3 h-8 bg-blue-600 rounded-full mr-4"></div>
          <span className="text-blue-600 font-medium uppercase tracking-wide text-sm">
            {frontmatter.category} • {frontmatter.cancerType} Cancer
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {frontmatter.title}
        </h1>
        {frontmatter.description && (
          <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
            {frontmatter.description}
          </p>
        )}
      </div>

      {/* Content Wrapper */}
      <div className="flex gap-8">
        {/* Sidebar */}
        {sidebarLinks.length > 0 && (
          <Sidebar 
            title="Articles in this Section" 
            links={sidebarLinks}
          />
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Article Grid */}
          <div className="grid gap-6 mb-12">
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>

          {/* MDX Content */}
          {children && (
            <div className="prose prose-lg max-w-none mb-12">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Last Updated */}
      {frontmatter.lastUpdated && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: {new Date(frontmatter.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      )}
    </BaseLayout>
  );
};

export const query = graphql`
  query CancerTypeHub($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        category
        cancerType
        lastUpdated
      }
    }
    allMdx {
      nodes {
        id
        frontmatter {
          title
          slug
          category
          cancerType
          journeyPhase
          medicalTopic
          treatmentType
        }
      }
    }
  }
`;

export const Head: HeadFC<CancerTypeHubData> = ({ data }) => {
  const { frontmatter } = data.mdx;
  
  return (
    <>
      <title>{frontmatter.title} | Dr. Daniel Sufficool</title>
      {frontmatter.description && (
        <meta name="description" content={frontmatter.description} />
      )}
      <meta property="og:title" content={frontmatter.title} />
      {frontmatter.description && (
        <meta property="og:description" content={frontmatter.description} />
      )}
      <meta property="og:type" content="website" />
    </>
  );
};

export default CancerTypeHub;