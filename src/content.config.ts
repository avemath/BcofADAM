import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Everything here is edited in the Studio (Pages CMS, see .pages.yml).
 * Fields are forgiving on purpose: an empty box in the Studio should never
 * break the website.
 */
const text = () => z.string().nullish().transform((v) => v ?? '');

/** Long-form pages written in Markdown (Adam's story, ISR lessons, privacy). */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    eyebrow: text(),
    lede: text(),
    description: text(),
    /** Picture shown when the page is shared on social media (optional). */
    image: text(),
    imageAlt: text(),
  }),
});

/** News & updates. */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: text(),
    draft: z.boolean().default(false),
  }),
});

/** Fundraisers and awareness events (fishing rodeo, cornhole tournaments…). */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['Fundraiser', 'Awareness', 'Swim & safety', 'Community']).catch('Fundraiser'),
    date: z.union([z.coerce.date(), z.literal(''), z.null()]).optional().transform((v) => (v ? v : undefined)),
    when: text(),
    location: text(),
    summary: text(),
    highlight: text(),
    photo: text(),
    photoAlt: text(),
    /** Show the whole picture instead of filling the frame (for flyers and wide images). */
    photoWhole: z.boolean().default(false),
    /** Yearly events (like Wear Blue on June 5) always show their next date under "Coming up". */
    repeatsYearly: z.boolean().default(false),
    link: text(),
    linkLabel: text(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, news, events };
