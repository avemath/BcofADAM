import { getCollection, type CollectionEntry } from 'astro:content';

type EventEntry = CollectionEntry<'events'>;

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const DAY = 24 * 60 * 60 * 1000;

/**
 * Today's date in Pennsylvania, as midnight UTC (the same way event dates are stored).
 * Using UTC's date would call today's events "past" for any build after 8 p.m. Eastern.
 * The site rebuilds every morning, so this stays fresh.
 */
export function today() {
  const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
  return new Date(`${ymd}T00:00:00Z`);
}

/** The next time a yearly event comes around (today counts). A first date still ahead is used as is. */
export function nextOccurrence(date: Date, from = today()) {
  if (date >= from) return date;
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const inYear = (year: number) => {
    const d = new Date(Date.UTC(year, month, day));
    // February 29 falls on February 28 in other years, not March 1.
    return d.getUTCMonth() === month ? d : new Date(Date.UTC(year, month + 1, 0));
  };
  const next = inYear(from.getUTCFullYear());
  return next < from ? inYear(from.getUTCFullYear() + 1) : next;
}

/** Extra days an event runs past its first day (0 for one-day events). */
function extraDays(e: EventEntry) {
  const { date, endDate } = e.data;
  if (!date || !endDate || endDate <= date) return 0;
  return Math.round((endDate.valueOf() - date.valueOf()) / DAY);
}

/**
 * The first day that matters for an event: for yearly events, the one happening now or coming up next;
 * otherwise its own date.
 */
export function eventDate(e: EventEntry) {
  const { date, repeatsYearly } = e.data;
  if (!date) return undefined;
  if (!repeatsYearly) return date;
  // Keep showing this year's dates until the last day has passed (all of May for Water Safety Month).
  return nextOccurrence(date, new Date(today().valueOf() - extraDays(e) * DAY));
}

/** The last day of that occurrence (the same as eventDate for one-day events). */
export function eventEnd(e: EventEntry) {
  const start = eventDate(e);
  return start && new Date(start.valueOf() + extraDays(e) * DAY);
}

/** True while an event is going on (its first day has come and its last day hasn't passed). */
export function isHappening(e: EventEntry) {
  const start = eventDate(e);
  const end = eventEnd(e);
  const now = today();
  return !!start && !!end && start <= now && end >= now;
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

/** Upcoming = yearly events and anything whose last day is today or later, soonest first. Past = everything else. */
export function splitEvents(events: EventEntry[]) {
  const now = today();
  const upcoming = events
    .filter((e) => {
      const end = eventEnd(e);
      return end !== undefined && end >= now;
    })
    .sort((a, b) => eventDate(a)!.valueOf() - eventDate(b)!.valueOf());
  const past = events.filter((e) => !upcoming.includes(e));
  return { upcoming, past };
}
