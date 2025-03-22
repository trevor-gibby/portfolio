
import { useEffect, useState } from 'react'

import Image from 'next/image'
import Main from '@/components/main_templates/main'
import BgImg from '@/components/dynamic_content_widgets/bg-img/bg-img'
import ContactModal, { showModal, hideModal } from '@/components/content_widgets/contact-modal/contact-modal'
import SubnavCard1 from '@/components/dynamic_content_widgets/subnav-card-1/subnav-card-1'
import SkillsBadges1 from '@/components/dynamic_content_widgets/skills-badges-1/skills-badges-1'
import CTA from '@/components/content_widgets/cta/cta'
import MyWorkCard1 from '@/components/dynamic_content_widgets/my-work-card-1/my-work-card-1'

import pages from '@/variables/pages.json';
import skills from '@/variables/skills.json';
import mywork from '@/variables/my-work.json';

export default function Home({siteVariables, session}) {

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
    meta_title="Trevor Gibby - Full Stack Web Developer"
    meta_description="I am a full stack web developer with a passion for creating innovative and impactful web applications. I have experience with a wide range of technologies and frameworks, and I am always looking to learn more."
  >
    {/* Hero Layer */}
    <section>
      <BgImg img="/images/hero.jpeg" alt={siteVariables.dba} add_classes="hero" overlay="dark" img_position="top" />
      <div className="container">
        <div className="row align-items-center" style={{height: 400}}>
          <div className="col-12 text-center text-light">
            <h1 className="h3 mb-5">Trevor Gibby - Full Stack Web Developer</h1>
            <h2 className="h1 mb-4">Innovative. Creative. Impactful.</h2>
            <div className="row justify-content-center">
              <div className="col-auto">
                <a onClick={showModal} className="btn btn-primary btn-lg">Contact Me</a>
              </div>
              <div className="col-auto">
                <a href="/my-work" className="btn btn-outline-light btn-lg">My Work</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Subnav Layer */}
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-2">
            <h2 className="h1 text-center text-lg-start mb-2">Why Trevor Gibby</h2>
            <hr className="primary"/>
          </div>
        </div>
      </div>
      
      <SubnavCard1
        pages={pages}
      />
    </section>

    {/* About Me Layer */}
    <section className="pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 order-2 order-lg-1">
            <div className="py-lg-4">
              <h2 className="h1 mb-4">About Me</h2>
              <p className="">I am a full stack web developer with a passion for creating innovative and impactful web applications. I have experience with a wide range of technologies and frameworks, and I am always looking to learn more.</p>
              <p>
                I received my Bachelor's degree in Computer Science from the Utah Valley University in 2023 with Summa Cum Laude Honors. In the computer science program at UVU I gained exposure to a wide range of technologies and programming languages. I also gained experience working in teams to complete projects. I was able to apply my knowledge and skills to a number of projects including a web application Family Feud style game, a mobile application for storing contacts, and a web application for managing clients.
              </p>
              <p>
                I have also worked as a full stack web developer for the past 2 years at <a href="https://ninthroot.com" rel="nofollow" target="_blank">Ninthroot</a>. As a digital marketing agency, Ninthroot has given me the opportunity to work on a wide range of front end sites each with their own unique brands and styles. In total I have so far led the development of 15 new websites for our clients. I also worked on a number of backend projects including developing our own PHP based framework, building out additional functionality for our own content management system and designing and building a custom CRM from scratch.
              </p>
              <a href="/about">Learn More <i className="fa-solid fa-chevron-right"></i></a>
            </div>
          </div>
          <div className="col-lg-4 order-lg-2 order-1 mb-3 mb-lg-0">
            <div className="bg-img-wrapper h-100 box-shadow" style={{'--bg-img-min-h': '500px'}}>
              <img className="bg-img" src="/headshots/headshot2.jpg" alt="Trevor Gibby" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* My Work Layer - Cards with images and links to my work, see more button at bottom of section */}
    <section className="pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-2">
            <h2 className="h1 text-center text-lg-start mb-2">My Work</h2>
            <hr className="primary"/>
          </div>
        </div>
      </div>
      <MyWorkCard1
        items={mywork}
      />

      <div className="container mt-lg-4 mt-3">
        <div className="row">
          <div className="col-lg-12 text-center">
            <a href="/my-work" className="btn btn-outline-primary btn-lg btn-block">See More</a>
          </div>
        </div>
      </div>
    </section>

    {/* Skills Layer */}
    <section className="pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="h1 text-center mb-4">Technical Skills</h2>
          </div>
        </div>
      </div>
      <SkillsBadges1 
        items={skills}
      />

      <div className="container mt-lg-4 mt-3">
        <div className="row">
          <div className="col-lg-12 text-center">
            <a href="/skills" className="btn btn-outline-primary btn-lg">View All</a>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Layer */}
    <section className="pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <CTA
              color="primary-dark"
              textColor="light"
              title="Interested?"
              subtitle="Contact me to see how I can help you!"
              button1={{text: 'Contact Me', color: 'outline-light', link: '/contact'}}
              logoColor="wash"
            />
          </div>
        </div>
      </div>
    </section>

    
    <ContactModal messageSent={messageSent} />
  </Main>
)
}
