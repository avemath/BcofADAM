/**
 * Site settings come from settings.json, which the family edits in the Studio
 * (Pages CMS). This file just shapes that data for the rest of the site.
 */
import settings from './settings.json';

export const site = {
  ...settings,
  social: {
    facebook: settings.facebookUrl,
    instagram: settings.instagramUrl,
    tiktok: settings.tiktokUrl,
    youtube: settings.youtubeUrl,
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
  { label: 'Adam’s Story', href: '/adams-story' },
  { label: 'Water Safety', href: '/water-safety' },
  { label: 'ISR Swim Lessons', href: '/swim-lessons' },
  { label: 'The Facts', href: '/the-facts' },
  { label: 'Survivors & Families', href: '/survivors-and-families' },
  { label: 'Get Involved', href: '/get-involved' },
];

export const footerNav = [
  { label: 'About Us', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Water Watcher Pledge', href: '/water-watcher' },
  { label: 'Resources', href: '/resources' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
];
