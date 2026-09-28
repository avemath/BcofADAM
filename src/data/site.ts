/**
 * Site settings come from settings.json, which the family edits in the Studio
 * (Pages CMS). This file just shapes that data for the rest of the site.
 */
import settingsJson from './settings.json';

/**
 * Every setting, with a safe default. The Studio drops empty fields when it
 * saves, so the site never assumes a setting is there.
 */
const defaults = {
  name: 'Because of ADAM',
  tagline: '',
  description: '',
  launchReady: false,
  taxExempt: false,
  ein: '',
  donateUrl: '',
  email: '',
  location: '',
  areaServed: '',
  contactFormAction: '',
  contactFormKey: '',
  newsletterFormAction: '',
  newsletterEmailField: 'email',
  newsletterUrl: '',
  facebookUrl: '',
  showFacebookFeed: true,
  instagramUrl: '',
  tiktokUrl: '',
  youtubeUrl: '',
  linkedinUrl: '',
  themeColor: '#083349',
  analyticsProvider: 'none',
  analyticsSite: '',
};
export type Settings = typeof defaults;
export const settings: Settings = { ...defaults, ...(settingsJson as Partial<Settings>) };

export const site = {
  ...settings,
  /** Only the links that are filled in show up on the site. */
  social: {
    facebook: settings.facebookUrl,
    instagram: settings.instagramUrl,
    tiktok: settings.tiktokUrl,
    youtube: settings.youtubeUrl,
    linkedin: settings.linkedinUrl,
  },
};

/** The EIN from the Studio, or a visible placeholder until it's filled in. */
export const ein = site.ein.trim() || '{{TODO: EIN}}';

/** "Because of ADAM is a 501(c)(3) nonprofit organization. EIN: …" Shown only when taxExempt is on. */
export const nonprofitLine = site.taxExempt
  ? `${site.name} is a 501(c)(3) nonprofit organization. EIN: ${ein}.`
  : '';

/** True once a donation link has been added in the Studio. */
export const hasDonate = site.donateUrl.trim() !== '';

/** Main navigation. Order here = order on the site. */
export const nav = [
  { label: 'Water Safety', href: '/water-safety' },
  { label: 'Adam’s Story', href: '/adams-story' },
  { label: 'ISR Swim Lessons', href: '/swim-lessons' },
  { label: 'The Facts', href: '/the-facts' },
  { label: 'Survivors & Families', href: '/survivors-and-families' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'About', href: '/about' },
];

export const footerNav = [
  { label: 'About Us', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Water Watcher Pledge', href: '/water-watcher' },
  { label: 'Resources', href: '/resources' },
  { label: 'News', href: '/news' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
];
