import Main from '@/components/main_templates/main'
import BlogCard from '@/components/dynamic_content_widgets/blog-card/blog-card'
import ContactModal from '@/components/content_widgets/contact-modal/contact-modal'
import blogPostsData from '@/variables/blog-posts.json'
import styles from './index.module.scss'

export default function Blog({ session }) {
  const publishedPosts = blogPostsData.posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <Main
      meta_title="Writing — Trevor Gibby"
      meta_description="Thoughts on software engineering, technical leadership, product development, and building better systems."
    >
      <section className={styles.hero}>
        <div className="container">
          <p>Field notes · Engineering &amp; leadership</p>
          <h1>Notes from the <span>workbench.</span></h1>
          <div className={styles.heroBottom}>
            <p>Ideas, lessons, and useful details collected while building software and leading teams.</p>
            <span>{publishedPosts.length.toString().padStart(2, '0')} published notes</span>
          </div>
        </div>
      </section>

      <section className={styles.posts}>
        <div className="container">
          {publishedPosts.length > 0 ? (
            <div className={styles.grid}>
              {publishedPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
            </div>
          ) : (
            <p className={styles.empty}>No notes yet. Check back soon.</p>
          )}
        </div>
      </section>

      <ContactModal messageSent={session?.messageSent} />
    </Main>
  )
}
