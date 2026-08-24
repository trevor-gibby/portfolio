import Main from '@/components/main_templates/main'
import Home from '@/components/main_templates/home/home'

export function getStaticProps() {
  return { props: {} }
}

export default function HomePage({ siteVariables, session }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Trevor Gibby',
    url: 'https://trevorgibby.dev',
    jobTitle: 'Senior Full-Stack Engineer and Technical Lead',
    sameAs: [
      'https://github.com/trevor-gibby',
      'https://www.linkedin.com/in/trevor-gibby'
    ]
  }

  return (
    <Main
      meta_title="Trevor Gibby | Senior Full-Stack Engineer & Technical Lead"
      meta_description="Senior full-stack engineer and hands-on technical leader specializing in platform modernization, reusable product systems, integrations, AWS, and practical 0→1 development."
      meta_url="https://trevorgibby.dev"
      schema={schema}
    >
      <Home siteVariables={siteVariables} session={session} />
    </Main>
  )
}
