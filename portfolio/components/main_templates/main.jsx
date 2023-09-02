

import Head from 'next/head'
import Layout from '../global_templates/layout'

import Header from './headers/header'
import Footer from './footers/footer'

export default function Main({children, meta_title, meta_description}) {

  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Trevor Gibby" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <Layout>
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </Layout>
    </>
  )
}