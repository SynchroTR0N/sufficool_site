
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "@/components/Layout";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Welcome to the Medical Education Platform</h1>
      <p className="mt-4">This is the homepage. Content will be added soon.</p>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>

