

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