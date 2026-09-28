import { getCollection, type CollectionEntry } from 'astro:content';

type EventEntry = CollectionEntry<'events'>;

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** Midnight UTC today (the site rebuilds every Monday, so this stays fresh). */
export function today() {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

/** The next time a yearly event comes around (today counts). */
export function nextOccurrence(date: Date, from = today()) {
  const next = new Date(Date.UTC(from.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  if (next < from) next.setUTCFullYear(next.getUTCFullYear() + 1);
  return next;
}

/** The date that matters for an event: the next one for yearly events, otherwise its own date. */
export function eventDate(e: EventEntry) {
  const { date, repeatsYearly } = e.data;
  if (!date) return undefined;
  return repeatsYearly ? nextOccurrence(date) : date;
}

/** When an event happened: its date, or the year (and month) in "when", like "July 2021" or "Summer 2018". */
function sortKey(e: EventEntry) {
  if (e.data.date) return e.data.date.valueOf();
  const year = e.data.when.match(/\b(19|20)\d{2}\b/);
  if (!year) return 0;
  const month = MONTHS.findIndex((m) => e.data.when.toLowerCase().includes(m));
  return Date.UTC(Number(year[0]), Math.max(month, 0), 1);
}

/** Published events, newest first. Events with no year at all go last. */
export async function getEvents() {
  const all = await getCollection('events', ({ data }) => !data.draft);
  return all.sort((a, b) => sortKey(b) - sortKey(a));
}

/** Upcoming = yearly events and anything dated today or later, soonest first. Past = everything else. */
export function splitEvents(events: EventEntry[]) {
  const now = today();
  const upcoming = events
    .filter((e) => {
      const d = eventDate(e);
      return d !== undefined && d >= now;
    })
    .sort((a, b) => eventDate(a)!.valueOf() - eventDate(b)!.valueOf());
  const past = events.filter((e) => !upcoming.includes(e));
  return { upcoming, past };
}
