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
