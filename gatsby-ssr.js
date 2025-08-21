import React from 'react'

// Phase 1: Enhanced SSR diagnostics
export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  console.log('🏗️ SSR onRenderBody called')
  
  // Basic meta tags
  setHeadComponents([
    <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />,
    <title key="title">Test Site</title>,
    // Add hydration debugging script
    <script 
      key="hydration-debug"
      dangerouslySetInnerHTML={{
        __html: `
          console.log('🏁 SSR-injected script executing');
          window.__GATSBY_SSR_TIMESTAMP__ = new Date().toISOString();
          
          // Listen for DOMContentLoaded to check initial state
          document.addEventListener('DOMContentLoaded', function() {
            console.log('📄 DOM Content Loaded at:', new Date().toISOString());
            const gatsbyDiv = document.getElementById('___gatsby');
            if (gatsbyDiv) {
              console.log('🎯 Initial ___gatsby content:', {
                hasContent: gatsbyDiv.innerHTML.length > 0,
                contentLength: gatsbyDiv.innerHTML.length,
                preview: gatsbyDiv.innerHTML.substring(0, 100)
              });
            } else {
              console.error('❌ ___gatsby div not found in DOM!');
            }
          });
          
          // Track when React starts mounting
          const originalCreateRoot = window.React?.createRoot;
          if (originalCreateRoot) {
            window.React.createRoot = function(...args) {
              console.log('⚛️ React.createRoot called with:', args);
              return originalCreateRoot.apply(this, args);
            };
          }
        `
      }}
    />
  ])
  
  // Add post-body diagnostic script
  setPostBodyComponents([
    <script
      key="post-body-debug"
      dangerouslySetInnerHTML={{
        __html: `
          console.log('🔚 Post-body script executing');
          console.log('📈 Document ready state:', document.readyState);
          
          // Log any existing script tags
          const scripts = document.querySelectorAll('script[src]');
          console.log('📜 Found', scripts.length, 'external scripts:', 
            Array.from(scripts).map(s => s.src));
        `
      }}
    />
  ])
}

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  console.log('🏗️ SSR onPreRenderHTML called')
  
  const headComponents = getHeadComponents()
  console.log('📦 Head components count:', headComponents.length)
  
  // Log component types for debugging
  headComponents.forEach((component, index) => {
    console.log(`Head component ${index}:`, component?.type || 'unknown', component?.key || 'no-key')
  })
}