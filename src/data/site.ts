/**
 * Site settings come from settings.json, which the family edits in the Studio
 * (Pages CMS). This file just shapes that data for the rest of the site.
 */
import settingsJson from './settings.json';
import { webLink } from '../lib/url';

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
const saved = settingsJson as Partial<Record<keyof Settings, unknown>>;
// A box cleared in the Studio can come through as null: use the default instead of breaking the build.
const merged = Object.fromEntries(
  Object.entries(defaults).map(([key, value]) => [key, saved[key as keyof Settings] ?? value]),
) as Settings;
// Web addresses typed without https:// still link to the right place.
for (const key of ['donateUrl', 'newsletterUrl', 'facebookUrl', 'instagramUrl', 'tiktokUrl', 'youtubeUrl', 'linkedinUrl'] as const) {
  merged[key] = webLink(String(merged[key]));
}
export const settings: Settings = merged;

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

export interface NavLink {
  label: string;
  href: string;
}
export interface NavItem extends NavLink {
  /** Pages that open from the little arrow next to this item. */
  children?: NavLink[];
}

/** Main navigation. Order here = order on the site. */
export const nav: NavItem[] = [
  {
    label: 'Water Safety',
    href: '/water-safety',
    children: [
      { label: 'Layers of protection', href: '/water-safety' },
      { label: 'The facts', href: '/the-facts' },
      { label: 'Water Watcher pledge', href: '/water-watcher' },
      { label: 'Home safety checklist', href: '/checklist' },
      { label: 'Water safety in Pennsylvania', href: '/pennsylvania' },
      { label: 'Teens, life jackets & CPR', href: '/water-safety#more' },
      { label: 'Resources', href: '/resources' },
    ],
  },
  { label: 'Adam’s Story', href: '/adams-story' },
  { label: 'ISR Swim Lessons', href: '/swim-lessons' },
  { label: 'Survivors & Families', href: '/survivors-and-families' },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      { label: 'Ways to help', href: '/get-involved' },
      { label: 'Events', href: '/events' },
      { label: 'Request a talk', href: '/request-a-talk' },
      { label: 'Volunteer', href: '/get-involved#volunteer' },
      ...(hasDonate ? [{ label: 'Donate', href: '/donate' }] : []),
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About us', href: '/about' },
      { label: 'News', href: '/news' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
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
