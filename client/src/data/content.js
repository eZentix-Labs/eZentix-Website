/*
 * All user-facing copy, in three languages.
 * Add a language by adding a key here — nothing else needs to change.
 */

export const LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'bn', label: 'বাং', name: 'বাংলা' },
  { code: 'hi', label: 'हिं', name: 'हिन्दी' },
]

export const content = {
  /* ------------------------------------------------------------------ */
  en: {
    dir: 'ltr',
    brand: 'eZentix Labs',
    location: 'Budbud, West Bengal',

    nav: {
      sections: 'Sections',
      menu: 'Menu',
      signIn: 'Sign in',
      signUp: 'Get started',
      portal: 'My account',
      signOut: 'Sign out',
      theme: 'Switch theme',
      language: 'Language',
      soundOn: 'Turn sound on',
      soundOff: 'Turn sound off',
    },

    hero: {
      kicker: 'eZentix Labs · Software company in Budbud, West Bengal',
      title: ['Powered by AI,', 'guided by technical experts.'],
      sub: 'We sort the chaos of your offline business and transition you *seamlessly* online.',
      body: 'eZentix Labs builds and runs the software your shop needs — a point of sale, a booking system, an inventory tracker — and then stays on to run your online presence and talk you through the business decisions. The machine does the counting. We do the caring.',
      ctaPrimary: 'Talk to Us',
      ctaSecondary: 'Book a Demo',
      waText: 'Hello eZentix Labs — I run a business and I would like to talk about going online.',
    },

    who: {
      eyebrow: 'A digital agency that turns up at your shop',
      title: 'You get *the person who built it*, not a support ticket or phone call.',
      body: 'We work with businesses that are already running and already busy — a restaurant, a clinic, a sweet shop — and take the whole thing online without you having to hire five different vendors to do it. We are based in Budbud and we work regionally. Hands and feet on the ground, not a ticket number in a queue.',
    },

    what: {
      title: 'Our service offerings.',
      body: 'Tick whatever your shop needs. Everything below sits under one of three groups — you do not need to know which one, that is our job. No pricing here, just tell us what you want and we will talk you through it.',
      pickCount: (n) => (n === 1 ? '1 service selected' : `${n} services selected`),
      pickCta: 'Get a quote for these',
      pickNone: 'Nothing picked yet — that is fine too, scroll on.',
      pillars: [
        {
          name: 'Business Software',
          line: 'Custom-built or ready to go — whichever gets you running faster.',
          items: [
            'Billing and order-taking for restaurants and quick-service shops (point of sale / POS)',
            'Running the front desk and records for a hospital or clinic (HMS)',
            'Knowing what is in stock without counting by hand (inventory control)',
            'Keeping track of every customer and running the business from one screen (CRM / ERP)',
            'A shop that sells things online (e-commerce store)',
            'Smart devices and sensors wired into your systems (IoT)',
          ],
        },
        {
          name: 'Business Intelligence & Growth',
          line: 'The advice that normally costs extra, included.',
          items: [
            'An AI assistant trained on your own business (AI agent)',
            'Finding the right customers to advertise to, using your own sales data (data-driven targeting)',
            'Help figuring out who to hire and how many people you need (staffing guidance)',
            'Paperwork sorted — ITR, GST, MSME, trade licence, trademark, FSSAI (compliance)',
          ],
        },
        {
          name: 'Your Gateway to Going Viral',
          line: 'So people find you before they find the shop next door.',
          items: [
            'Running your Instagram, Facebook and reels (social media management / SMO)',
            'Showing up when someone searches for you on Google (SEO / local search)',
            'Paid ads that bring customers to your door (digital marketing)',
            'A website, an online store, and your own web address (domain)',
          ],
        },
      ],
    },

    how: {
      title: 'What actually happens after you sign up.',
      steps: [
        {
          when: 'Week 1–2',
          name: 'Discovery',
          body: 'We sit in your shop and watch how it actually runs. Not what a template assumes you need — what you are actually short of.',
        },
        {
          when: 'Day 1 of your subscription',
          name: 'You get something working',
          body: 'Either the software, the workflow, or the system — live and in your hands on day one. Built for you, or set up from what we already have ready. Whichever gets you running faster.',
        },
        {
          when: 'Ongoing, no extra cost',
          name: 'Complimentary agency access',
          body: 'Ask us anything we know — social, Google, ads, website, stock, hiring, GST. Free, for as long as you are with us. Want us to run it for you? That part is extra, quoted upfront.',
        },
        {
          when: 'As long as you want us',
          name: 'We grow with you',
          body: 'The bigger you get, the more we take off your plate — heavier systems, sharper advice, decisions made with real numbers behind them. Some businesses outgrow a subscription entirely. When that happens, we stop talking about vendors and start talking about a partnership.',
        },
      ],
    },

    why: {
      title: 'Why juggle five different vendors when you can rely on just one?',
      before: {
        label: 'The usual way',
        head: 'Five vendors, five problems',
        body: 'One vendor for the billing software. A freelancer for Instagram. Someone else for the Google listing. An accountant for compliance. None of them speak to each other, and every gap between them lands back on your desk.',
      },
      after: {
        label: 'The Zen way',
        head: 'One subscription, one point of contact',
        body: 'Your software, your online presence and your business guidance — held by one team that already knows how your shop runs, because we built the system running it.',
      },
    },

    pos: {
      eyebrow: "One of our products — the one that's live today",
      title: 'Zen OS',
      sub: 'Billing and restaurant software from eZentix Labs — one operating system for the whole shop: billing, orders, stock and reporting on a single platform.',
      body: 'Zen OS is not just a point of sale. It folds billing, order-taking, kitchen tickets, inventory, table management and daily reporting into one unified system, so the shop runs on one screen instead of four disconnected tools. Order at the table. Ticket in the kitchen. Bill on WhatsApp. Every table on your phone while you are sitting at home. Its subscription is separate from anything you pick from our services above — start with just this, on day one, and add the rest whenever you are ready.',
      featuresTitle: 'What is inside',
      bizFilterLabel: "What's your business?",
      pricingTitle: 'Pick what fits the shop',
      monthly: 'Monthly',
      annual: 'Yearly',
      perMonth: '/month',
      perYear: '/year',
      billedAnnually: 'billed yearly',
      choose: 'Choose',
      popular: 'Most restaurants pick this',
      notIncluded: 'Not in this plan',
      addOnsTitle: 'Add on when you need it',
      limitsTitle: 'Limits',
      floorTitle: 'Live Floor View',
      floorSub: 'This is what your shop looks like from your phone.',
      free: 'Free',
      occupied: 'Running',
      billed: 'Billed',
      annualNote: 'Pay yearly and two months are on us.',
    },

    founder: {
      label: 'Who you would be talking to',
      name: 'Sourav Dutta',
      role: 'Founder & Principal Consultant',
      body: "Sourav has spent the last decade inside some of the largest technology companies in the world — Tech Mahindra, Capgemini, LTIMindtree — shaping how those businesses run and building the systems they depend on every day. eZentix Labs exists to bring that same standard of work to businesses that usually never get access to it, at a price built for a shop, not a corporation.",
      quote: 'You get direct access to me. Not a support ticket — a phone call.',
    },

    work: {
      eyebrow: 'Our work',
      title: 'Client Works',
      sub: 'One real shop, the mess we found, and what is running there now.',
      viewCta: 'See the full story',
      case: 'Case study',
      problemLabel: 'The problem',
      solutionLabel: 'What we built',
      coverAlt: 'Case study cover',
      galleryLabel: 'What we built — in pictures',
      close: 'Close',
      items: [
        {
          id: 'hotel-khoai',
          client: 'Hotel Khoai',
          tagline:
            'A 28-table restaurant with a 299-dish menu — now run from one screen: orders, tables, kitchen, bills, stock and staff.',
          cover: '/work/hotel-khoai/cover.jpg',
          gallery: [
            { src: '/work/hotel-khoai/restaurant.webp', width: 960, height: 1280, alt: 'Hotel Khoai at night — the lit sign over the dining area' },
            { src: '/work/hotel-khoai/orders.webp', width: 1600, height: 765, alt: 'Zen OS orders screen at Hotel Khoai — tables by seating area, ready for a new order' },
            { src: '/work/hotel-khoai/table-map.webp', width: 1600, height: 768, alt: 'Zen OS table management — 28 tables, the walk-in queue and printable table QR codes' },
            { src: '/work/hotel-khoai/menu.webp', width: 1600, height: 780, alt: 'Zen OS menu manager — 299 items in 29 categories, with sold-out-today switches' },
            { src: '/work/hotel-khoai/invoices.webp', width: 1600, height: 750, alt: 'Zen OS invoices — every bill with its cash or online settlement and daily totals' },
            { src: '/work/hotel-khoai/inventory.webp', width: 1600, height: 763, alt: 'Zen OS inventory — purchases, wastage, stock counts and food cost' },
            { src: '/work/hotel-khoai/staff.webp', width: 1600, height: 768, alt: 'Zen OS staff records — duty, orders, attendance and pay for each waiter' },
          ],
          problem:
            "Hotel Khoai seats guests across four areas — indoor, AC, garden and gazebo — 28 tables in all, with a menu of nearly 300 dishes and a floor team of eight. At that size, order pads, a calculator and memory stop keeping up: a table waits while someone works out who ordered what, the day's cash and UPI have to be matched by hand, and nobody can say what is running low in the kitchen until it has run out.",
          solution:
            'We put the whole restaurant on Zen OS. Orders are taken against a live table map, so the floor and the counter see the same thing. The full menu — 299 items in 29 categories — is managed in one place, and any dish can be switched off or marked sold out for the day in a tap. Every bill is recorded with how it was paid, and the day closes with cash and online totals that add up. Stock, purchases and wastage are tracked in the same system, and each waiter has their own record of shifts, orders and pay.',
        },
      ],
    },

    lead: {
      title: 'Tell us what you are running.',
      sub: 'We will tell you what it needs. No cost for the conversation.',
      name: 'Your name',
      business: 'Business name',
      type: 'What kind of business',
      types: ['Restaurant or café', 'Sweet shop or bakery', 'Clinic or diagnostic', 'Retail shop', 'Something else'],
      phone: 'Phone or WhatsApp number',
      message: 'What is the biggest thing slowing you down right now?',
      submit: 'Send it over',
      sending: 'Sending…',
      formTitle: 'Start the conversation',
      formSub: 'Fill this in and we will call you back. It takes a minute.',
      privacy: 'We use your details only to get back to you. No lists, no spam.',
      optional: 'optional',
      done: 'Got it. We will call you within two working days.',
      error: 'That did not send. Call us on +91 84362 99320 instead.',
      required: 'Fill this in',
      badPhone: 'Enter a 10-digit number',
    },

    contact: {
      title: 'Get in touch',
      body: 'Whether you are a restaurant, a clinic, a shop, or something that fits none of those — write, call, or send a WhatsApp. We will set up a discovery conversation.',
      email: 'Email us',
      call: 'Call us',
      whatsapp: 'WhatsApp',
      adminLabel: 'Admin',
      supportLabel: 'Support',
      phoneLabel: 'Phone',
      addressLabel: 'Address',
      address: 'Budbud, West Bengal — 713403',
    },

    auth: {
      signInTitle: 'Sign in to your account',
      signUpTitle: 'Create your account',
      signInSub: 'See what you are subscribed to, your invoices and your renewal date.',
      signUpSub: 'Already a eZentix Labs customer? Set up your login here.',
      email: 'Email address',
      password: 'Password',
      businessName: 'Business name',
      submitIn: 'Sign in',
      submitUp: 'Create account',
      toggleToUp: 'New here? Create an account',
      toggleToIn: 'Already have an account? Sign in',
      demoNote: 'Demo login — demo@charubala.com / demo1234',
      close: 'Close',
    },

    portal: {
      greeting: 'Welcome back',
      subtitle: 'Everything you are subscribed to, in one place.',
      opted: 'What you opted for',
      currentPurchase: 'Current subscription',
      plan: 'Plan',
      status: 'Status',
      active: 'Active',
      startedOn: 'Started',
      renewsOn: 'Renews',
      daysLeft: 'days left',
      amount: 'Amount',
      openPos: 'Open Zen OS',
      openPosSub: 'Takes you to your live billing dashboard',
      quickLinks: 'Quick links',
      invoices: 'Invoices',
      invoiceNo: 'Invoice',
      date: 'Date',
      paid: 'Paid',
      pending: 'Pending',
      download: 'Download',
      addOnsHeld: 'Add-ons on your account',
      support: 'Need something?',
      supportBody: 'Complimentary agency access is part of your subscription. Ask for anything on the list — marketing, Google, hiring, GST — at no extra cost.',
      raiseRequest: 'Ask for something',
      backToSite: 'Back to site',
      noInvoices: 'No invoices yet. Your first one appears after payment is confirmed.',
    },

    footer: {
      blurb: 'eZentix Labs is a software company in Budbud (Bud Bud), Purba Bardhaman, West Bengal — Zen OS billing software, websites, e-commerce, social media, branding and content for shops and small businesses.',
      cta: 'Start a conversation',
      exploreTitle: 'Explore',
      reachTitle: 'Reach us',
      followTitle: 'Follow us',
      where: 'Budbud, West Bengal — working with businesses across the district and remotely beyond it.',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'How it works', href: '#how' },
        { label: 'Zen OS', href: '#zen-os' },
        { label: 'Client Work', href: '#work' },
        { label: 'Contact', href: '#talk' },
      ],
      rights: '© 2026 eZentix Labs. All rights reserved.',
      note: '',
      webfont: 'Bengali display type — Lipighor',
      webfontUrl: 'https://lipighor.com',
    },
  },

  /* ------------------------------------------------------------------ */
  bn: {
    dir: 'ltr',
    brand: 'eZentix Labs',
    location: 'বুদবুদ, পশ্চিমবঙ্গ',

    nav: {
      sections: 'বিভাগ',
      menu: 'মেনু',
      signIn: 'সাইন ইন',
      signUp: 'শুরু করুন',
      portal: 'আমার অ্যাকাউন্ট',
      signOut: 'সাইন আউট',
      theme: 'থিম বদলান',
      language: 'ভাষা',
      soundOn: 'শব্দ চালু করুন',
      soundOff: 'শব্দ বন্ধ করুন',
    },

    hero: {
      kicker: 'eZentix Labs · বুদবুদ, পশ্চিমবঙ্গের সফটওয়্যার কোম্পানি',
      title: ['AI-এর শক্তিতে,', 'টেকনিক্যাল বিশেষজ্ঞদের পরামর্শে।'],
      sub: 'আপনার অফলাইন ব্যবসার বিশৃঙ্খলা আমরা গুছিয়ে দিই, আর *নির্বিঘ্নে* অনলাইনে নিয়ে যাই।',
      body: 'eZentix Labs আপনার দোকানের দরকারি সফটওয়্যার বানায় আর চালায় — বিলিং সিস্টেম, বুকিং, স্টক হিসাব — তারপর থেকে যায় আপনার অনলাইন উপস্থিতি সামলাতে আর ব্যবসার সিদ্ধান্তে পাশে থাকতে। হিসাব করবে মেশিন। খেয়াল রাখব আমরা।',
      ctaPrimary: 'কথা বলুন',
      ctaSecondary: 'ডেমো বুক করুন',
      waText: 'নমস্কার eZentix Labs — আমি একটা ব্যবসা চালাই, অনলাইনে যাওয়া নিয়ে কথা বলতে চাই।',
    },

    who: {
      eyebrow: 'যে এজেন্সি নিজে আপনার দোকানে এসে দাঁড়ায়',
      title: '*যে বানিয়েছে তাকেই পাবেন* — সাপোর্ট টিকিট নয়, ফোন কলও নয়।',
      body: 'আমরা এমন ব্যবসার সঙ্গে কাজ করি যেগুলো ইতিমধ্যেই চলছে, ভালোই চলছে — রেস্টুরেন্ট, ক্লিনিক, মিষ্টির দোকান — আর গোটা জিনিসটাকে অনলাইনে নিয়ে যাই, পাঁচজন আলাদা লোক না ধরে। আমরা বুদবুদে বসি, এই অঞ্চলেই কাজ করি। মাটিতে পা রেখে, কিউয়ের টিকিট নম্বর হয়ে নয়।',
    },

    what: {
      title: 'আমাদের পরিষেবাগুলো।',
      body: 'দোকানের যা যা দরকার, টিক দিয়ে দিন। নিচের সবকিছু তিনটে ভাগের কোনো একটায় পড়ে — কোনটায় পড়ে সেটা আপনার জানার দরকার নেই, সেটা আমাদের কাজ। এখানে কোনো দাম নেই, শুধু বলুন কী চান, বাকিটা আমরা বুঝিয়ে বলব।',
      pickCount: (n) => `${n}টা পরিষেবা বেছেছেন`,
      pickCta: 'এগুলোর জন্য দাম জানতে চাই',
      pickNone: 'এখনও কিছু বেছে নেননি — তাতেও চলবে, দেখতে থাকুন।',
      pillars: [
        {
          name: 'বিজনেস সফটওয়্যার',
          line: 'বানিয়ে দেওয়া বা তৈরি করা — যেটায় তাড়াতাড়ি চালু হবেন।',
          items: [
            'রেস্টুরেন্ট ও QSR-এ অর্ডার নেওয়া আর বিল করা (পয়েন্ট অফ সেল / POS)',
            'হাসপাতাল বা ক্লিনিকের রোগীর তথ্য আর অ্যাপয়েন্টমেন্ট সামলানো (HMS)',
            'হাতে গুনতে না হয়ে জানা কী কী স্টকে আছে (ইনভেন্টরি কন্ট্রোল)',
            'প্রতিটা কাস্টমারের হিসাব রেখে একটা স্ক্রিন থেকেই ব্যবসা চালানো (CRM / ERP)',
            'যেখান থেকে জিনিস অনলাইনে বেচা যায় (ই-কমার্স স্টোর)',
            'আপনার সিস্টেমের সঙ্গে জোড়া স্মার্ট ডিভাইস আর সেন্সর (IoT)',
          ],
        },
        {
          name: 'বিজনেস ইন্টেলিজেন্স ও গ্রোথ',
          line: 'যে পরামর্শের জন্য সাধারণত আলাদা টাকা লাগে, সেটা এর মধ্যেই।',
          items: [
            'আপনার নিজের ব্যবসার উপর শেখানো একটা AI অ্যাসিস্ট্যান্ট (AI এজেন্ট)',
            'নিজের বিক্রির ডেটা দেখে ঠিক কাদের কাছে বিজ্ঞাপন পৌঁছবে সেটা বার করা (ডেটা-ড্রিভেন টার্গেটিং)',
            'কাকে নেবেন, কতজন লাগবে — সেই সিদ্ধান্তে সাহায্য (স্টাফিং গাইডেন্স)',
            'কাগজপত্র গোছানো — ITR, GST, MSME, ট্রেড লাইসেন্স, ট্রেডমার্ক, FSSAI (কমপ্লায়েন্স)',
          ],
        },
        {
          name: 'ভাইরাল হওয়ার রাস্তা',
          line: 'যাতে লোকে পাশের দোকানের আগে আপনাকে খুঁজে পায়।',
          items: [
            'আপনার ইনস্টাগ্রাম, ফেসবুক আর রিলস চালানো (সোশ্যাল মিডিয়া ম্যানেজমেন্ট / SMO)',
            'কেউ Google-এ খুঁজলে আপনাকে দেখতে পাওয়া (SEO / লোকাল সার্চ)',
            'কাস্টমার টেনে আনার মতো পেইড বিজ্ঞাপন (ডিজিটাল মার্কেটিং)',
            'একটা ওয়েবসাইট, অনলাইন স্টোর, আর নিজের ওয়েব ঠিকানা (ডোমেন)',
          ],
        },
      ],
    },

    how: {
      title: 'সাইন আপ করার পর আসলে কী হয়।',
      steps: [
        {
          when: 'সপ্তাহ ১–২',
          name: 'ডিসকভারি',
          body: 'আমরা আপনার দোকানে বসে দেখি জিনিসটা আসলে কীভাবে চলে। টেমপ্লেট যা ধরে নেয় তা নয় — আসলে আপনার কীসের অভাব।',
        },
        {
          when: 'সাবস্ক্রিপশনের প্রথম দিন',
          name: 'হাতে কিছু একটা চালু পাবেন',
          body: 'হয় সফটওয়্যার, নয় ওয়ার্কফ্লো, নয় সিস্টেম — প্রথম দিনেই চালু অবস্থায় আপনার হাতে। আপনার জন্য বানানো, বা আমাদের তৈরি জিনিস বসিয়ে দেওয়া। যেটায় তাড়াতাড়ি চলবে।',
        },
        {
          when: 'চলতে থাকে, বাড়তি খরচ নেই',
          name: 'এজেন্সির পুরো অ্যাক্সেস, ফ্রি',
          body: 'আমরা যা জানি, সব জিজ্ঞেস করুন — সোশ্যাল, Google, বিজ্ঞাপন, ওয়েবসাইট, স্টক, লোক নেওয়া, GST। যতদিন আমাদের সঙ্গে আছেন, ফ্রি। আমাদের দিয়ে করিয়ে নিতে চান? সেটা আলাদা খরচ, দাম আগেই বলে দেব।',
        },
        {
          when: 'যতদিন চান',
          name: 'একসঙ্গে বড় হই',
          body: 'যত বড় হবেন, তত বেশি কাজ আপনার ঘাড় থেকে আমরা নামাব — আরও বড় সিস্টেম, আরও ধারালো পরামর্শ, আসল হিসেবের উপর দাঁড়ানো সিদ্ধান্ত। কেউ কেউ সাবস্ক্রিপশন ছাড়িয়ে যান। তখন আর ভেন্ডরের কথা হয় না — পার্টনারশিপের কথা হয়।',
        },
      ],
    },

    why: {
      title: 'পাঁচটা আলাদা ভেন্ডর সামলাবেন কেন, যখন একজনেই হয়ে যায়?',
      before: {
        label: 'সাধারণ যে রাস্তা',
        head: 'পাঁচটা ভেন্ডর, পাঁচটা সমস্যা',
        body: 'বিলিং সফটওয়্যারের জন্য একজন। ইনস্টাগ্রামের জন্য একজন ফ্রিল্যান্সার। Google লিস্টিং-এর জন্য আরেকজন। কমপ্লায়েন্সের জন্য অ্যাকাউন্ট্যান্ট। কেউ কারও সঙ্গে কথা বলে না, আর মাঝের প্রত্যেকটা ফাঁক ঘুরেফিরে আপনার ঘাড়েই এসে পড়ে।',
      },
      after: {
        label: 'Zen-এর রাস্তা',
        head: 'একটা সাবস্ক্রিপশন, একটাই যোগাযোগ',
        body: 'আপনার সফটওয়্যার, আপনার অনলাইন উপস্থিতি আর ব্যবসার পরামর্শ — এমন লোকেদের হাতে যারা আপনার দোকান কীভাবে চলে সেটা আগে থেকেই জানে, কারণ যে সিস্টেমে চলছে সেটা আমরাই বানিয়েছি।',
      },
    },

    pos: {
      eyebrow: 'আমাদের অনেক প্রোডাক্টের একটা — যেটা এখনই তৈরি',
      title: 'Zen OS',
      sub: 'গোটা দোকানের জন্য একটাই অপারেটিং সিস্টেম — বিলিং, অর্ডার, স্টক আর রিপোর্ট, সব এক জায়গায়।',
      body: 'Zen OS শুধু একটা বিলিং মেশিন নয়। বিলিং, অর্ডার নেওয়া, রান্নাঘরের টিকিট, স্টক, টেবিল ম্যানেজমেন্ট আর রোজকার রিপোর্ট — সব একটাই সিস্টেমে ঢুকে যায়, ফলে চারটে আলাদা জিনিসের বদলে গোটা দোকান একটা স্ক্রিন থেকে চলে। টেবিলেই অর্ডার। রান্নাঘরে টিকিট। WhatsApp-এ বিল। বাড়িতে বসেও ফোনে প্রতিটা টেবিল। এর সাবস্ক্রিপশন আলাদা, উপরে বেছে নেওয়া অন্য পরিষেবাগুলোর থেকে আলাদা — শুধু এটা দিয়ে শুরু করতে পারেন, আজই, বাকিটা যখন প্রস্তুত হবেন তখন যোগ করবেন।',
      featuresTitle: 'ভিতরে কী আছে',
      bizFilterLabel: 'আপনার ব্যবসা কী ধরনের?',
      pricingTitle: 'দোকানের সঙ্গে যেটা মেলে বেছে নিন',
      monthly: 'মাসিক',
      annual: 'বাৎসরিক',
      perMonth: '/মাস',
      perYear: '/বছর',
      billedAnnually: 'বছরে একবার',
      choose: 'বেছে নিন',
      popular: 'বেশিরভাগ রেস্টুরেন্ট এটাই নেয়',
      notIncluded: 'এই প্ল্যানে নেই',
      addOnsTitle: 'দরকার হলে যোগ করুন',
      limitsTitle: 'সীমা',
      floorTitle: 'লাইভ ফ্লোর ভিউ',
      floorSub: 'ফোন থেকে আপনার দোকান ঠিক এইরকম দেখায়।',
      free: 'ফাঁকা',
      occupied: 'চলছে',
      billed: 'বিল হয়েছে',
      annualNote: 'বছরে একবার দিলে দুই মাস আমাদের তরফ থেকে।',
    },

    founder: {
      label: 'যার সঙ্গে কথা বলবেন',
      name: 'সৌরভ দত্ত',
      role: 'ফাউন্ডার ও প্রিন্সিপাল কনসালট্যান্ট',
      body: 'সৌরভ গত এক দশক কাটিয়েছেন পৃথিবীর সবচেয়ে বড় কয়েকটা টেকনোলজি কোম্পানির ভিতরে — Tech Mahindra, Capgemini, LTIMindtree — সেখানে ব্যবসা কীভাবে চলবে তা গড়ে তুলেছেন, আর যে সিস্টেমের উপর তাদের রোজকার কাজ দাঁড়িয়ে থাকে সেগুলো বানিয়েছেন। eZentix Labs আছে সেই একই মানের কাজ সেইসব ব্যবসার কাছে পৌঁছে দিতে, যারা সাধারণত এসব পায় না — আর সেটা দোকানের বাজেটে, কোনো বড় কোম্পানির বাজেটে নয়।',
      quote: 'আমাকেই সরাসরি পাবেন। সাপোর্ট টিকিট নয় — ফোন।',
    },

    work: {
      eyebrow: 'আমাদের কাজ',
      title: 'ক্লায়েন্ট ওয়ার্কস',
      sub: 'একটা আসল দোকান, যে ঝামেলাটা পেয়েছিলাম, আর এখন সেখানে কী চলছে।',
      viewCta: 'পুরো গল্পটা দেখুন',
      case: 'কেস স্টাডি',
      problemLabel: 'সমস্যাটা কী ছিল',
      solutionLabel: 'আমরা কী বানালাম',
      coverAlt: 'কেস স্টাডির কভার',
      galleryLabel: 'যা বানিয়েছি — ছবিতে',
      close: 'বন্ধ করুন',
      items: [
        {
          id: 'hotel-khoai',
          client: 'Hotel খোয়াই',
          tagline:
            '২৮টা টেবিল আর ২৯৯টা পদের মেনুর রেস্তোরাঁ — অর্ডার, টেবিল, কিচেন, বিল, স্টক আর স্টাফ এখন এক স্ক্রিনে।',
          cover: '/work/hotel-khoai/cover.jpg',
          gallery: [
            { src: '/work/hotel-khoai/restaurant.webp', width: 960, height: 1280, alt: 'রাতের Hotel খোয়াই — আলো জ্বলা সাইনবোর্ড আর খাওয়ার জায়গা' },
            { src: '/work/hotel-khoai/orders.webp', width: 1600, height: 765, alt: 'Hotel খোয়াই-এ Zen OS-এর অর্ডার স্ক্রিন — বসার জায়গা অনুযায়ী টেবিল, নতুন অর্ডারের জন্য তৈরি' },
            { src: '/work/hotel-khoai/table-map.webp', width: 1600, height: 768, alt: 'Zen OS টেবিল ম্যানেজমেন্ট — ২৮টা টেবিল, ওয়াক-ইন লাইন আর টেবিলের QR কোড' },
            { src: '/work/hotel-khoai/menu.webp', width: 1600, height: 780, alt: 'Zen OS মেনু ম্যানেজার — ২৯টা ক্যাটাগরিতে ২৯৯টা আইটেম, "আজ শেষ" সুইচসহ' },
            { src: '/work/hotel-khoai/invoices.webp', width: 1600, height: 750, alt: 'Zen OS ইনভয়েস — প্রতিটা বিল, ক্যাশ না অনলাইন, আর দিনের মোট হিসেব' },
            { src: '/work/hotel-khoai/inventory.webp', width: 1600, height: 763, alt: 'Zen OS ইনভেন্টরি — কেনাকাটা, নষ্ট হওয়া মাল, স্টক গোনা আর খাবারের খরচ' },
            { src: '/work/hotel-khoai/staff.webp', width: 1600, height: 768, alt: 'Zen OS স্টাফ রেকর্ড — প্রত্যেক ওয়েটারের ডিউটি, অর্ডার, হাজিরা আর বেতন' },
          ],
          problem:
            'Hotel খোয়াই-তে অতিথিরা বসেন চারটে জায়গায় — ইনডোর, এসি, গার্ডেন আর গাজেবো — সব মিলিয়ে ২৮টা টেবিল, প্রায় ৩০০ পদের মেনু আর আটজনের ফ্লোর টিম। এত বড় জায়গায় অর্ডার প্যাড, ক্যালকুলেটর আর মনে রাখার ওপর ভরসা করে আর চলে না: কে কী অর্ডার দিয়েছে তা মেলাতে গিয়ে টেবিলকে অপেক্ষা করতে হয়, দিনের শেষে ক্যাশ আর UPI হাতে মেলাতে হয়, আর কিচেনে কী ফুরিয়ে আসছে তা ফুরিয়ে যাওয়ার আগে কেউ বলতে পারে না।',
          solution:
            'আমরা পুরো রেস্তোরাঁটা Zen OS-এ তুলে দিয়েছি। অর্ডার নেওয়া হয় লাইভ টেবিল ম্যাপ থেকে, তাই ফ্লোর আর কাউন্টার একই জিনিস দেখে। পুরো মেনু — ২৯টা ক্যাটাগরিতে ২৯৯টা আইটেম — এক জায়গা থেকে চালানো হয়, আর যেকোনো পদ এক ট্যাপে বন্ধ বা "আজ শেষ" করে দেওয়া যায়। প্রতিটা বিল কীভাবে পেমেন্ট হল সেটা সহ রেকর্ড হয়, আর দিন বন্ধ হয় ক্যাশ ও অনলাইনের এমন হিসেবে যা মিলে যায়। স্টক, কেনাকাটা আর নষ্ট হওয়া মাল একই সিস্টেমে ট্র্যাক হয়, আর প্রত্যেক ওয়েটারের শিফট, অর্ডার আর বেতনের নিজস্ব হিসেব থাকে।',
        },
      ],
    },

    lead: {
      title: 'বলুন আপনি কী চালান।',
      sub: 'আমরা বলব তাতে কী দরকার। কথা বলার জন্য কোনো টাকা লাগে না।',
      name: 'আপনার নাম',
      business: 'ব্যবসার নাম',
      type: 'কী ধরনের ব্যবসা',
      types: ['রেস্টুরেন্ট বা ক্যাফে', 'মিষ্টির দোকান বা বেকারি', 'ক্লিনিক বা ডায়াগনস্টিক', 'খুচরো দোকান', 'অন্য কিছু'],
      phone: 'ফোন বা WhatsApp নম্বর',
      message: 'এই মুহূর্তে সবচেয়ে বড় সমস্যা কী?',
      submit: 'পাঠিয়ে দিন',
      sending: 'পাঠানো হচ্ছে…',
      formTitle: 'কথা শুরু করুন',
      formSub: 'এটুকু ভরে দিন, আমরা ফোন করে নেব। এক মিনিটের ব্যাপার।',
      privacy: 'আপনার তথ্য শুধু আপনার সঙ্গে যোগাযোগ করতেই ব্যবহার হয়। কোনো লিস্ট নয়, স্প্যাম নয়।',
      optional: 'ইচ্ছে হলে',
      done: 'পেয়েছি। দুই কাজের দিনের মধ্যে ফোন করব।',
      error: 'পাঠানো গেল না। বদলে +৯১ ৮৪৩৬২ ৯৯৩২০ নম্বরে ফোন করুন।',
      required: 'এটা লিখুন',
      badPhone: '১০ সংখ্যার নম্বর দিন',
    },

    contact: {
      title: 'যোগাযোগ করুন',
      body: 'আপনি রেস্টুরেন্ট চালান, ক্লিনিক, দোকান, বা এমন কিছু যা এগুলোর কোনোটাতেই পড়ে না — লিখুন, ফোন করুন, বা WhatsApp করুন। আমরা একটা ডিসকভারি বৈঠক ঠিক করে নেব।',
      email: 'ইমেল করুন',
      call: 'ফোন করুন',
      whatsapp: 'WhatsApp',
      adminLabel: 'অ্যাডমিন',
      supportLabel: 'সাপোর্ট',
      phoneLabel: 'ফোন',
      addressLabel: 'ঠিকানা',
      address: 'বুদবুদ, পশ্চিমবঙ্গ — ৭১৩৪০৩',
    },

    auth: {
      signInTitle: 'অ্যাকাউন্টে সাইন ইন করুন',
      signUpTitle: 'অ্যাকাউন্ট তৈরি করুন',
      signInSub: 'কী কী নিয়েছেন, ইনভয়েস আর রিনিউয়ালের তারিখ দেখুন।',
      signUpSub: 'ইতিমধ্যেই eZentix Labs-র গ্রাহক? এখানে লগইন বানিয়ে নিন।',
      email: 'ইমেল ঠিকানা',
      password: 'পাসওয়ার্ড',
      businessName: 'ব্যবসার নাম',
      submitIn: 'সাইন ইন',
      submitUp: 'অ্যাকাউন্ট তৈরি করুন',
      toggleToUp: 'নতুন? অ্যাকাউন্ট তৈরি করুন',
      toggleToIn: 'অ্যাকাউন্ট আছে? সাইন ইন করুন',
      demoNote: 'ডেমো লগইন — demo@charubala.com / demo1234',
      close: 'বন্ধ করুন',
    },

    portal: {
      greeting: 'আবার স্বাগতম',
      subtitle: 'যা যা নিয়েছেন, সব এক জায়গায়।',
      opted: 'আপনি যা নিয়েছেন',
      currentPurchase: 'বর্তমান সাবস্ক্রিপশন',
      plan: 'প্ল্যান',
      status: 'অবস্থা',
      active: 'চালু',
      startedOn: 'শুরু',
      renewsOn: 'রিনিউ',
      daysLeft: 'দিন বাকি',
      amount: 'টাকা',
      openPos: 'Zen OS খুলুন',
      openPosSub: 'আপনার লাইভ বিলিং ড্যাশবোর্ডে নিয়ে যাবে',
      quickLinks: 'দ্রুত লিঙ্ক',
      invoices: 'ইনভয়েস',
      invoiceNo: 'ইনভয়েস',
      date: 'তারিখ',
      paid: 'দেওয়া হয়েছে',
      pending: 'বাকি',
      download: 'ডাউনলোড',
      addOnsHeld: 'আপনার অ্যাকাউন্টে অ্যাড-অন',
      support: 'কিছু দরকার?',
      supportBody: 'এজেন্সির পুরো অ্যাক্সেস আপনার সাবস্ক্রিপশনেরই অংশ। তালিকার যেকোনো জিনিস চান — মার্কেটিং, Google, লোক নেওয়া, GST — কোনো বাড়তি খরচ নেই।',
      raiseRequest: 'কিছু চান',
      backToSite: 'সাইটে ফিরুন',
      noInvoices: 'এখনও কোনো ইনভয়েস নেই। পেমেন্ট নিশ্চিত হলে প্রথমটা আসবে।',
    },

    footer: {
      blurb: 'eZentix Labs — বুদবুদ, পূর্ব বর্ধমান, পশ্চিমবঙ্গের একটি সফটওয়্যার কোম্পানি। দোকান আর ছোট ব্যবসার জন্য শুরু থেকে শেষ পর্যন্ত অনলাইন সমাধান — বিলিং সফটওয়্যার, ওয়েবসাইট, ই-কমার্স, সোশ্যাল মিডিয়া, ব্র্যান্ডিং আর কনটেন্ট।',
      cta: 'কথা শুরু করুন',
      exploreTitle: 'ঘুরে দেখুন',
      reachTitle: 'যোগাযোগ',
      followTitle: 'আমাদের ফলো করুন',
      where: 'বুদবুদ, পশ্চিমবঙ্গ — গোটা জেলার ব্যবসার সঙ্গে কাজ করি, তার বাইরেও দূর থেকে।',
      links: [
        { label: 'পরিষেবা', href: '#services' },
        { label: 'কীভাবে চলে', href: '#how' },
        { label: 'Zen OS', href: '#zen-os' },
        { label: 'ক্লায়েন্ট ওয়ার্ক', href: '#work' },
        { label: 'যোগাযোগ', href: '#talk' },
      ],
      note: '',
      rights: '© ২০২৬ eZentix Labs। সর্বস্বত্ব সংরক্ষিত।',
      webfont: 'বাংলা ফন্ট — লিপিঘর',
      webfontUrl: 'https://lipighor.com',
    },
  },

  /* ------------------------------------------------------------------ */
  hi: {
    dir: 'ltr',
    brand: 'eZentix Labs',
    location: 'बुदबुद, पश्चिम बंगाल',

    nav: {
      sections: 'अनुभाग',
      menu: 'मेनू',
      signIn: 'साइन इन',
      signUp: 'शुरू करें',
      portal: 'मेरा खाता',
      signOut: 'साइन आउट',
      theme: 'थीम बदलें',
      language: 'भाषा',
      soundOn: 'आवाज़ चालू करें',
      soundOff: 'आवाज़ बंद करें',
    },

    hero: {
      kicker: 'eZentix Labs · बुदबुद, पश्चिम बंगाल की सॉफ्टवेयर कंपनी',
      title: ['AI की ताकत से,', 'तकनीकी विशेषज्ञों की सलाह से।'],
      sub: 'आपके ऑफलाइन कारोबार की अस्त-व्यस्तता हम सुलझाते हैं, और आपको *सहजता से* ऑनलाइन ले जाते हैं।',
      body: 'eZentix Labs आपकी दुकान के लिए ज़रूरी सॉफ्टवेयर बनाता और चलाता है — बिलिंग सिस्टम, बुकिंग, स्टॉक का हिसाब — और फिर आपकी ऑनलाइन मौजूदगी संभालने और कारोबारी फैसलों में साथ देने के लिए बना रहता है। गिनती मशीन करेगी। ध्यान हम रखेंगे।',
      ctaPrimary: 'बात करें',
      ctaSecondary: 'डेमो बुक करें',
      waText: 'नमस्ते eZentix Labs — मैं एक कारोबार चलाता हूँ और ऑनलाइन जाने के बारे में बात करना चाहता हूँ।',
    },

    who: {
      eyebrow: 'ऐसी एजेंसी जो खुद आपकी दुकान पर आती है',
      title: '*जिसने बनाया है वही मिलेगा* — सपोर्ट टिकट नहीं, फोन कॉल भी नहीं।',
      body: 'हम उन कारोबारों के साथ काम करते हैं जो पहले से चल रहे हैं और व्यस्त हैं — रेस्टोरेंट, क्लिनिक, मिठाई की दुकान — और पूरी चीज़ को ऑनलाइन ले जाते हैं, बिना आपको पाँच अलग-अलग वेंडर रखने पड़े। हम बुदबुद में बैठते हैं और इसी इलाके में काम करते हैं। ज़मीन पर पैर रखकर, कतार का टिकट नंबर बनकर नहीं।',
    },

    what: {
      title: 'हमारी सेवाएँ।',
      body: 'दुकान को जो चाहिए उस पर टिक कर दें। नीचे की हर चीज़ इन तीन समूहों में से किसी एक में आती है — किसमें आती है यह जानने की ज़रूरत नहीं, वह हमारा काम है। यहाँ कोई कीमत नहीं है, बस बताइए क्या चाहिए, बाकी हम समझा देंगे।',
      pickCount: (n) => `${n} सेवाएँ चुनी गईं`,
      pickCta: 'इनकी कीमत जानना चाहते हैं',
      pickNone: 'अभी कुछ नहीं चुना — कोई बात नहीं, आगे देखते रहिए।',
      pillars: [
        {
          name: 'बिज़नेस सॉफ्टवेयर',
          line: 'बनाकर दिया या तैयार — जिससे आप जल्दी चालू हो जाएँ।',
          items: [
            'रेस्टोरेंट और QSR में ऑर्डर लेना और बिल बनाना (पॉइंट ऑफ सेल / POS)',
            'अस्पताल या क्लिनिक में मरीज़ का रिकॉर्ड और अपॉइंटमेंट संभालना (HMS)',
            'हाथ से गिनने की जगह जानना स्टॉक में क्या है (इन्वेंटरी कंट्रोल)',
            'हर ग्राहक का हिसाब रखकर एक ही स्क्रीन से कारोबार चलाना (CRM / ERP)',
            'जहाँ से सामान ऑनलाइन बेचा जा सके (ई-कॉमर्स स्टोर)',
            'आपके सिस्टम से जुड़े स्मार्ट डिवाइस और सेंसर (IoT)',
          ],
        },
        {
          name: 'बिज़नेस इंटेलिजेंस और ग्रोथ',
          line: 'जिस सलाह के आम तौर पर अलग पैसे लगते हैं, वह इसी में।',
          items: [
            'आपके अपने कारोबार पर सिखाया गया AI असिस्टेंट (AI एजेंट)',
            'अपने बिक्री डेटा से सही ग्राहकों तक विज्ञापन पहुँचाना (डेटा-ड्रिवन टारगेटिंग)',
            'किसे रखें, कितने लोग चाहिए — इस फैसले में मदद (स्टाफिंग गाइडेंस)',
            'कागज़ी काम निपटाना — ITR, GST, MSME, ट्रेड लाइसेंस, ट्रेडमार्क, FSSAI (कम्प्लायंस)',
          ],
        },
        {
          name: 'वायरल होने का रास्ता',
          line: 'ताकि लोग बगल की दुकान से पहले आपको ढूँढें।',
          items: [
            'आपका इंस्टाग्राम, फेसबुक और रील्स चलाना (सोशल मीडिया मैनेजमेंट / SMO)',
            'कोई Google पर खोजे तो आप दिखें (SEO / लोकल सर्च)',
            'ग्राहक खींचने वाले पेड विज्ञापन (डिजिटल मार्केटिंग)',
            'एक वेबसाइट, ऑनलाइन स्टोर, और अपना वेब पता (डोमेन)',
          ],
        },
      ],
    },

    how: {
      title: 'साइन अप करने के बाद असल में क्या होता है।',
      steps: [
        {
          when: 'हफ्ता १–२',
          name: 'डिस्कवरी',
          body: 'हम आपकी दुकान में बैठकर देखते हैं कि यह असल में कैसे चलती है। टेम्पलेट जो मान लेता है वह नहीं — असल में आपको किस चीज़ की कमी है।',
        },
        {
          when: 'सब्सक्रिप्शन का पहला दिन',
          name: 'हाथ में कुछ चालू मिलेगा',
          body: 'या तो सॉफ्टवेयर, या वर्कफ्लो, या सिस्टम — पहले ही दिन चालू हालत में आपके हाथ में। आपके लिए बनाया हुआ, या हमारे पास तैयार से लगाया हुआ। जिससे जल्दी चलें।',
        },
        {
          when: 'लगातार, कोई अतिरिक्त खर्च नहीं',
          name: 'एजेंसी का पूरा एक्सेस, मुफ्त',
          body: 'हम जो जानते हैं, सब पूछिए — सोशल, Google, विज्ञापन, वेबसाइट, स्टॉक, भर्ती, GST। जब तक आप हमारे साथ हैं, मुफ़्त। चाहते हैं हम करके भी दें? उसका अलग खर्च, कीमत पहले ही बता देंगे।',
        },
        {
          when: 'जब तक आप चाहें',
          name: 'साथ में बढ़ते हैं',
          body: 'आप जितना बड़े होंगे, उतना ज़्यादा काम हम आपके कंधे से उतारेंगे — भारी सिस्टम, पैनी सलाह, असली आँकड़ों पर टिके फैसले। कुछ कारोबार सब्सक्रिप्शन से आगे निकल जाते हैं। तब बात वेंडर की नहीं, साझेदारी की होती है।',
        },
      ],
    },

    why: {
      title: 'पाँच अलग-अलग वेंडर क्यों संभालें, जब एक से ही काम चल जाए?',
      before: {
        label: 'आम तरीका',
        head: 'पाँच वेंडर, पाँच समस्याएँ',
        body: 'बिलिंग सॉफ्टवेयर के लिए एक वेंडर। इंस्टाग्राम के लिए एक फ्रीलांसर। Google लिस्टिंग के लिए कोई और। कम्प्लायंस के लिए अकाउंटेंट। कोई किसी से बात नहीं करता, और बीच का हर खाली हिस्सा घूम-फिरकर आपकी ही मेज़ पर आता है।',
      },
      after: {
        label: 'Zen का तरीका',
        head: 'एक सब्सक्रिप्शन, एक ही संपर्क',
        body: 'आपका सॉफ्टवेयर, आपकी ऑनलाइन मौजूदगी और कारोबारी सलाह — उन लोगों के हाथ में जो पहले से जानते हैं आपकी दुकान कैसे चलती है, क्योंकि जिस सिस्टम पर चल रही है वह हमने ही बनाया है।',
      },
    },

    pos: {
      eyebrow: 'हमारे कई प्रोडक्ट में से एक — जो अभी से तैयार है',
      title: 'Zen OS',
      sub: 'पूरी दुकान के लिए एक ही ऑपरेटिंग सिस्टम — बिलिंग, ऑर्डर, स्टॉक और रिपोर्ट, सब एक जगह।',
      body: 'Zen OS सिर्फ एक बिलिंग मशीन नहीं है। बिलिंग, ऑर्डर लेना, रसोई के टिकट, स्टॉक, टेबल मैनेजमेंट और रोज़ की रिपोर्ट — सब एक ही सिस्टम में आ जाते हैं, ताकि चार अलग-अलग चीज़ों की जगह पूरी दुकान एक स्क्रीन से चले। टेबल पर ही ऑर्डर। रसोई में टिकट। WhatsApp पर बिल। घर बैठे फोन पर हर टेबल। इसका सब्सक्रिप्शन अलग है, ऊपर चुनी गई बाकी सेवाओं से अलग — सिर्फ इसी से शुरू कर सकते हैं, आज ही, बाकी जब तैयार हों तब जोड़ लेंगे।',
      featuresTitle: 'अंदर क्या है',
      bizFilterLabel: 'आपका बिज़नेस किस तरह का है?',
      pricingTitle: 'जो दुकान से मेल खाए वह चुनें',
      monthly: 'मासिक',
      annual: 'सालाना',
      perMonth: '/माह',
      perYear: '/साल',
      billedAnnually: 'साल में एक बार',
      choose: 'चुनें',
      popular: 'ज़्यादातर रेस्टोरेंट यही लेते हैं',
      notIncluded: 'इस प्लान में नहीं',
      addOnsTitle: 'ज़रूरत पड़े तो जोड़ें',
      limitsTitle: 'सीमाएँ',
      floorTitle: 'लाइव फ्लोर व्यू',
      floorSub: 'फोन से आपकी दुकान ऐसी दिखती है।',
      free: 'खाली',
      occupied: 'चल रहा',
      billed: 'बिल हुआ',
      annualNote: 'सालाना दें तो दो महीने हमारी तरफ से।',
    },

    founder: {
      label: 'जिनसे आप बात करेंगे',
      name: 'सौरव दत्ता',
      role: 'फाउंडर और प्रिंसिपल कंसल्टेंट',
      body: 'सौरव ने पिछला दशक दुनिया की कुछ सबसे बड़ी टेक्नोलॉजी कंपनियों के भीतर बिताया है — Tech Mahindra, Capgemini, LTIMindtree — वहाँ उन्होंने कारोबार को आकार दिया और वे सिस्टम बनाए जिन पर इन कंपनियों का रोज़ का काम टिका होता है। eZentix Labs इसलिए है ताकि वही स्तर का काम उन कारोबारों तक भी पहुँचे जिन्हें यह आमतौर पर कभी नहीं मिलता — और वह भी दुकान के बजट में, किसी बड़ी कंपनी के बजट में नहीं।',
      quote: 'मुझसे सीधे बात होगी। सपोर्ट टिकट नहीं — फोन।',
    },

    work: {
      eyebrow: 'हमारा काम',
      title: 'क्लाइंट वर्क्स',
      sub: 'एक असली दुकान, जो गड़बड़ी हमें मिली, और अब वहाँ क्या चल रहा है।',
      viewCta: 'पूरी कहानी देखें',
      case: 'केस स्टडी',
      problemLabel: 'समस्या क्या थी',
      solutionLabel: 'हमने क्या बनाया',
      coverAlt: 'केस स्टडी कवर',
      galleryLabel: 'जो बनाया — तस्वीरों में',
      close: 'बंद करें',
      items: [
        {
          id: 'hotel-khoai',
          client: 'Hotel Khoai',
          tagline:
            '28 टेबल और 299 डिश वाले मेनू का रेस्टोरेंट — ऑर्डर, टेबल, किचन, बिल, स्टॉक और स्टाफ अब एक ही स्क्रीन पर।',
          cover: '/work/hotel-khoai/cover.jpg',
          gallery: [
            { src: '/work/hotel-khoai/restaurant.webp', width: 960, height: 1280, alt: 'रात में Hotel Khoai — रोशन साइनबोर्ड और खाने की जगह' },
            { src: '/work/hotel-khoai/orders.webp', width: 1600, height: 765, alt: 'Hotel Khoai में Zen OS ऑर्डर स्क्रीन — बैठने की जगह के हिसाब से टेबल, नए ऑर्डर के लिए तैयार' },
            { src: '/work/hotel-khoai/table-map.webp', width: 1600, height: 768, alt: 'Zen OS टेबल मैनेजमेंट — 28 टेबल, वॉक-इन कतार और टेबल के QR कोड' },
            { src: '/work/hotel-khoai/menu.webp', width: 1600, height: 780, alt: 'Zen OS मेनू मैनेजर — 29 कैटेगरी में 299 आइटम, "आज खत्म" स्विच के साथ' },
            { src: '/work/hotel-khoai/invoices.webp', width: 1600, height: 750, alt: 'Zen OS इनवॉइस — हर बिल, कैश या ऑनलाइन भुगतान, और दिन का कुल हिसाब' },
            { src: '/work/hotel-khoai/inventory.webp', width: 1600, height: 763, alt: 'Zen OS इन्वेंटरी — खरीद, बर्बादी, स्टॉक गिनती और खाने की लागत' },
            { src: '/work/hotel-khoai/staff.webp', width: 1600, height: 768, alt: 'Zen OS स्टाफ रिकॉर्ड — हर वेटर की ड्यूटी, ऑर्डर, हाज़िरी और वेतन' },
          ],
          problem:
            'Hotel Khoai में मेहमान चार जगह बैठते हैं — इनडोर, एसी, गार्डन और गज़ेबो — कुल 28 टेबल, लगभग 300 डिश का मेनू और आठ लोगों की फ्लोर टीम। इतने बड़े पैमाने पर ऑर्डर पैड, कैलकुलेटर और याददाश्त से काम नहीं चलता: किसने क्या ऑर्डर किया यह मिलाने में टेबल को इंतज़ार करना पड़ता है, दिन का कैश और UPI हाथ से मिलाना पड़ता है, और किचन में क्या खत्म होने वाला है यह खत्म होने से पहले कोई नहीं बता पाता।',
          solution:
            'हमने पूरा रेस्टोरेंट Zen OS पर चला दिया। ऑर्डर लाइव टेबल मैप से लिए जाते हैं, इसलिए फ्लोर और काउंटर एक ही चीज़ देखते हैं। पूरा मेनू — 29 कैटेगरी में 299 आइटम — एक जगह से संभाला जाता है, और किसी भी डिश को एक टैप में बंद या "आज खत्म" किया जा सकता है। हर बिल इस जानकारी के साथ दर्ज होता है कि भुगतान कैसे हुआ, और दिन कैश और ऑनलाइन के ऐसे हिसाब के साथ बंद होता है जो मिलता है। स्टॉक, खरीद और बर्बादी उसी सिस्टम में ट्रैक होते हैं, और हर वेटर की शिफ्ट, ऑर्डर और वेतन का अपना रिकॉर्ड रहता है।',
        },
      ],
    },

    lead: {
      title: 'बताइए आप क्या चलाते हैं।',
      sub: 'हम बताएँगे उसमें क्या चाहिए। बात करने का कोई पैसा नहीं।',
      name: 'आपका नाम',
      business: 'कारोबार का नाम',
      type: 'किस तरह का कारोबार',
      types: ['रेस्टोरेंट या कैफे', 'मिठाई की दुकान या बेकरी', 'क्लिनिक या डायग्नोस्टिक', 'खुदरा दुकान', 'कुछ और'],
      phone: 'फोन या WhatsApp नंबर',
      message: 'इस वक्त सबसे बड़ी अड़चन क्या है?',
      submit: 'भेज दीजिए',
      sending: 'भेजा जा रहा है…',
      formTitle: 'बातचीत शुरू करें',
      formSub: 'इतना भर दीजिए, हम आपको कॉल कर लेंगे। एक मिनट लगेगा।',
      privacy: 'आपकी जानकारी सिर्फ आपसे संपर्क करने के लिए इस्तेमाल होती है। कोई लिस्ट नहीं, कोई स्पैम नहीं।',
      optional: 'वैकल्पिक',
      done: 'मिल गया। दो कामकाजी दिनों में फोन करेंगे।',
      error: 'यह नहीं गया। इसके बजाय +91 84362 99320 पर फोन करें।',
      required: 'यह भरें',
      badPhone: '१० अंकों का नंबर डालें',
    },

    contact: {
      title: 'संपर्क करें',
      body: 'आप रेस्टोरेंट चलाते हों, क्लिनिक, दुकान, या ऐसा कुछ जो इनमें से किसी में न आए — लिखिए, फोन कीजिए, या WhatsApp कीजिए। हम एक डिस्कवरी बातचीत तय कर लेंगे।',
      email: 'ईमेल करें',
      call: 'फोन करें',
      whatsapp: 'WhatsApp',
      adminLabel: 'एडमिन',
      supportLabel: 'सपोर्ट',
      phoneLabel: 'फोन',
      addressLabel: 'पता',
      address: 'बुदबुद, पश्चिम बंगाल — ७१३४०३',
    },

    auth: {
      signInTitle: 'अपने खाते में साइन इन करें',
      signUpTitle: 'अपना खाता बनाएँ',
      signInSub: 'देखें आपने क्या लिया है, इनवॉइस और रिन्यूअल की तारीख।',
      signUpSub: 'पहले से eZentix Labs के ग्राहक हैं? यहाँ लॉगिन बना लें।',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      businessName: 'कारोबार का नाम',
      submitIn: 'साइन इन',
      submitUp: 'खाता बनाएँ',
      toggleToUp: 'नए हैं? खाता बनाएँ',
      toggleToIn: 'खाता है? साइन इन करें',
      demoNote: 'डेमो लॉगिन — demo@charubala.com / demo1234',
      close: 'बंद करें',
    },

    portal: {
      greeting: 'फिर से स्वागत है',
      subtitle: 'आपने जो लिया है, सब एक जगह।',
      opted: 'आपने क्या लिया',
      currentPurchase: 'मौजूदा सब्सक्रिप्शन',
      plan: 'प्लान',
      status: 'स्थिति',
      active: 'चालू',
      startedOn: 'शुरू',
      renewsOn: 'रिन्यू',
      daysLeft: 'दिन बाकी',
      amount: 'रकम',
      openPos: 'Zen OS खोलें',
      openPosSub: 'आपके लाइव बिलिंग डैशबोर्ड पर ले जाएगा',
      quickLinks: 'त्वरित लिंक',
      invoices: 'इनवॉइस',
      invoiceNo: 'इनवॉइस',
      date: 'तारीख',
      paid: 'भुगतान हुआ',
      pending: 'बाकी',
      download: 'डाउनलोड',
      addOnsHeld: 'आपके खाते में ऐड-ऑन',
      support: 'कुछ चाहिए?',
      supportBody: 'एजेंसी का पूरा एक्सेस आपके सब्सक्रिप्शन का हिस्सा है। सूची में से कुछ भी माँगिए — मार्केटिंग, Google, भर्ती, GST — कोई अतिरिक्त खर्च नहीं।',
      raiseRequest: 'कुछ माँगें',
      backToSite: 'साइट पर वापस',
      noInvoices: 'अभी कोई इनवॉइस नहीं। भुगतान पक्का होने पर पहला आएगा।',
    },

    footer: {
      blurb: 'eZentix Labs — बुदबुद, पूर्व बर्धमान, पश्चिम बंगाल की एक सॉफ्टवेयर कंपनी। दुकानों और छोटे कारोबारों के लिए शुरू से आखिर तक ऑनलाइन समाधान — बिलिंग सॉफ्टवेयर, वेबसाइट, ई-कॉमर्स, सोशल मीडिया, ब्रांडिंग और कंटेंट।',
      cta: 'बातचीत शुरू करें',
      exploreTitle: 'देखें',
      reachTitle: 'संपर्क',
      followTitle: 'हमें फॉलो करें',
      where: 'बुदबुद, पश्चिम बंगाल — पूरे ज़िले के कारोबारों के साथ, और उससे आगे दूर से भी।',
      links: [
        { label: 'सेवाएँ', href: '#services' },
        { label: 'कैसे चलता है', href: '#how' },
        { label: 'Zen OS', href: '#zen-os' },
        { label: 'क्लाइंट वर्क', href: '#work' },
        { label: 'संपर्क', href: '#talk' },
      ],
      note: '',
      rights: '© २०२६ eZentix Labs। सर्वाधिकार सुरक्षित।',
      webfont: 'Bengali display type — Lipighor',
      webfontUrl: 'https://lipighor.com',
    },
  },
}

/* Our social accounts. Platform names and handles do not translate, so one
   list serves every language. Add an account here and it shows up in the
   footer icons, as a card in the contact section, and in the JSON-LD
   sameAs list that ties the accounts to the site for Google
   (vite.config.js). `label` picks the icon in Contact.jsx. Real profile
   URLs only — a bare platform homepage is not a profile. */
export const SOCIAL = [
  { label: 'Instagram', handle: '@ezentix', href: 'https://www.instagram.com/ezentix/' },
]

export const CONTACT = {
  phone: '+918436299320',
  phoneDisplay: '+91 84362 99320',
  whatsapp: '918436299320',
  admin: 'admin@ezentix.com',
  support: 'support@ezentix.com',
  posUrl: 'https://pos.charubalainc.com',
}
