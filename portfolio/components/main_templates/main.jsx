

import Head from 'next/head'
import Layout from '../global_templates/layout'

import Header from './headers/header'
import Footer from './footers/footer'
import { defaultOpenGraphImage, metadataBase } from '@/variables/seo'

export default function Main({
  children, 
  meta_title, 
  meta_description,
  meta_image = defaultOpenGraphImage,
  meta_url = metadataBase,
  meta_type = 'website',
  article,
  schema
}) {

  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Trevor Gibby" />
        <meta name="theme-color" content="#090A11" />
        {meta_url && <link rel="canonical" href={meta_url} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={meta_title} />
        <meta property="og:description" content={meta_description} />
        <meta property="og:type" content={meta_type} />
        {meta_url && <meta property="og:url" content={meta_url} />}
        {meta_image && <meta property="og:image" content={meta_image} />}
        {meta_image && <meta property="og:image:width" content="1200" />}
        {meta_image && <meta property="og:image:height" content="630" />}
        {meta_image && <meta property="og:image:alt" content="Trevor Gibby, Senior Full-Stack Engineer and Technical Lead" />}
        <meta property="og:site_name" content="Trevor Gibby" />
        <meta property="og:locale" content="en_US" />
        
        {/* Article specific meta */}
        {article && (
          <>
            <meta property="article:published_time" content={article.publishedTime} />
            {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
            {article.author && <meta property="article:author" content={article.author} />}
            {article.tags && article.tags.map((tag, i) => (
              <meta key={i} property="article:tag" content={tag} />
            ))}
          </>
        )}
        
        {/* JSON-LD Schema */}
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>

      <Layout>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />

        <main id="main-content">
          {children}
        </main>

        <Footer />

      </Layout>
    </>
  )
}
