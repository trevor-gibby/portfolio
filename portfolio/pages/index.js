
import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import Main from '@/components/main_templates/main'
import BgImg from '@/components/dynamic_content_widgets/bg-img/bg-img'
import ContactModal, { showModal, hideModal } from '@/components/content_widgets/contact-modal/contact-modal'
import SkillsModal, {showSkillsModal, hideSkillsModal} from '@/components/dynamic_content_widgets/skills-modal/skills-modal'
import SubnavCard1 from '@/components/dynamic_content_widgets/subnav-card-1/subnav-card-1'
import SkillsBadges1 from '@/components/dynamic_content_widgets/skills-badges-1/skills-badges-1'
import CTA from '@/components/content_widgets/cta/cta'
import MyWorkCard1 from '@/components/dynamic_content_widgets/my-work-card-1/my-work-card-1'
import BlogCard from '@/components/dynamic_content_widgets/blog-card/blog-card'

import pages from '@/variables/pages.json';
import skills from '@/variables/skills.json';
import mywork from '@/variables/my-work.json';
import blogPostsData from '@/variables/blog-posts.json';
const blogPosts = blogPostsData.posts;

export default function Home({siteVariables, session}) {

  const [uuid, setUuid] = useState(null)
  const [messageSent, setMessageSent] = useState(false)

  // Get recent published posts (up to 3)
  const recentPosts = blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)

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
          <div className="col-12 text-center text-tertiary">
            <h1 className="h3 mb-5">Trevor Gibby - Full Stack Web Developer</h1>
            <h2 className="h1 mb-4">Innovative. Creative. Impactful.</h2>
            <div className="row justify-content-center">
              <div className="col-auto">
                <a onClick={showModal} className="btn btn-primary btn-lg">Contact Me</a>
              </div>
              <div className="col-auto">
                <a href="/#my-work" className="btn btn-outline-tertiary btn-lg">My Work</a>
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
    <section id="about" className="pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 order-2 order-lg-1">
            <div className="py-lg-4">
              <h2 className="h1 mb-0">About Me</h2>
              <hr className="primary" />
              <p className="">
                I am a Full Stack Engineer and Team Lead with 5 years of engineering experience and 2 years leading teams building large-scale marketing applications. I'm experienced in designing and delivering end-to-end systems, mentoring engineers, and driving improvements in code quality, delivery velocity, and cross-team collaboration.
              </p>
              <p>
                I received my Bachelor's degree in Computer Science from the Utah Valley University in 2023 with Summa Cum Laude Honors. In the computer science program at UVU I gained exposure to a wide range of technologies and programming languages. I also gained experience working in teams to complete projects. I was able to apply my knowledge and skills to a number of projects including a web application Family Feud style game, a mobile application for storing contacts, and a web application for managing clients.
              </p>
              <p>
                I’ve spent the past 5 years as a full stack engineer at <a href="https://ninthroot.com" rel="nofollow" target="_blank">Ninthroot</a>, a digital marketing agency where I’ve had the chance to work across a wide range of products and teams. Much of my work has involved building and launching consumer-facing websites with unique brands and designs — including leading the development of 15+ new client sites — while also contributing to the systems that power them behind the scenes.
              </p>
              <p>
                On the backend, I’ve worked on everything from evolving our PHP-based framework and content management system to designing and building internal applications from the ground up. Along the way, I’ve also been closely involved in improving our deployment workflows and team practices, which has given me a strong appreciation for building not just features, but reliable systems and healthy engineering processes.
              </p>
            </div>
          </div>
          <div className="col-lg-4 order-lg-2 order-1 mb-3 mb-lg-0">
            <div className="bg-img-wrapper h-100 box-shadow" style={{'--bg-img-min-h': '500px'}}>
              <img className="bg-img" src="/headshots/headshot1-2.jpeg" alt="Trevor Gibby" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* My Work Layer - Cards with images and links to my work, see more button at bottom of section */}
    <section id="my-work" className="bg-secondary text-tertiary">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-2">
            <h2 className="h1 text-center text-lg-start mb-2">My Work</h2>
            <hr className="tertiary"/>
          </div>
        </div>
        <MyWorkCard1
          items={mywork}
        />
      </div>
    </section>

    {/* Skills Layer */}
    <section id="skills" className="">
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
            <a onClick={showSkillsModal} className="btn btn-outline-primary btn-lg">View All</a>
          </div>
        </div>
      </div>
    </section>

    {/* Recent Posts Layer */}
    {recentPosts.length > 0 && (
      <section id="blog" className="pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <h2 className="h1 text-center text-lg-start mb-2">Recent Posts</h2>
              <hr className="primary"/>
            </div>
          </div>
          <div className="row">
            {recentPosts.map((post, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 text-center mt-2">
              <Link href="/blog" className="btn btn-outline-primary btn-lg">View All Posts</Link>
            </div>
          </div>
        </div>
      </section>
    )}

    {/* CTA Layer */}
    <section className="pt-0">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <CTA
              color="primary"
              textColor="tertiary"
              title="Interested?"
              subtitle="Contact me to see how I can help you!"
              button1={{text: 'Contact Me', color: 'outline-tertiary', onClick: showModal}}
              logoColor="tertiary"
            />
          </div>
        </div>
      </div>
    </section>

    
    <ContactModal messageSent={messageSent} />

    <SkillsModal />
  </Main>
)
}
