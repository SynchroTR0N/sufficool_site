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
    description: `Evidence-based cancer treatment information with interactive tools`,
    author: `Dr. Daniel Sufficool`,
    siteUrl: `https://drsufficool.com`
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
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
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              quality: 90,
            },
          },
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
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
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
  ]
};

export default config;