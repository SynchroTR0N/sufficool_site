export interface CancerTypeNode {
  id: string;
  frontmatter: {
    slug: string;
    title: string;
    category?: string;
    cancerType?: string;
    cancerTypeDisplay?: string;
    isHub?: boolean;
    menuOrder?: number;
  };
}

export interface CancerArticle {
  id: string;
  title: string;
  slug: string;
  menuOrder?: number;
}

export interface CancerType {
  name: string;
  displayName: string;
  slug: string;
  hubPage: CancerArticle;
  articles: CancerArticle[];
  menuOrder: number;
}

export interface NavigationStructure {
  cancerTypes: CancerType[];
}

/**
 * Builds navigation structure from MDX nodes
 * Groups cancer articles by type and sorts them appropriately
 */
export function buildNavigationFromNodes(nodes: CancerTypeNode[]): NavigationStructure {
  // Filter nodes that belong to cancer information section
  const cancerNodes = nodes.filter(node => 
    node.frontmatter.slug.startsWith('cancer-information/')
  );

  // Group nodes by cancer type
  const cancerTypeGroups = new Map<string, CancerTypeNode[]>();
  
  cancerNodes.forEach(node => {
    const { cancerType } = node.frontmatter;
    if (!cancerType) return;
    
    if (!cancerTypeGroups.has(cancerType)) {
      cancerTypeGroups.set(cancerType, []);
    }
    cancerTypeGroups.get(cancerType)!.push(node);
  });

  // Build cancer type objects
  const cancerTypes: CancerType[] = [];

  cancerTypeGroups.forEach((nodes, cancerTypeName) => {
    // Find hub page
    const hubNode = nodes.find(node => node.frontmatter.isHub === true);
    if (!hubNode) {
      console.warn(`No hub page found for cancer type: ${cancerTypeName}`);
      return;
    }

    // Find article nodes
    const articleNodes = nodes.filter(node => node.frontmatter.isHub !== true);

    // Create cancer type object
    const cancerType: CancerType = {
      name: cancerTypeName,
      displayName: hubNode.frontmatter.cancerTypeDisplay || formatCancerTypeName(cancerTypeName),
      slug: hubNode.frontmatter.slug,
      hubPage: {
        id: hubNode.id,
        title: hubNode.frontmatter.title,
        slug: hubNode.frontmatter.slug,
        menuOrder: hubNode.frontmatter.menuOrder || 999
      },
      articles: articleNodes
        .map(node => ({
          id: node.id,
          title: node.frontmatter.title,
          slug: node.frontmatter.slug,
          menuOrder: node.frontmatter.menuOrder || 999
        }))
        .sort((a, b) => (a.menuOrder || 999) - (b.menuOrder || 999)),
      menuOrder: hubNode.frontmatter.menuOrder || 999
    };

    cancerTypes.push(cancerType);
  });

  // Sort cancer types by menu order
  cancerTypes.sort((a, b) => a.menuOrder - b.menuOrder);

  return {
    cancerTypes
  };
}

/**
 * Formats cancer type name for display
 * e.g., "prostate" -> "Prostate Cancer"
 */
function formatCancerTypeName(name: string): string {
  const specialCases: Record<string, string> = {
    'gi': 'GI Cancers',
    'gynecologic': 'Gynecologic Cancers'
  };

  if (specialCases[name.toLowerCase()]) {
    return specialCases[name.toLowerCase()];
  }

  // Capitalize first letter and add "Cancer"
  const formatted = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return `${formatted} Cancer`;
}

/**
 * Gets all cancer types for dropdown menu
 */
export function getCancerTypesForMenu(navigation: NavigationStructure): Array<{name: string, href: string}> {
  return navigation.cancerTypes.map(cancerType => ({
    name: cancerType.displayName,
    href: `/${cancerType.slug}/`
  }));
}

/**
 * Gets articles for a specific cancer type
 */
export function getArticlesForCancerType(navigation: NavigationStructure, cancerTypeName: string): CancerArticle[] {
  const cancerType = navigation.cancerTypes.find(ct => ct.name === cancerTypeName);
  return cancerType?.articles || [];
}

/**
 * Finds cancer type by slug
 */
export function findCancerTypeBySlug(navigation: NavigationStructure, slug: string): CancerType | null {
  return navigation.cancerTypes.find(ct => ct.slug === slug) || null;
}