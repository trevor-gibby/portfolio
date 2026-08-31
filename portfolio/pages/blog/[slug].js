import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import Link from 'next/link'
import { track } from '@vercel/analytics/react'

import Main from '@/components/main_templates/main'
import ContactModal, { showModal } from '@/components/content_widgets/contact-modal/contact-modal'
import authorsData from '@/variables/authors.json'
import blogPostsData from '@/variables/blog-posts.json'
import { metadataBase } from '@/variables/seo'
import styles from './[slug].module.scss'

const blogPosts = blogPostsData.posts

export async function getStaticPaths() {
  const paths = blogPosts
    .filter((post) => post.published)
    .map((post) => ({ params: { slug: post.slug } }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug)
  if (!post || !post.published) return { notFound: true }

  const contentPath = path.join(process.cwd(), 'variables', 'blog-posts', `${params.slug}.html`)
  let content = ''

  try {
    content = fs.readFileSync(contentPath, 'utf8')
  } catch (error) {
    console.error(`Could not load content for ${params.slug}:`, error)
  }

  return { props: { post: { ...post, content } } }
}

export default function BlogPost({ post, session }) {
  const siteUrl = metadataBase
  const postUrl = `${siteUrl}/blog/${post.slug}`
  const imageUrl = post.image ? `${siteUrl}${post.image}` : null
  const authorName = post.author || 'Trevor Gibby'
  const author = authorsData.authors.find((item) => item.name === authorName) || {
    id: authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: authorName
  }
  const authorUrl = author.url ? `${siteUrl}${author.url}` : siteUrl
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })

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
      name: authorName,
      url: authorUrl,
      ...(author.image ? { image: `${siteUrl}${author.image}` } : {})
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
    keywords: post.tags?.join(', ')
  }

  return (
    <Main
      meta_title={`${post.title} — Trevor Gibby`}
      meta_description={post.excerpt}
      meta_image={imageUrl}
      meta_url={postUrl}
      meta_type="article"
      article={{ publishedTime: post.date, author: authorName, tags: post.tags }}
      schema={schema}
    >
      <header className={styles.hero}>
        <div className="container">
          <Link href="/blog" className={styles.back}>← All writing</Link>
          <div className={styles.meta}>
            <span>{formattedDate}</span>
            <span>{authorName}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          {post.tags?.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}
        </div>
      </header>

      {post.image && (
        <div className={`container ${styles.featuredImage}`}>
          <img src={post.image} alt={post.title} />
        </div>
      )}

      <section className={styles.articleSection}>
        <div className="container">
          <div className={styles.articleGrid}>
            <div className={styles.articleColumn}>
              <article className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />

              <section className={styles.authorCard} aria-labelledby={`about-${author.id}`}>
                {author.image && (
                  <div className={styles.authorPhoto}>
                    <Image
                      src={author.image}
                      alt={author.imageAlt || author.name}
                      width={152}
                      height={152}
                      sizes="152px"
                    />
                  </div>
                )}
                <div className={styles.authorCopy}>
                  <p className={styles.authorLabel}>About the author</p>
                  <h2 id={`about-${author.id}`}>{author.name}</h2>
                  {author.role && <p className={styles.authorRole}>{author.role}</p>}
                  {author.bio && <p className={styles.authorBio}>{author.bio}</p>}
                  {author.url && (
                    <Link href={author.url} className={styles.authorLink}>
                      More about {author.name.split(' ')[0]} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </section>

              {post.sources?.length > 0 && (
                <div className={styles.sources}>
                  <h2>Sources</h2>
                  <ol>
                    {post.sources.map((source) => (
                      <li key={source.title}>
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
                        ) : source.title}
                        {source.author && <span> — {source.author}</span>}
                        {source.date && <span> ({source.date})</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <aside className={styles.detailsCard} aria-label="Article details">
              <span>Published</span>
              <strong>{formattedDate}</strong>
              <span>Written by</span>
              <strong>{authorName}</strong>
            </aside>
          </div>

          <div className={styles.postCta}>
            <p>Have a thought to add?</p>
            <h2>Let&apos;s continue the conversation.</h2>
            <button type="button" className="btn btn-primary" onClick={() => { track('Contact Click', { location: 'blog_post' }); showModal() }}>Get in touch ↗</button>
          </div>
        </div>
      </section>

      <ContactModal messageSent={session?.messageSent} />
    </Main>
  )
}
