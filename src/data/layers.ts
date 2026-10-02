/**
 * LAYERS OF PROTECTION
 * Used by the home page and the Water Safety page.
 * Every claim here should trace back to a source in docs/RESEARCH.md.
 */
export interface Layer {
  id: string;
  title: string;
  short: string;
  body: string[];
  tips: string[];
  /** Shown under the tips on the Water Safety page. */
  sources?: { name: string; url: string }[];
  /** Our family's own words about this layer, shown on the Water Safety page. Quote them exactly. */
  family?: { quote: string; by: string; link?: { href: string; text: string } };
}

const CPSC_BARRIERS = {
  name: 'CPSC Safety Barrier Guidelines for Residential Pools',
  url: 'https://www.cpsc.gov/s3fs-public/pdfs/blk_media_SafetyBarrierGuidelinesResPools.pdf',
};
const AAP_2026 = {
  name: 'American Academy of Pediatrics, 2026',
  url: 'https://www.healthychildren.org/English/news/Pages/AAP-releases-updated-drowning-prevention-recommendations.aspx',
};

export const layers: Layer[] = [
  {
    id: 'supervision',
    title: 'Supervision: be the Water Watcher',
    short: 'One adult, eyes on the water, no distractions.',
    body: [
      'Drowning is fast and silent. There is usually no splashing and no calling for help, which is why “everyone watching” so often means no one is.',
      'Name one adult as the Water Watcher. For young children and weak swimmers, that person stays within arm’s reach: close enough to touch. Phones go down, conversations wait, and the Water Watcher tag is handed to the next adult every 15 minutes.',
    ],
    tips: [
      'Use a Water Watcher tag or lanyard so everyone knows who’s on duty.',
      'Stay within arm’s reach of toddlers, even when they wear a flotation device.',
      'Keep watching during breaks and cleanup, not just “swim time.”',
      'No alcohol, phones or books while you’re the Water Watcher.',
    ],
    sources: [AAP_2026, { name: 'Safe Kids Worldwide', url: 'https://www.safekids.org/tip/swimming-safety-tips' }],
    family: {
      quote:
        'Do whatever you can to keep your eyes on children that cannot swim, especially during parties. … Even for very good parents, there are no do-overs.',
      by: 'Our mom, Shannon, July 4, 2019',
    },
  },
  {
    id: 'barriers',
    title: 'Barriers: fence the pool on all four sides',
    short: 'A fence that separates the pool from the house and yard.',
    body: [
      'We didn’t want a fence blocking our view of the pool. A lot of families don’t. But toddlers slip out of the house and reach the water in seconds, usually when nobody knows they’re gone, and a fence is the one layer that doesn’t need anyone to remember it. It would have stood between Adam and the water.',
      'An isolation fence surrounds the pool on all four sides and separates it from the house. Pool safety guidance calls for a fence at least 4 feet tall, hard to climb, with a gate that closes and latches by itself.',
    ],
    tips: [
      'Fence all four sides. The house should not be one of the sides.',
      'Use gates that self-close and self-latch, open outward away from the pool, and latch at least 54 inches high.',
      'Choose a fence at least 4 feet tall with gaps no wider than 4 inches.',
      'Never prop the gate open.',
      'Keep chairs, toys and planters away from the fence so children can’t climb them.',
    ],
    sources: [CPSC_BARRIERS, AAP_2026],
    family: {
      quote: 'ISR not available. Too young to swim. Without a four-sided fence, he didn’t stand a chance.',
      by: 'Our mom, Shannon, in “The Color of Love,” June 2018',
      link: { href: '/news/2018-06-04-the-color-of-love', text: 'Read the poem' },
    },
  },
  {
    id: 'alarms',
    title: 'Alarms: know the moment something changes',
    short: 'Door, gate and pool alarms buy you seconds.',
    body: [
      'Children are curious and fast. A door alarm tells you the second a door to the pool area opens. A pool alarm tells you when something enters the water.',
      'Alarms have blind spots. Ours went quiet when a door was pulled almost shut but never latched. And alarms only help when they’re on, so keep them on during parties, holidays and houses full of guests, exactly when you need them most.',
    ],
    tips: [
      'Put alarms on every door and window that opens toward the pool. Code-compliant door alarms (UL 2017) sound within seconds of the door opening.',
      'In Pennsylvania, building code still lets the house be one side of the pool barrier if doors to the pool have alarms (or the pool has a certified safety cover). A four-sided fence is safer.',
      'Add a pool alarm or a wearable wristband alarm as an extra layer.',
      'Test every door alarm with the door pulled almost shut, not just wide open, and keep spare batteries on hand.',
      'Make “alarms stay on” a house rule, especially when you have guests.',
    ],
    sources: [
      CPSC_BARRIERS,
      {
        name: 'Pennsylvania Code § 403.26',
        url: 'https://www.pacodeandbulletin.gov/Display/pacode?file=%2Fsecure%2Fpacode%2Fdata%2F034%2Fchapter403%2Fs403.26.html',
      },
    ],
    family: {
      quote:
        'At the very least, a $250 floating pool sensor with alarms both outside and inside would have saved him. … I spent more than that on his crib blanket set.',
      by: 'Our mom, Shannon, March 2019',
    },
  },
  {
    id: 'covers',
    title: 'Covers & drains: close off the water',
    short: 'Safety covers, empty buckets, safe drains.',
    body: [
      'A properly installed safety cover, meaning a certified one and not a floating solar cover, adds another barrier when the pool isn’t being used.',
      'Small amounts of water are dangerous too. Empty kiddie pools, buckets and coolers after use, and keep bathroom doors and toilet lids closed around toddlers.',
    ],
    tips: [
      'Use a safety cover that meets the ASTM F1346 standard, and remove any standing water from its surface.',
      'Empty and flip inflatable pools after every use.',
      'Make sure pool and spa drains have anti-entrapment covers.',
      'Remove ladders from above-ground pools when they’re not being used.',
    ],
    sources: [CPSC_BARRIERS, { name: 'Pool Safely (CPSC)', url: 'https://www.poolsafely.gov/' }],
  },
  {
    id: 'skills',
    title: 'Swim skills: teach children, and adults too',
    short: 'Water competency for every age.',
    body: [
      'The American Academy of Pediatrics recommends swim lessons for children after their first birthday. Research suggests lessons lower the risk for young children, but they don’t make any child “drown-proof.”',
      'Adults need water skills too, both to keep themselves safe and to help someone else without becoming a second victim.',
    ],
    tips: [
      'Look for lessons that teach water competency: getting back to the wall, floating and turning.',
      'For babies and toddlers, we recommend ISR self-rescue lessons, which teach them to roll onto their backs and float, even fully dressed. Water play classes are fun, but they don’t teach a child what to do alone. Our Swim Lessons page can help you find an instructor.',
      'Children with autism or other disabilities can benefit from adaptive swim lessons.',
      'Practice in clothes and in different places (pool, lake, beach).',
      'Lessons add to supervision and barriers. They never replace them.',
    ],
    sources: [
      {
        name: 'American Academy of Pediatrics: swim lessons',
        url: 'https://www.healthychildren.org/English/safety-prevention/at-play/Pages/Swim-Lessons.aspx',
      },
    ],
  },
  {
    id: 'lifejackets',
    title: 'Life jackets: the right kind, every time',
    short: 'U.S. Coast Guard-approved, fitted and fastened.',
    body: [
      'Weak swimmers and young children should wear a U.S. Coast Guard-approved life jacket around open water, on boats and at the beach.',
      'Water wings, pool noodles and inner tubes are toys. They aren’t safety devices, and they can slip off.',
    ],
    tips: [
      'Check the label for U.S. Coast Guard approval and the right weight range.',
      'Fasten every strap. It should not ride up over the chin.',
      'Keep a life jacket on children at open-water outings, even on shore.',
    ],
    sources: [
      {
        name: 'U.S. Coast Guard Boating Safety',
        url: 'https://www.uscgboating.org/recreational-boaters/life-jacket-wear-wearing-your-life-jacket.php',
      },
    ],
    family: {
      quote:
        'If a layer of protection fails (supervision, gates, alarms, etc.), would your child know that the device was keeping them afloat, or would they jump in carefree and drown?',
      by: 'Our mom, Shannon, June 2023',
      link: { href: '/news/2023-06-21-puddle-jumpers', text: 'Read her whole post' },
    },
  },
  {
    id: 'emergency',
    title: 'Emergency ready: CPR and a plan',
    short: 'Learn CPR, keep a phone close, check the water first.',
    body: [
      'When a child is missing, check the water first: pools, spas, ponds, bathtubs. Seconds matter.',
      'Bystander CPR begun right away can make a life-saving difference while emergency crews are on the way. Our mom, Shannon, started CPR on Adam. Pops (our grandfather), our dad and the first responders all did CPR too.',
    ],
    tips: [
      'In an emergency, call 911. If a child is missing, check the water first.',
      'Take a CPR class that includes infant and child CPR, and renew it every two years. After a drowning, CPR with rescue breaths matters.',
      'Keep a charged phone and rescue equipment (a reaching pole and a ring buoy) at the pool.',
      'Post emergency numbers and your home address near the pool.',
      'Teach everyone in the house to check the water first.',
    ],
    sources: [AAP_2026, { name: 'American Red Cross: CPR classes', url: 'https://www.redcross.org/take-a-class/cpr' }],
  },
];
