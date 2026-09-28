/**
 * THE FACTS
 * Every number on the site comes from this file, with its source.
 *
 * Research date: September 2026. Figures were gathered from each source's
 * published text. Before launch, click every link and confirm the wording
 * (see docs/RESEARCH.md and the checklist in docs/LAUNCH-CHECKLIST.md).
 * Review every spring before National Water Safety Month (May), when CDC and
 * CPSC usually publish new data.
 */

export interface Fact {
  stat: string;
  label: string;
  detail?: string;
  source: string;
  sourceUrl: string;
}

const CDC_FACTS = 'https://www.cdc.gov/drowning/data-research/facts/index.html';
const CPSC_2026 =
  'https://www.cpsc.gov/Newsroom/News-Releases/2026/CPSC-Report-Highlights-Persistent-Risk-of-Childhood-Drowning';
const CPSC_BARRIERS = 'https://www.cpsc.gov/s3fs-public/pdfs/blk_media_SafetyBarrierGuidelinesResPools.pdf';

/** The big numbers on the home page. */
export const headline: Fact[] = [
  {
    stat: '#1',
    label: 'Drowning kills more children ages 1–4 than any other cause of death.',
    source: 'CDC',
    sourceUrl: CDC_FACTS,
  },
  {
    stat: '7',
    label: 'For every child who dies from drowning, another 7 get emergency care for a nonfatal drowning.',
    source: 'CDC',
    sourceUrl: CDC_FACTS,
  },
  {
    stat: '~80%',
    label: 'Nearly 4 in 5 children who die in pools and spas are younger than 5.',
    source: 'CPSC, 2026 report',
    sourceUrl: CPSC_2026,
  },
  {
    stat: '70%+',
    label:
      'More than 70% of child pool and spa drowning deaths happen at a home: their own, a relative’s, a friend’s or a neighbor’s.',
    source: 'CPSC, 2026 report',
    sourceUrl: CPSC_2026,
  },
];

/** Survivors & Families page. */
export const nonfatal: Fact[] = [
  {
    stat: '8,000+',
    label: 'Emergency department visits for nonfatal drowning in the U.S. each year (2012–2021 average).',
    source: 'CDC',
    sourceUrl: CDC_FACTS,
  },
  {
    stat: '~40%',
    label:
      'Nearly 4 in 10 drownings treated in emergency departments need hospital admission or transfer for more care, about 4 times the rate for all unintentional injuries.',
    source: 'CDC',
    sourceUrl: CDC_FACTS,
  },
  {
    stat: '5,900',
    label: 'Estimated ER-treated nonfatal pool and spa drowning injuries each year among children under 15 (2023–2025).',
    source: 'CPSC, 2026 report',
    sourceUrl: CPSC_2026,
  },
];

/** "When families are most at risk" cards on the Water Safety page. */
export const risks: { title: string; body: string; source?: string; sourceUrl?: string }[] = [
  {
    title: 'When they slip away',
    body: 'In a landmark CPSC study of young children who drowned in pools, 46% were last seen in the house, 69% weren’t expected to be at or in the pool, and 77% had been missing for 5 minutes or less.',
    source: 'CPSC Safety Barrier Guidelines (study data from the late 1980s)',
    sourceUrl: CPSC_BARRIERS,
  },
  {
    title: 'When the house is full',
    body: 'Parties, holidays and cookouts are when “everyone is watching,” so no one is. Doors get propped open, alarms get switched off, and a toddler can slip away without anyone noticing. Name a Water Watcher and keep every layer on.',
  },
  {
    title: 'At someone else’s home',
    body: 'Grandparents’, neighbors’ and friends’ pools count too. More than 70% of child pool and spa drowning deaths happen at a home, including the homes of family, friends and neighbors.',
    source: 'CPSC, 2026 report',
    sourceUrl: CPSC_2026,
  },
  {
    title: 'In the bathtub',
    body: 'Babies under 1 most often drown in bathtubs. Young children can drown in just an inch or two of water, so stay within arm’s reach at bath time and empty buckets and kiddie pools.',
    source: 'CDC; American Academy of Pediatrics',
    sourceUrl: 'https://www.cdc.gov/drowning/risk-factors/index.html',
  },
  {
    title: 'In summer',
    body: 'Child drowning deaths in pools and spas peak in June, July and August, but pools, tubs and ponds are dangerous all year.',
    source: 'CPSC, 2026 report',
    sourceUrl: CPSC_2026,
  },
  {
    title: 'Children with autism',
    body: 'Children with autism are far more likely to die from drowning than other children. One study estimated about 160 times as likely, often after wandering. Door alarms, adaptive swim lessons and a wandering plan save lives.',
    source: 'Guan & Li, American Journal of Public Health, 2017',
    sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/28590851/',
  },
];

/** Grouped facts on The Facts page. */
export const factGroups: { title: string; intro?: string; facts: Fact[] }[] = [
  {
    title: 'Young children',
    facts: [
      {
        stat: '#1',
        label: 'Drowning is the leading cause of death for children ages 1–4.',
        detail: 'More children this age die from drowning than from any other cause.',
        source: 'CDC',
        sourceUrl: CDC_FACTS,
      },
      {
        stat: '376',
        label: 'Children under 15 who died in pool or spa drownings each year, on average (2021–2023).',
        detail: 'Nearly 80% of them were younger than 5.',
        source: 'CPSC, 2026 report',
        sourceUrl: CPSC_2026,
      },
      {
        stat: '12–36 mo',
        label: 'Toddlers between 1 and 3 years old are at the highest risk.',
        detail: 'They are newly mobile, curious, and drawn to water, but have no sense of danger.',
        source: 'American Academy of Pediatrics',
        sourceUrl: 'https://publications.aap.org/pediatrics/article/148/2/e2021052227/179784/Prevention-of-Drowning',
      },
    ],
  },
  {
    title: 'Across the country',
    facts: [
      {
        stat: '4,500+',
        label: 'People died from unintentional drowning each year in the U.S. in 2020–2022.',
        detail: 'That’s about 500 more each year than in 2019.',
        source: 'CDC Vital Signs, 2024',
        sourceUrl: 'https://www.cdc.gov/vitalsigns/drowning/index.html',
      },
      {
        stat: '#2',
        label: 'Drowning is the second leading cause of unintentional-injury death for children ages 5–14, after car crashes.',
        source: 'CDC',
        sourceUrl: CDC_FACTS,
      },
      {
        stat: '7.6×',
        label: 'Black children ages 10–14 drown in swimming pools at 7.6 times the rate of White children.',
        detail: 'Access to swim lessons is a big part of that gap.',
        source: 'CDC',
        sourceUrl: 'https://www.cdc.gov/drowning/health-equity/index.html',
      },
    ],
  },
  {
    title: 'Nonfatal drowning',
    intro:
      'Drowning doesn’t always end in death. Survivors can have no lasting injuries, or very serious ones such as brain damage or permanent disability.',
    facts: nonfatal,
  },
  {
    title: 'How it happens',
    facts: [
      {
        stat: 'Silent',
        label: 'Drowning happens in seconds and is often silent.',
        detail: 'There is usually no splashing or calling for help. Young children can drown in an inch or two of water.',
        source: 'CDC; American Academy of Pediatrics',
        sourceUrl: 'https://www.healthychildren.org/English/safety-prevention/at-play/Pages/Water-Safety-And-Young-Children.aspx',
      },
      {
        stat: '69%',
        label: 'Of young children who drowned in pools weren’t expected to be at or in the pool.',
        detail: 'And 77% had been missing for 5 minutes or less (CPSC study, late-1980s data).',
        source: 'CPSC',
        sourceUrl: CPSC_BARRIERS,
      },
      {
        stat: '4 sides',
        label: 'A fence that completely isolates the pool on all four sides is far more protective than one that uses the house as a side.',
        detail: 'A research review found 83% lower odds of drowning with four-sided isolation fencing than with three-sided fencing.',
        source: 'Cochrane review (Thompson & Rivara)',
        sourceUrl:
          'https://www.cochrane.org/evidence/CD001047_fencing-which-completely-encloses-all-sides-swimming-pool-and-isolates-it-home-effective-preventing',
      },
    ],
  },
];
