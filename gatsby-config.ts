// gatsby-config.ts
import type { GatsbyConfig } from "gatsby";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({
  path: `.env`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Dr. Daniel Sufficool - Cancer Treatment Education`,
    description: `Evidence-based cancer treatment information with interactive tools for patient education`,
    author: `Dr. Daniel Sufficool`,
    siteUrl: `https://drsufficool.com`,
    social: {
      twitter: `@DrSufficool`
    },
    medical: {
      specialty: `Radiation Oncology`,
      disclaimer: `Educational content only - not medical advice`,
      compliance: `HIPAA-compliant platform`
    }
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
        ignore: [`**/.*`], // ignore hidden files
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "images",
        path: `${__dirname}/src/images/`
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              quality: 90,
              loading: 'lazy',
              linkImagesToOriginal: false,
              showCaptions: true,
              markdownCaptions: true,
              backgroundColor: 'transparent',
              withWebp: true,
              withAvif: true,
            },
          },
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet-async',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Dr. Sufficool Medical Education',
        short_name: 'DrSufficool',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#0066cc',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: () => 'https://drsufficool.com',
        serialize: ({ path, pageContext }: { path: string; pageContext: any }) => {
          // Prioritize medical content for SEO
          let priority = 0.5;
          let changefreq = 'monthly';
          
          if (path === '/') {
            priority = 1.0;
            changefreq = 'weekly';
          } else if (path.includes('/about/')) {
            priority = 0.8;
            changefreq = 'monthly';
          } else if (path.includes('/cancer-types/') || path.includes('/treatments/')) {
            priority = 0.9;
            changefreq = 'monthly';
          }
          
          return {
            url: path,
            changefreq,
            priority,
            lastmod: new Date().toISOString().split('T')[0],
          };
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: '*', disallow: '/admin/' },
          { userAgent: '*', disallow: '/private/' },
          { userAgent: '*', disallow: '/api/' }
        ],
        sitemap: 'https://drsufficool.com/sitemap.xml',
        host: 'https://drsufficool.com',
      },
    },
  ]
};

export default config;