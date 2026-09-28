/**
 * SITE SETTINGS
 * -------------
 * This is the one file to update as the nonprofit gets set up.
 * Change the text between the quotes, then commit. Leave a value as ''
 * (empty quotes) if you don't have it yet — the site hides anything empty.
 */
export const site = {
  /** Full legal/display name. */
  name: 'Because of ADAM',
  /** What ADAM stands for. */
  tagline: 'A Drowning Awareness Movement',
  /** One-sentence description used by Google and social media previews. */
  description:
    'Because of ADAM is a family-founded drowning awareness movement sharing Adam’s story as a nonfatal drowning survivor and helping families put layers of protection between young children and the water.',

  /**
   * LAUNCH SWITCH
   * While false, every page shows a "preview" ribbon and asks search engines
   * NOT to index the site. Flip to true when Adam's story, photos and contact
   * details are filled in and you're ready for the public to find it.
   */
  launchReady: false,

  /**
   * TAX STATUS
   * Keep false until the IRS issues your 501(c)(3) determination letter.
   * While false, the site never calls donations "tax-deductible".
   */
  taxExempt: false,
  /** EIN (Employer Identification Number), shown in the footer once you have it. e.g. '12-3456789' */
  ein: '',

  /** Links. Paste full URLs, e.g. 'https://www.zeffy.com/...' */
  donateUrl: '',
  /**
   * Contact email. This is the address listed on the Facebook page. Switch to
   * an address on your own domain (e.g. 'hello@becauseofadam.org') once you have one.
   */
  email: 'bcofadam@gmail.com',
  /** City/State shown in the footer, e.g. 'Louisiana' */
  location: '',
  /**
   * Contact form endpoint. Create a free form at https://formspree.io or
   * https://web3forms.com and paste the form's endpoint URL here.
   * If empty, the contact page shows the email address instead.
   */
  contactFormAction: '',
  /** Newsletter signup URL (Mailchimp, MailerLite, Zeffy, etc.). Optional. */
  newsletterUrl: '',

  social: {
    facebook: 'https://www.facebook.com/AdamsVillageofHope/',
    instagram: '',
    tiktok: '',
    youtube: '',
  },
};

/** Main navigation. Order here = order on the site. */
export const nav = [
  { label: 'Adam’s Story', href: '/adams-story' },
  { label: 'Water Safety', href: '/water-safety' },
  { label: 'The Facts', href: '/the-facts' },
  { label: 'Survivors & Families', href: '/survivors-and-families' },
  { label: 'Get Involved', href: '/get-involved' },
];

export const footerNav = [
  { label: 'About Us', href: '/about' },
  { label: 'Water Watcher Pledge', href: '/water-watcher' },
  { label: 'Resources', href: '/resources' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
];
