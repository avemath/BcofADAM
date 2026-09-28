import { getCollection } from 'astro:content';

/** Published events, newest first. Undated (yearly) events go after dated ones. */
export async function getEvents() {
  const all = await getCollection('events', ({ data }) => !data.draft);
  return all.sort((a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
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
