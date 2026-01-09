import { useRouter } from 'next/router'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import Main from '@/components/main_templates/main'
import CTA from '@/components/content_widgets/cta/cta'
import HeroWithTile from '@/components/dynamic_content_widgets/hero-with-tile/hero-with-tile'
import ContactModal, { showModal } from '@/components/content_widgets/contact-modal/contact-modal'

import blogPostsData from '@/variables/blog-posts.json'
const blogPosts = blogPostsData.posts

import styles from './[slug].module.scss'

export async function getStaticPaths() {
  const paths = blogPosts
    .filter(post => post.published)
    .map(post => ({
      params: { slug: post.slug }
    }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post || !post.published) {
    return { notFound: true }
  }

  // Load content from HTML file
  const contentPath = path.join(process.cwd(), 'variables', 'blog-posts', `${params.slug}.html`)
  let content = ''
  
  try {
    content = fs.readFileSync(contentPath, 'utf8')
  } catch (error) {
    console.error(`Could not load content for ${params.slug}:`, error)
  }

  return { props: { post: { ...post, content } } }
}

export default function BlogPost({ post, siteVariables, session }) {
  const siteUrl = 'https://trevorgibby.dev'
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const imageUrl = post.image ? `${siteUrl}${post.image}` : null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // JSON-LD Schema for BlogPosting
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Trevor Gibby',
      url: siteUrl
    },
    publisher: {
      '@type': 'Person',
      name: 'Trevor Gibby',
      url: siteUrl
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    },
    keywords: post.tags ? post.tags.join(', ') : undefined
  }

  return (
    <Main
      meta_title={`${post.title} - Trevor Gibby`}
      meta_description={post.excerpt}
      meta_image={imageUrl}
      meta_url={postUrl}
      meta_type="article"
      article={{
        publishedTime: post.date,
        author: post.author || 'Trevor Gibby',
        tags: post.tags
      }}
      schema={schema}
    >
      {/* Hero */}
      <HeroWithTile
        bgColor="primary"
        tileColor="rgba(255, 255, 255, 0.7)"
        tileTextColor="primary"
        image={post.image}
        imageAlt={post.title}
      >
        <Link href="/blog" className="text-primary mb-3 d-inline-block">
          ← Back to Blog
        </Link>
        <h1 className="h1 mb-3">{post.title}</h1>
        <div className={styles.meta}>
          <span>{formatDate(post.date)}</span>
          {post.author && <span>by {post.author}</span>}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </HeroWithTile>

      {/* Post Content */}
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <article 
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Sources */}
              {post.sources && post.sources.length > 0 && (
                <div className={styles.sources}>
                  <h3>Sources</h3>
                  <ol>
                    {post.sources.map((source, index) => (
                      <li key={index}>
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            {source.title}
                          </a>
                        ) : (
                          <span>{source.title}</span>
                        )}
                        {source.author && <span className={styles.source_author}> — {source.author}</span>}
                        {source.date && <span className={styles.source_date}> ({source.date})</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <CTA
                color="primary"
                textColor="tertiary"
                title="Enjoyed this post?"
                subtitle="Let's connect!"
                button1={{ text: 'Contact Me', color: 'outline-tertiary', onClick: showModal }}
                logoColor="tertiary"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactModal messageSent={session?.messageSent} />
    </Main>
  )
}
