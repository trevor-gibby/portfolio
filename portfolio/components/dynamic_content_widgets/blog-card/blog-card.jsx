import styles from './blog-card.module.scss'
import Link from 'next/link'

export default function BlogCard({ post }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link href={`/blog/${post.slug}`} className={styles.blog_card}>
      <article>
        {post.image && (
          <div className={styles.image}>
            <img src={post.image} alt={post.title} />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.date}>{formatDate(post.date)}</span>
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <span className={styles.read_more}>Read article <span aria-hidden="true">→</span></span>
        </div>
      </article>
    </Link>
  )
}
