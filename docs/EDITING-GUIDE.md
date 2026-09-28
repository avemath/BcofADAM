# How to edit the website (no coding needed)

You can make almost every change right on github.com, from a computer or a phone browser. When you save ("commit") a change to the `main` branch, the live site updates by itself in about 2 minutes.

> **Safety net:** GitHub keeps every version. If something goes wrong, nothing is lost. Open the file, click **History**, and you can see or restore any earlier version. If the site stops updating, check the **Actions** tab. A red ✗ means a typo broke the build, and clicking it shows which file.

---

## The files you'll actually touch

| To change… | Edit this file |
|---|---|
| Donate link, email, contact form, social links, launch switch, tax status | [`src/data/site.ts`](../src/data/site.ts) |
| **Adam's Story** page | [`src/content/pages/adams-story.md`](../src/content/pages/adams-story.md) |
| Home page story lines and Adam's photo | [`src/data/story.ts`](../src/data/story.ts) |
| Statistics (anywhere on the site) | [`src/data/facts.ts`](../src/data/facts.ts) |
| Layers of protection text | [`src/data/layers.ts`](../src/data/layers.ts) |
| Resource links | [`src/data/resources.ts`](../src/data/resources.ts) |
| Privacy policy | [`src/content/pages/privacy.md`](../src/content/pages/privacy.md) |
| News posts | [`src/content/news/`](../src/content/news/) |
| Other page wording (About, Donate, Get Involved…) | `src/pages/<page-name>.astro` (text is between the tags, e.g. `<p>…</p>`) |
| Colors | top of [`src/styles/global.css`](../src/styles/global.css) |

## Edit text

1. Open the file on GitHub and click the **pencil ✏️** icon ("Edit this file").
2. Change the words. In `.ts` files, only change text **inside the quotes** `'like this'`. Keep the quotes, commas and brackets.
   - To use an apostrophe inside `'single quotes'`, use the curly one (’), as the existing text does, or put a backslash before it: `\'`.
3. Click **Commit changes…** → write a short note (e.g. "Update Adam's age") → **Commit changes**.

## Markdown basics (for `.md` files like Adam's Story and news)

```
## A section heading
A normal paragraph. Leave a blank line between paragraphs.

**bold words** and *italic words*

- a bullet point
- another one

[link text](https://example.com)

> A big pull quote

![Description of the photo](/images/adam-2024-therapy.jpg)
```

The yellow "Family, please review" boxes are `<div class="todo">…</div>` blocks. Delete the whole block, from `<div class="todo">` through `</div>`, when that section is final.

## Add photos

1. Resize photos first. About **1600 pixels wide** is plenty. Keep file names lowercase with dashes: `adam-first-steps.jpg`.
2. On GitHub, go to the [`public/images`](../public/images) folder → **Add file → Upload files** → drag photos in → **Commit changes**.
3. Use the photo:
   - **Home page and Adam's Story sidebar:** in `src/data/story.ts`, set `photo: '/images/adam-first-steps.jpg'` and write a real description in `photoAlt` (e.g. `'Adam, age 9, laughing on a swing'`).
   - **Inside Adam's Story text:** `![Adam with his therapist, 2019](/images/adam-therapy-2019.jpg)`
4. **Always write alt text.** It describes the photo for people who can't see it, and it helps Google.
5. **Permission:** only post photos of other people's children with a signed release ([template](PHOTO-AND-STORY-RELEASE.md)).

> Big files slow the site on phones. If a photo is over ~500 KB, shrink it first (free: [squoosh.app](https://squoosh.app)).

## Post a news update

1. Open [`src/content/news/`](../src/content/news/) → **Add file → Create new file**.
2. Name it like `2027-05-01-water-safety-month.md`.
3. Paste this at the top, then write your update below it:

```
---
title: May is National Water Safety Month
date: 2027-05-01
summary: One sentence that shows in the news list.
draft: false
---

Your update here…
```

4. **Commit changes.** Use `draft: true` to save it without publishing.

## Update a statistic

Open `src/data/facts.ts`. Each fact looks like this:

```ts
{
  stat: '7',
  label: 'For every child who dies from drowning, another 7 get emergency care…',
  source: 'CDC',
  sourceUrl: CDC_FACTS,
},
```

Change `stat`/`label`, and always update `source`/`sourceUrl` to the new source. Never post a number without one.

## Flip the launch switch

In `src/data/site.ts`, change `launchReady: false` to `launchReady: true`. The yellow "preview" ribbon and the "add a photo" tags disappear, and Google is allowed to list the site.

## Want to preview before it goes live?

- **Easy way:** when you commit, choose **"Create a new branch… and start a pull request."** GitHub runs the "Check site builds" test on it. If it's green ✓, merge it and it goes live.
- **On a computer with Node.js 22+:** `npm install`, then `npm run dev`, and open http://localhost:4321.

## Ask Claude

You can also open a GitHub issue using the **Content update** template, or just ask Claude to "update Adam's age to 10 on the website," "add these 5 photos to Adam's Story," or "add a news post about our swim-a-thon."
