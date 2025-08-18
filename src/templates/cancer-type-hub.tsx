import * as React from 'react';
import { graphql, HeadFC, PageProps, Link } from 'gatsby';
import Layout from '@/components/Layout';

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

interface CancerTypeHubProps extends PageProps<CancerTypeHubData> {
  children: React.ReactNode;
}

const CancerTypeHub: React.FC<CancerTypeHubProps> = ({ data, children }) => {
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

  const breadcrumbs = [
    { label: 'Cancer Types', path: undefined },
    { label: frontmatter.title, path: undefined }
  ];

  return (
    <Layout breadcrumbs={breadcrumbs}>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 mb-8">
            <div className="max-w-4xl">
              <div className="flex items-center mb-4">
                <div className="w-3 h-8 bg-blue-600 rounded-full mr-4"></div>
                <span className="text-blue-600 font-medium uppercase tracking-wide text-sm">
                  {frontmatter.category} • {frontmatter.cancerType} cancer
                </span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {frontmatter.title}
              </h1>
              {frontmatter.description && (
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  {frontmatter.description}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <Link 
                  to={`/${cancerType}/staging/`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Understanding Your Diagnosis
                </Link>
                <Link 
                  to={`/${cancerType}/journey/diagnosis/`}
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition font-medium"
                >
                  Start Your Journey
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg prose-medical max-w-none">
              {children}
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Navigate Your Journey</h2>
              
              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link 
                    to={`/${cancerType}/decision-guide/`}
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition"
                  >
                    <div className="font-medium text-gray-900">Decision Guide</div>
                    <div className="text-sm text-gray-600">Interactive treatment comparison</div>
                  </Link>
                  <Link 
                    to={`/${cancerType}/calculators/`}
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition"
                  >
                    <div className="font-medium text-gray-900">Risk Calculators</div>
                    <div className="text-sm text-gray-600">Personalized risk assessment</div>
                  </Link>
                  <Link 
                    to={`/${cancerType}/questions-generator/`}
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition"
                  >
                    <div className="font-medium text-gray-900">Questions for Doctor</div>
                    <div className="text-sm text-gray-600">Prepare for appointments</div>
                  </Link>
                </div>
              </div>

              {/* Journey Phases */}
              {journeyPages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Journey</h3>
                  <div className="space-y-2">
                    {journeyPages.map(page => (
                      <Link 
                        key={page.id}
                        to={`/${page.frontmatter.slug}/`}
                        className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        {page.frontmatter.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Understanding Your Cancer */}
              {stagingPages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Understanding Your Cancer</h3>
                  <div className="space-y-2">
                    {stagingPages.map(page => (
                      <Link 
                        key={page.id}
                        to={`/${page.frontmatter.slug}/`}
                        className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        {page.frontmatter.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Treatment Options */}
              {treatmentPages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Options</h3>
                  <div className="space-y-2">
                    {treatmentPages.map(page => (
                      <Link 
                        key={page.id}
                        to={`/${page.frontmatter.slug}/`}
                        className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        {page.frontmatter.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Resources */}
              {otherPages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
                  <div className="space-y-2">
                    {otherPages.map(page => (
                      <Link 
                        key={page.id}
                        to={`/${page.frontmatter.slug}/`}
                        className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        {page.frontmatter.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Support Resources */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Resources</h3>
                <div className="space-y-2">
                  <Link 
                    to="/shared/universal-concerns/managing-anxiety/"
                    className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    Managing Anxiety
                  </Link>
                  <Link 
                    to="/shared/understanding-cancer/how-cancer-develops/"
                    className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    How Cancer Develops
                  </Link>
                  <Link 
                    to="/about/using-this-site/"
                    className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    How to Use This Site
                  </Link>
                </div>
              </div>
            </div>
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
      </div>
    </Layout>
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