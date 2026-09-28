import { getCollection } from 'astro:content';

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** When an event happened: its date, or the year (and month) in "when", like "July 2021" or "Summer 2018". */
function sortKey(data: { date?: Date; when: string }) {
  if (data.date) return data.date.valueOf();
  const year = data.when.match(/\b(19|20)\d{2}\b/);
  if (!year) return 0;
  const month = MONTHS.findIndex((m) => data.when.toLowerCase().includes(m));
  return Date.UTC(Number(year[0]), Math.max(month, 0), 1);
}

/** Published events, newest first. Yearly events with no year (like "Every June 5") go last. */
export async function getEvents() {
  const all = await getCollection('events', ({ data }) => !data.draft);
  return all.sort((a, b) => sortKey(b.data) - sortKey(a.data));
}

/** Upcoming = dated today or later (checked each time the site rebuilds). */
export function splitEvents<T extends { data: { date?: Date } }>(events: T[]) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const upcoming = events
    .filter((e) => e.data.date && e.data.date >= today)
    .sort((a, b) => a.data.date!.valueOf() - b.data.date!.valueOf());
  const past = events.filter((e) => !upcoming.includes(e));
  return { upcoming, past };
}
