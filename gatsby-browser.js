import './src/styles/global.css'
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

// Medical content protection and security
export const onClientEntry = () => {
  // Prevent right-click on sensitive medical content
  if (typeof window !== 'undefined') {
    // Add medical disclaimer notice
    console.info(
      '%cMedical Education Platform\n%cThis platform provides educational information only.\nNot intended as medical advice.\nConsult healthcare providers for medical decisions.',
      'font-weight: bold; color: #0066cc; font-size: 16px;',
      'color: #333; font-size: 12px;'
    );
    
    // Security monitoring for medical content
    window.addEventListener('beforeunload', () => {
      // Clear any sensitive data from memory
      if (window.sessionStorage) {
        // Don't clear educational content, but ensure no PHI is stored
        const keysToCheck = Object.keys(sessionStorage);
        keysToCheck.forEach(key => {
          if (key.includes('patient') || key.includes('medical-record')) {
            sessionStorage.removeItem(key);
          }
        });
      }
    });
  }
}

// Enhance page rendering for medical content
export const wrapPageElement = ({ element, props }) => {
  // Add medical content context
  return React.cloneElement(element, {
    ...props,
    medicalContext: {
      isEducational: true,
      requiresDisclaimer: true,
      specialty: 'Radiation Oncology'
    }
  });
}
