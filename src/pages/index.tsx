
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "@/components/Layout";

const IndexPage: React.FC<PageProps> = ({ location }) => {
  const seoProps = {
    title: "Evidence-Based Cancer Treatment Education",
    description: "Comprehensive, evidence-based cancer treatment information with interactive tools and patient resources by Dr. Daniel Sufficool, Medical Oncologist.",
    url: location.pathname,
    type: 'website' as const,
    isMedicalContent: true,
    keywords: [
      'cancer treatment',
      'medical oncology',
      'evidence-based medicine',
      'patient education',
      'cancer care',
      'oncology resources',
    ],
  };

  return (
    <Layout seoProps={seoProps}>
      <h1 className="text-3xl font-bold">Welcome to the Medical Education Platform</h1>
      <p className="mt-4">This is the homepage. Content will be added soon.</p>
    </Layout>
  )
}

export default IndexPage

// Head component is no longer needed since SEO is handled by the SEO component in Layout

