import { site } from '../data/site';

/**
 * The Privacy Policy names the services the site really uses. In the Studio, the policy
 * has {{contact form}}, {{newsletter}}, {{donations}} and {{analytics}} where those
 * sentences go, and the site fills each one in from Site settings. Add a form, newsletter,
 * donation link or analytics in Site settings and the policy updates itself.
 */

/** Friendly names for the services we're likely to pick. Anything else shows its web address. */
const NAMES: [RegExp, string][] = [
  [/formspree\.io$/, 'Formspree'],
  [/web3forms\.com$/, 'Web3Forms'],
  [/(list-manage|mailchimp)\.com$/, 'Mailchimp'],
  [/mailerlite\.com$/, 'MailerLite'],
  [/buttondown\.(com|email)$/, 'Buttondown'],
  [/(kit|convertkit)\.com$/, 'Kit'],
  [/substack\.com$/, 'Substack'],
  [/zeffy\.com$/, 'Zeffy'],
  [/givebutter\.com$/, 'Givebutter'],
  [/every\.org$/, 'Every.org'],
  [/donorbox\.org$/, 'Donorbox'],
  [/paypal\.(com|me)$/, 'PayPal'],
];

function serviceName(link: string): string {
  let host = '';
  try {
    host = new URL(link).hostname.replace(/^www\./, '');
  } catch {
    return link;
  }
  return NAMES.find(([pattern]) => pattern.test(host))?.[1] ?? host;
}

const ANALYTICS: Record<string, string> = {
  plausible: 'Plausible',
  fathom: 'Fathom',
  cloudflare: 'Cloudflare Web Analytics',
};

function contactForm(): string {
  const action = site.contactFormAction.trim();
  if (!action) {
    return 'Right now our Contact and Get Involved pages show our email address instead of a form, so we only get what you choose to email us.';
  }
  return `The forms on our Contact and Get Involved pages send what you type (like your name, email address and message) to ${serviceName(action)}, the service that passes it on to us by email.`;
}

function newsletter(): string {
  const link = site.newsletterFormAction.trim() || site.newsletterUrl.trim();
  if (!link) {
    return 'We don’t send email updates yet, so we don’t keep a mailing list.';
  }
  return `If you sign up for our emails, your email address is stored with our email provider, ${serviceName(link)}. Every email has an unsubscribe link.`;
}

function donations(): string {
  const link = site.donateUrl.trim();
  if (!link) {
    return 'We don’t take donations on this website yet.';
  }
  return `Donations are processed by ${serviceName(link)}, a secure giving platform. We receive your name, contact details and gift amount so we can thank you and send receipts. We never see or store your full card number.`;
}

function analytics(): string {
  const name = ANALYTICS[site.analyticsProvider];
  if (!name || !site.analyticsSite.trim()) {
    return 'We don’t use a site statistics service. See Facebook and Hosting below for what those services can see when you visit.';
  }
  return `We use ${name}, a privacy-friendly service that counts visits without cookies and without building a profile of you.`;
}

const SENTENCES: Record<string, () => string> = {
  'contact form': contactForm,
  newsletter,
  donations,
  analytics,
};

const TOKEN = /\{\{\s*(contact form|newsletter|donations|analytics)\s*\}\}/gi;

/** Swaps {{contact form}}, {{newsletter}}, {{donations}} and {{analytics}} for the right sentence. */
export function withServices(html: string): string {
  return html.replace(TOKEN, (_, key: string) => SENTENCES[key.toLowerCase()]());
}
