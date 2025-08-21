import React from 'react';
import { MDXProvider } from '@mdx-js/react';

// Simplified MDX Provider for debugging - no medical components
const mdxComponents = {
  // Basic HTML elements only
  h1: (props: any) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-medium mb-2" {...props} />,
  p: (props: any) => <p className="mb-4" {...props} />,
  strong: (props: any) => <strong className="font-semibold" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props: any) => <li className="mb-1" {...props} />,
};

interface MedicalMDXProviderProps {
  children: React.ReactNode;
}

const MedicalMDXProvider: React.FC<MedicalMDXProviderProps> = ({ children }) => {
  return (
    <MDXProvider components={mdxComponents}>
      {children}
    </MDXProvider>
  );
};

export default MedicalMDXProvider;
export { mdxComponents };