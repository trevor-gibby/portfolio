

import Head from 'next/head'
import Layout from '../global_templates/layout'

import Header from './headers/header'
import Footer from './footers/footer'

export default function Main({
  children, 
  meta_title, 
  meta_description,
  meta_image,
  meta_url,
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
        
        {/* Open Graph */}
        <meta property="og:title" content={meta_title} />
        <meta property="og:description" content={meta_description} />
        <meta property="og:type" content={meta_type} />
        {meta_url && <meta property="og:url" content={meta_url} />}
        {meta_image && <meta property="og:image" content={meta_image} />}
        <meta property="og:site_name" content="Trevor Gibby" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content={meta_image ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:title" content={meta_title} />
        <meta name="twitter:description" content={meta_description} />
        {meta_image && <meta name="twitter:image" content={meta_image} />}
        
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
        <Header />

        <main>
          {children}
        </main>

        <Footer />

        {/* Jquery */}
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossOrigin="anonymous"></script>

        {/* Fancybox */}
        <script src="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.2/dist/jquery.fancybox.min.js"></script>

      </Layout>
    </>
  )
}