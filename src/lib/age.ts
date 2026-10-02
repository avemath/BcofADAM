/**
 * Adam's age, worked out from his birthday so "Adam is 10" stays true every year
 * (the site rebuilds every morning). In the Studio, type {{Adam's age}} anywhere in a
 * page and the site fills in his age ("10").
 */
const BIRTHDAY = { year: 2016, month: 3, day: 22 };

/** Adam's age today in Pennsylvania. */
export function adamAge(): number {
  const [y, m, d] = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' })
    .format(new Date())
    .split('-')
    .map(Number);
  const hadBirthday = m > BIRTHDAY.month || (m === BIRTHDAY.month && d >= BIRTHDAY.day);
  return y - BIRTHDAY.year - (hadBirthday ? 0 : 1);
}

const TOKEN = /\{\{\s*Adam(?:'|’|&#39;|&#x27;|&rsquo;)s age\s*\}\}/gi;

/** Swaps {{Adam's age}} for his age. */
export function withAge(text: string): string;
export function withAge(text: string | undefined): string | undefined;
export function withAge(text: string | undefined) {
  if (!text) return text;
  const age = adamAge();
  return text.replace(TOKEN, String(age));
}
