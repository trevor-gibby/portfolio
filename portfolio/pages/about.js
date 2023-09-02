
import { useEffect, useState } from 'react'

import Main from '@/components/main_templates/main'
import BgImg from '@/components/dynamic_content_widgets/bg-img/bg-img'
import ContactModal, { showModal, hideModal } from '@/components/content_widgets/contact-modal/contact-modal'

import pages from '@/variables/pages.json';

export default function About({siteVariables, session}) {
  
  const [uuid, setUuid] = useState(null)
  const [messageSent, setMessageSent] = useState(false)

  useEffect(() => {
    if (session) {
      setUuid(session.uuid ? session.uuid : null)
      setMessageSent(session.messageSent ? session.messageSent : false)
    }
  }, [session])

  return (
    <Main
      meta_title="About Trevor Gibby - Full Stack Web Developer"
      meta_description="I am a full stack web developer with a passion for creating innovative and impactful web applications. Get to know me and my work."
      >
      {/* Hero Layer */}
      <section className="lr-sect lr-sect-card-wrapper-mobile pb-0">
        <div className="left contain bg-secondary-dark lr-sect-card-side text-light">
          <div className="lr-container d-flex flex-column justify-content-center lr-sect-card" style={{height: '650px'}}>
            <div className="row justify-content-center justify-content-lg-start">
              <div className="col-12">
                <h1 className="h2 mb-5 text-lg-start text-center">About Me</h1>
              </div>
              <div className="col-auto">
                <a onClick={showModal} className="btn btn-light btn-lg">Contact Me</a>
              </div>
              <div className="col-auto">
              <a href="/my-work" className="btn btn-primary btn-lg">My Work</a>
              </div>
            </div>
          </div>
        </div>
        <div className="right" style={{minHeight: 'calc(var(--nav-mobile-height) + 260px)'}}>
          <BgImg img="/images/utah.jpg" alt={siteVariables.dba} img_position="top" caption="Credit to Jason Alvarez - https://www.pexels.com/photo/mountain-landscape-near-frozen-river-12343629/" />
        </div>
      </section>

      

      <ContactModal messageSent={messageSent} />
    </Main>
  )
}