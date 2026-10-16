import Hero from '../components/Hero'
import { WhoWeAre, WhatWeDo, HowItWorks, WhyEzentixLabs } from '../components/Sections'
import Work from '../components/Work'
import ZenOS from '../components/ZenOS'
import Contact, { Footer } from '../components/Contact'
import Seo from '../components/Seo'

/*
 * Section order is fixed by the brief:
 * hero → who → what → how → why → work → CHARU POS → contact
 * Zen OS sits second from last, right before the contact block.
 */
export default function Home() {
  return (
    <>
      <Seo />
      <main id="main">
        <Hero />
        <WhoWeAre />
        <WhatWeDo />
        <HowItWorks />
        <WhyEzentixLabs />
        <Work />
        <ZenOS />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
