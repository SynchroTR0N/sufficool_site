import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import Layout from "@/components/Layout";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Page Not Found</h1>
      <p className="mt-4">
        Sorry 😔, we couldn’t find what you were looking for.
      </p>
      <Link to="/" className="mt-4 text-medical-primary hover:underline">Go home</Link>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
