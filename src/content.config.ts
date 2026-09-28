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
    /** Photos shown under a heading of the page (Adam's Story uses these). */
    photos: z
      .array(z.object({ section: text(), photo: text(), alt: text(), caption: text() }))
      .nullish()
      .transform((v) => v ?? []),
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
    link: text(),
    linkLabel: text(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, news, events };
