/**
 * "Add to calendar" files for upcoming events (/events/wear-blue-june-5.ics).
 * All-day events; yearly ones repeat every year in the person's calendar.
 * They're rebuilt every morning with the rest of the site.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getEvents, splitEvents, eventDate, eventEnd } from '../../lib/events';
import { url } from '../../lib/url';
import { site } from '../../data/site';

export const getStaticPaths: GetStaticPaths = async () => {
  const { upcoming } = splitEvents(await getEvents());
  return upcoming.map((event) => ({ params: { id: event.id }, props: { event } }));
};

const DAY = 24 * 60 * 60 * 1000;
const ymd = (d: Date) => d.toISOString().slice(0, 10).replace(/-/g, '');
/** Calendar text can't contain raw commas, semicolons, backslashes or line breaks. */
const escape = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
/** Calendar lines are folded at 75 characters; each extra line starts with a space. */
const fold = (line: string) => {
  const parts = [];
  for (let i = 0; i < line.length; i += 72) parts.push((i ? ' ' : '') + line.slice(i, i + 72));
  return parts.join('\r\n');
};

export const GET: APIRoute = ({ props, site: siteUrl }) => {
  const event = props.event as CollectionEntry<'events'>;
  const e = event.data;
  const start = eventDate(event)!;
  const end = eventEnd(event) ?? start;
  const eventsPage = new URL(url('/events'), siteUrl).href;
  const place = e.location && !/everywhere|online/i.test(e.location) ? e.location : '';
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${site.name}//Events//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id}@${siteUrl?.host ?? 'becauseofadam.org'}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')}`,
    `DTSTART;VALUE=DATE:${ymd(start)}`,
    // All-day events end the morning after their last day.
    `DTEND;VALUE=DATE:${ymd(new Date(end.valueOf() + DAY))}`,
    ...(e.repeatsYearly ? ['RRULE:FREQ=YEARLY'] : []),
    `SUMMARY:${escape(e.title)}`,
    `DESCRIPTION:${escape([e.summary, e.when, eventsPage].filter(Boolean).join('\n\n'))}`,
    ...(place ? [`LOCATION:${escape(place)}`] : []),
    `URL:${eventsPage}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
