import blogPostsData from '@/variables/blog-posts.json'
import { caseStudies } from '@/variables/case-studies'

const siteUrl = 'https://trevorgibby.dev'

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function buildSitemap() {
  const urls = [
    { path: '/', priority: '1.0' },
    { path: '/blog', priority: '0.6' },
    ...caseStudies.map((caseStudy) => ({ path: `/work/${caseStudy.slug}`, priority: '0.9' })),
    ...blogPostsData.posts
      .filter((post) => post.published)
      .map((post) => ({ path: `/blog/${post.slug}`, priority: '0.5', lastmod: post.date }))
  ]

  const entries = urls.map((url) => `  <url>
    <loc>${escapeXml(`${siteUrl}${url.path}`)}</loc>${url.lastmod ? `
    <lastmod>${url.lastmod}</lastmod>` : ''}
    <priority>${url.priority}</priority>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

export function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
  res.write(buildSitemap())
  res.end()
  return { props: {} }
}

export default function Sitemap() {
  return null
}
