import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import MedicalMDXProvider from './src/components/MDXProvider'

export const wrapRootElement = ({ element }) => {
  return (
    <HelmetProvider>
      <MedicalMDXProvider>
        {element}
      </MedicalMDXProvider>
    </HelmetProvider>
  )
}

// Optimize critical resource hints for medical education platform
export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  // Preload critical medical fonts
  setHeadComponents([
    <link
      key="preload-font-inter"
      rel="preload"
      href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZs.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />,
    // Preconnect to essential medical resources
    <link key="preconnect-fonts" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="preconnect-fonts-static" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    // Resource hints for medical platform optimization
    <link key="dns-prefetch-fonts" rel="dns-prefetch" href="https://fonts.googleapis.com" />,
    <link key="dns-prefetch-images" rel="dns-prefetch" href="https://images.unsplash.com" />,
  ])

  // Add structured data for medical content
  setHeadComponents([
    <script
      key="medical-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Dr. Daniel Sufficool - Cancer Treatment Education",
          "description": "Evidence-based cancer treatment information with interactive tools",
          "about": {
            "@type": "MedicalCondition",
            "name": "Cancer Treatment Education"
          },
          "author": {
            "@type": "Person",
            "name": "Dr. Daniel Sufficool",
            "jobTitle": "Radiation Oncologist"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Dr. Sufficool Medical Education Platform"
          },
          "medicalAudience": [
            {
              "@type": "MedicalAudience",
              "audienceType": "Patient"
            },
            {
              "@type": "MedicalAudience", 
              "audienceType": "Caregiver"
            }
          ],
          "disclaimer": "This information is for educational purposes only and should not replace professional medical advice."
        })
      }}
    />
  ])
}

// Critical CSS injection for medical content
export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  
  // Move CSS to top for faster medical content rendering
  const cssLinks = headComponents.filter(component => 
    component.type === 'link' && component.props.rel === 'stylesheet'
  )
  
  const otherComponents = headComponents.filter(component => 
    !(component.type === 'link' && component.props.rel === 'stylesheet')
  )
  
  replaceHeadComponents([...cssLinks, ...otherComponents])
}

// Note: onClientEntry is not available in SSR context
// Performance monitoring moved to gatsby-browser.js