import Main from '@/components/main_templates/main'
import Home from '@/components/main_templates/home/home'

export default function HomePage({ siteVariables, session }) {
  return (
    <Main
      meta_title="Trevor Gibby — Full Stack Engineer & Team Lead"
      meta_description="Full stack engineer and team lead building thoughtful interfaces, resilient platforms, and high-performing engineering teams."
    >
      <Home siteVariables={siteVariables} session={session} />
    </Main>
  )
}
