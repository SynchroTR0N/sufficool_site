import * as React from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import Layout from '@/components/Layout';

interface DefaultTemplateData {
  mdx: {
    frontmatter: {
      title: string;
      description?: string;
      category?: string;
      cancerType?: string;
      lastUpdated?: string;
    };
  };
}

interface DefaultTemplateProps extends PageProps<DefaultTemplateData> {
  children: React.ReactNode;
}

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({ data, location, children }) => {
  const { frontmatter } = data.mdx;

  // Generate breadcrumbs from URL path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    if (pathSegments.length > 0) {
      // Add cancer type if it exists
      if (frontmatter.cancerType) {
        breadcrumbs.push({
          label: `${frontmatter.cancerType.charAt(0).toUpperCase() + frontmatter.cancerType.slice(1)} Cancer`,
          path: `/${frontmatter.cancerType}/`
        });
      }
      
      // Add current page (no path since it's the current page)
      breadcrumbs.push({
        label: frontmatter.title,
      });
    }
    
    return breadcrumbs;
  };

  // Prepare SEO props
  const seoProps = {
    title: frontmatter.title,
    description: frontmatter.description,
    url: location.pathname,
    type: 'article' as const,
    datePublished: frontmatter.lastUpdated,
    dateModified: frontmatter.lastUpdated,
    cancerType: frontmatter.cancerType,
    category: frontmatter.category,
    isMedicalContent: true,
    keywords: [
      'cancer treatment',
      'oncology',
      'evidence-based medicine',
      ...(frontmatter.cancerType ? [`${frontmatter.cancerType} cancer`] : []),
      ...(frontmatter.category === 'treatment' ? ['treatment options', 'therapy'] : []),
    ],
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Layout breadcrumbs={breadcrumbs} seoProps={seoProps}>
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          {frontmatter.category && (
            <div className="text-sm text-medical-secondary mb-2 uppercase tracking-wide">
              {frontmatter.category}
              {frontmatter.cancerType && ` • ${frontmatter.cancerType} cancer`}
            </div>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {frontmatter.description}
            </p>
          )}
          {frontmatter.lastUpdated && (
            <div className="text-sm text-gray-500 mt-4">
              Last updated: {new Date(frontmatter.lastUpdated).toLocaleDateString()}
            </div>
          )}
        </header>
        
        <div className="prose prose-lg prose-medical max-w-none">
          {children}
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        category
        cancerType
        lastUpdated
      }
    }
  }
`;

// Head component is no longer needed since SEO is handled by the SEO component in Layout

export default DefaultTemplate;