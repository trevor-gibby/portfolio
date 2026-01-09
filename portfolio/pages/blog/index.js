import Main from '@/components/main_templates/main'
import BlogCard from '@/components/dynamic_content_widgets/blog-card/blog-card'
import CTA from '@/components/content_widgets/cta/cta'
import ContactModal, { showModal } from '@/components/content_widgets/contact-modal/contact-modal'

import blogPostsData from '@/variables/blog-posts.json'
const blogPosts = blogPostsData.posts

export default function Blog({ siteVariables, session }) {
  // Filter to only published posts and sort by date (newest first)
  const publishedPosts = blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <Main
      meta_title="Blog - Trevor Gibby"
      meta_description="Thoughts on web development, technology, and my journey as a full stack developer."
    >
      {/* Hero */}
      <section className="bg-primary text-tertiary">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-4">
              <h1 className="h1 mb-3">Blog</h1>
              <p className="lead mb-0">Thoughts on software engineering, management, technology, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section>
        <div className="container">
          {publishedPosts.length > 0 ? (
            <div className="row">
              {publishedPosts.map((post, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="row">
              <div className="col-12 text-center py-5">
                <p className="lead">No posts yet. Check back soon!</p>
              </div>
            </div>
          )}
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
                title="Want to work together?"
                subtitle="Let's connect and discuss your next project!"
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
