
import type { GatsbyNode } from "gatsby";
import path from "path";

interface MdxNode {
  id: string;
  frontmatter: {
    slug: string;
    category?: string;
    cancerType?: string;
    cancerTypeDisplay?: string;
    isHub?: boolean;
    title?: string;
  };
  internal: {
    contentFilePath: string;
  };
}

interface CreatePagesQueryResult {
  allMdx: {
    nodes: MdxNode[];
  };
}

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ 
  actions, 
  stage,
  getConfig 
}) => {
  // TEMPORARILY DISABLED - Custom webpack config was preventing bundle generation
  // Only add path alias for now, remove split chunks optimization
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // Removed optimization.splitChunks configuration that was conflicting with Gatsby's defaults
  });
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
            cancerTypeDisplay
            isHub
            title
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
  const mdxFiles = (result.data as CreatePagesQueryResult)?.allMdx?.nodes || [];
  const defaultTemplate = path.resolve(`./src/templates/default.tsx`);
  const cancerTypeHubTemplate = path.resolve(`./src/templates/cancer-type-hub.tsx`);

  mdxFiles.forEach((node: MdxNode) => {
    const { slug, category, cancerType, isHub } = node.frontmatter;
    const { contentFilePath } = node.internal;

    if (!slug) {
      reporter.warn(`MDX file at ${contentFilePath} is missing a slug in frontmatter`);
      return;
    }

    // Create the page path
    const pagePath = `/${slug}/`;

    // Determine which template to use
    const isCancerTypeHub = category === 'cancer-type' && isHub === true;
    const template = isCancerTypeHub ? cancerTypeHubTemplate : defaultTemplate;

    createPage({
      path: pagePath,
      component: `${template}?__contentFilePath=${contentFilePath}`,
      context: {
        id: node.id,
        slug: slug,
        cancerType: cancerType || null,
        isHub: isHub || false,
      },
    });

    reporter.info(`Created page: ${pagePath} using ${isCancerTypeHub ? 'cancer-type-hub' : 'default'} template`);
  });
};
