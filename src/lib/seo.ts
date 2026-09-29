/**
 * Structured data (JSON-LD) that helps search engines understand who we are.
 * Everything comes from Site settings, so it stays in sync with the footer and About page.
 */
import type { CollectionEntry } from 'astro:content';
import { site, ein } from '../data/site';
import { eventDate, eventEnd } from './events';

type Json = Record<string, unknown>;

/** Our organization, on every page. */
export function organization(origin: string, logo: string): Json {
  const sameAs = Object.values(site.social).filter(Boolean);
  const hasEin = !/\{\{/.test(ein);
  return {
    '@type': 'NGO',
    '@id': `${origin}/#organization`,
    name: site.name,
    alternateName: `${site.name}: ${site.tagline}`,
    url: `${origin}/`,
    logo,
    description: site.description,
    ...(site.email && { email: site.email }),
    ...(sameAs.length && { sameAs }),
    ...(site.areaServed && { areaServed: { '@type': 'AdministrativeArea', name: site.areaServed } }),
    ...(site.location && { location: { '@type': 'Place', name: site.location } }),
    ...(site.taxExempt && { nonprofitStatus: 'Nonprofit501c3' }),
    ...(site.taxExempt && hasEin && { taxID: ein }),
  };
}

/** The page itself: a WebPage, or an Article for news posts and stories. */
export function page(opts: {
  origin: string;
  url: string;
  title: string;
  description: string;
  image: string;
  type: 'WebPage' | 'Article';
  published?: Date;
}): Json {
  const base = {
    '@id': `${opts.url}#page`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    image: opts.image,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${opts.origin}/#website` },
    publisher: { '@id': `${opts.origin}/#organization` },
  };
  if (opts.type === 'Article') {
    return {
      '@type': 'Article',
      ...base,
      headline: opts.title,
      author: { '@id': `${opts.origin}/#organization` },
      mainEntityOfPage: opts.url,
      ...(opts.published && { datePublished: opts.published.toISOString() }),
    };
  }
  return { '@type': 'WebPage', ...base };
}

export function website(origin: string): Json {
  return {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: `${origin}/`,
    name: site.name,
    alternateName: `${site.name}: ${site.tagline}`,
    publisher: { '@id': `${origin}/#organization` },
  };
}

/** An upcoming event. Yearly awareness days (like Wear Blue on June 5) use their next date. */
export function event(e: CollectionEntry<'events'>, origin: string, pageUrl: string): Json | undefined {
  const start = eventDate(e);
  const end = eventEnd(e);
  if (!start) return undefined;
  const d = e.data;
  const inPerson = d.location && !/everywhere|online/i.test(d.location);
  return {
    '@type': 'Event',
    name: d.title,
    description: d.summary,
    startDate: start.toISOString().slice(0, 10),
    ...(end && end > start && { endDate: end.toISOString().slice(0, 10) }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: inPerson
      ? 'https://schema.org/OfflineEventAttendanceMode'
      : 'https://schema.org/OnlineEventAttendanceMode',
    location: inPerson
      ? { '@type': 'Place', name: d.location, address: d.location }
      : { '@type': 'VirtualLocation', url: pageUrl },
    // Relative to the site's own address, so it keeps any sub-folder the site is served from.
    ...(d.photo && { image: new URL(d.photo.replace(/^\//, ''), `${origin}/`).href }),
    organizer: { '@id': `${origin}/#organization` },
  };
}
