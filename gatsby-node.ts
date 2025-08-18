
import type { GatsbyNode } from "gatsby";
import path from "path";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, stage, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Medical components bundle
          medical: {
            test: /[\\/]src[\\/]components[\\/]medical[\\/]/,
            name: 'medical-components',
            chunks: 'all',
            priority: 20,
            minSize: 20000,
          },
          // Three.js and D3 visualization libraries
          visualization: {
            test: /[\\/]node_modules[\\/](three|d3|@react-three)/,
            name: 'visualization-libs',
            chunks: 'all',
            priority: 15,
            minSize: 50000,
          },
          // React and core dependencies
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|gatsby)/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
            minSize: 30000,
          },
          // Common utilities and smaller libraries
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'commons',
            chunks: 'all',
            priority: 5,
            minSize: 20000,
            maxSize: 250000,
          },
        },
      },
    },
  });

  // Production-specific optimizations
  if (stage === 'build-javascript') {
    const config = getConfig();
    
    // Optimize bundle sizes for production
    actions.setWebpackConfig({
      optimization: {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
        minimize: true,
      },
      performance: {
        hints: 'warning',
        maxEntrypointSize: 500000, // 500KB
        maxAssetSize: 300000, // 300KB
      },
    });
  }
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Query for all MDX files
  const result = await graphql(`
    query CreatePagesQuery {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            category
            cancerType
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX files", result.errors);
    return;
  }

  // Create pages for each MDX file
  const mdxFiles = result.data?.allMdx?.nodes || [];
  const defaultTemplate = path.resolve(`./src/templates/default.tsx`);
  const cancerTypeHubTemplate = path.resolve(`./src/templates/cancer-type-hub.tsx`);

  mdxFiles.forEach((node: any) => {
    const { slug, category, cancerType } = node.frontmatter;
    const { contentFilePath } = node.internal;

    if (!slug) {
      reporter.warn(`MDX file at ${contentFilePath} is missing a slug in frontmatter`);
      return;
    }

    // Create the page path
    const pagePath = `/${slug}/`;

    // Determine which template to use
    const isCancerTypeIndex = category === 'cancer-type' && (slug === 'prostate' || slug === 'lung');
    const template = isCancerTypeIndex ? cancerTypeHubTemplate : defaultTemplate;

    createPage({
      path: pagePath,
      component: `${template}?__contentFilePath=${contentFilePath}`,
      context: {
        id: node.id,
        cancerType: cancerType || null,
      },
    });

    reporter.info(`Created page: ${pagePath} using ${isCancerTypeIndex ? 'cancer-type-hub' : 'default'} template`);
  });
};
