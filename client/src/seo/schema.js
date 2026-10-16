import { ORIGIN, BRAND, PAGE_SEO, abs } from './site.js'
import { CONTACT, SOCIAL } from '../data/content.js'

const businessId = abs('/#organization')
const services = [
  ['zen-os', 'Zen OS billing and POS software', 'Billing and point-of-sale software for local shops and restaurants.'],
  ['restaurant-software', 'Restaurant software', 'Restaurant orders, tables, kitchen tickets, inventory and daily reports.'],
  ['custom-software', 'Custom business software', 'Business software including clinic systems, inventory management and CRM.'],
  ['website-development', 'Website development', 'Websites and e-commerce stores for local businesses.'],
  ['online-presence', 'Online presence services', 'Online business presence and social media management for local businesses.'],
]

export const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': businessId,
      name: BRAND,
      alternateName: ['eZentix', 'Ezentix Labs'],
      url: abs('/'),
      logo: abs('/logo.svg'),
      image: abs('/og-image.jpg'),
      description: 'eZentix Labs provides Zen OS billing and restaurant software, custom business software, websites and online presence services for shops, restaurants and clinics in West Bengal.',
      telephone: CONTACT.phone,
      email: CONTACT.admin,
      sameAs: SOCIAL.map((s) => s.href),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Budbud',
        addressRegion: 'West Bengal',
        addressCountry: 'IN',
      },
      location: { '@type': 'Place', name: 'Budbud, Purba Bardhaman, West Bengal, India' },
      areaServed: { '@type': 'State', name: 'West Bengal' },
      contactPoint: [{
        '@type': 'ContactPoint', telephone: CONTACT.phone,
        email: CONTACT.support, contactType: 'customer support',
        availableLanguage: ['en', 'bn', 'hi'], areaServed: 'IN',
      }],
    },
    {
      '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'),
      name: BRAND, alternateName: 'eZentix', inLanguage: 'en-IN',
      publisher: { '@id': businessId },
    },
    {
      '@type': 'WebPage', '@id': abs('/#webpage'), url: abs('/'),
      name: PAGE_SEO['/'].title, description: PAGE_SEO['/'].description,
      isPartOf: { '@id': abs('/#website') }, about: { '@id': businessId },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'SoftwareApplication', '@id': abs('/#zen-os'), name: 'Zen OS',
      alternateName: ['ZenOS', 'Zen OS billing software'],
      applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
      url: abs('/#zen-os'), publisher: { '@id': businessId },
      description: services[1][2],
    },
    ...services.map(([id, name, description]) => ({
      '@type': 'Service', '@id': `${ORIGIN}/#service-${id}`, name, description,
      provider: { '@id': businessId },
      areaServed: { '@type': 'State', name: 'West Bengal' },
      url: abs(id === 'zen-os' || id === 'restaurant-software' ? '/#zen-os' : '/#services'),
    })),
  ],
}
