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
      <Seo
        title="eZentix Labs — Software Company in Budbud, West Bengal | Zen OS"
        description="eZentix Labs is a software company in Budbud, West Bengal — makers of Zen OS billing and restaurant software, plus websites and online presence for local shops."
      />
      <Hero />
      <WhoWeAre />
      <WhatWeDo />
      <HowItWorks />
      <WhyEzentixLabs />
      <Work />
      <ZenOS />
      <Contact />
      <Footer />
    </>
  )
}
