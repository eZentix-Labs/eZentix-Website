/*
 * SAHAJ OS — pricing and feature gating.
 * ---------------------------------------------------------------
 * This is the ONLY file to edit when prices or tier limits change.
 * Nothing else in the codebase hardcodes a rupee figure.
 *
 * Gating principle: never gate what breaks the product (billing,
 * printing). Gate on scale (tables / menu / staff), on channels
 * (dining -> takeaway -> delivery), and on depth of insight.
 */

export const CURRENCY = '₹'

/* One formatter, used everywhere a price appears. */
export const rupee = (n) => CURRENCY + Number(n).toLocaleString('en-IN')

/* The eight capabilities, in customer language. */
export const CAPABILITIES = [
  {
    id: 'owner-console',
    name: 'Owner Console',
    blurb: 'Menu, prices, staff, day-close and reports — from your phone or the counter.',
  },
  {
    id: 'billing-counter',
    name: 'Billing Counter',
    blurb: 'Take the order, print the bill, capture cash or UPI. Works without internet.',
  },
  {
    id: 'waiter-app',
    name: 'Waiter App',
    blurb: 'Your waiter takes the order at the table. The kitchen gets it before he walks back.',
  },
  {
    id: 'printing',
    name: 'Bill & KOT Printing',
    blurb: 'Thermal printer for customer bills and kitchen order tickets.',
  },
  {
    id: 'storefront',
    name: 'Digital Storefront',
    blurb: 'Google listing, Instagram, Facebook and a menu page people can actually find.',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Billing & Reviews',
    blurb: 'Bill goes to the customer on WhatsApp. So does the request for a Google review.',
  },
  {
    id: 'floor-view',
    name: 'Live Floor View',
    blurb: 'Every table, every running order, live. Watch the shop from anywhere.',
  },
  {
    id: 'insights',
    name: 'Insights',
    blurb: 'What sold, when it sold, and what your best hour of the week actually is.',
  },
]

/* The parameters that separate the tiers. */
export const TIERS = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'For a single counter',
    forWhom: 'Chai stall, sweet shop, takeaway counter',
    monthly: 999,
    annual: 9990, // two months free
    highlight: false,
    limits: [
      { label: 'Tables', value: '8' },
      { label: 'Menu items', value: '50' },
      { label: 'Staff logins', value: '2' },
      { label: 'Outlets', value: '1' },
    ],
    includes: [
      'Owner Console',
      'Billing Counter (1 login)',
      'Bill & KOT printing',
      'Dining + Takeaway',
      'WhatsApp bill delivery',
      'Google Business listing, set up and managed',
      'Daily sales summary',
      'Complimentary agency access',
    ],
    excludes: ['Waiter App', 'Live Floor View', 'Home delivery', 'Trend analytics'],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For a restaurant with floor staff',
    forWhom: 'Dine-in restaurant, café, cloud kitchen',
    monthly: 2499,
    annual: 24990,
    highlight: true,
    limits: [
      { label: 'Tables', value: '25' },
      { label: 'Menu items', value: '200' },
      { label: 'Staff logins', value: '8' },
      { label: 'Outlets', value: '1' },
    ],
    includes: [
      'Everything in Basic',
      'Waiter App (up to 5 waiters)',
      'Live Floor View — real-time table map',
      'Home delivery module',
      'Instagram + Facebook management',
      'Menu microsite on your own page',
      'WhatsApp order updates + review requests',
      'Trend analytics — peak hours, best sellers, week-on-week',
      'Basic inventory tracking',
    ],
    excludes: ['Multi-outlet console', 'Managed ad campaigns', 'Procurement'],
  },
  {
    id: 'pro-plus',
    name: 'Pro Plus',
    tagline: 'For an owner who wants us running growth',
    forWhom: 'Multi-outlet, or scaling fast',
    monthly: 4999,
    annual: 49990,
    highlight: false,
    limits: [
      { label: 'Tables', value: 'Unlimited' },
      { label: 'Menu items', value: 'Unlimited' },
      { label: 'Staff logins', value: 'Unlimited' },
      { label: 'Outlets', value: 'Unlimited' },
    ],
    includes: [
      'Everything in Pro',
      'Multi-outlet console — every branch in one view',
      'Full business intelligence — margins, wastage, staff performance',
      'Your own .com domain, included',
      'Managed ad campaigns — Google, Facebook, WhatsApp',
      'Raw material procurement + inventory management',
      'Home delivery partner integration',
      'Priority support with a named contact',
      'Quarterly business review with the founder',
    ],
    excludes: [],
  },
]

/* Charged on top of any tier. */
export const ADD_ONS = [
  { name: 'Your own .com domain', price: 3000, unit: 'year', note: 'Included free on Pro Plus' },
  { name: 'Extra waiter login', price: 199, unit: 'month', note: 'Pro and above' },
  { name: 'Thermal printer (hardware)', price: 4500, unit: 'one-time', note: 'Or use your own' },
  { name: 'Extra outlet', price: 1499, unit: 'month', note: 'Pro only — free on Pro Plus' },
]

export const ANNUAL_NOTE = 'Pay yearly and two months are on us.'
