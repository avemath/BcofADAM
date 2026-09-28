# Because of ADAM: A Drowning Awareness Movement

The website for **Because of ADAM**, a family-founded movement to prevent childhood drowning, the #1 cause of death for children ages 1–4, and to support families living life after a nonfatal drowning.

Adam was 14 months old when he slipped out of the house during a family celebration and was found in the backyard pool. He survived. His family is making sure other families learn what they learned, *before* it happens to them.

Facebook community: [Adam's Village of Hope](https://www.facebook.com/AdamsVillageofHope/)

---

## 👋 Start here

| If you want to… | Read |
|---|---|
| See **everything left to do** to get the nonprofit and website running | [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md) |
| Understand **what the site says and why** (audiences, messages, page plan, calendar) | [docs/CONTENT-PLAN.md](docs/CONTENT-PLAN.md) |
| **Change words, photos or links** (no coding) | [docs/EDITING-GUIDE.md](docs/EDITING-GUIDE.md) |
| Write **Adam's story** | [docs/STORY-QUESTIONNAIRE.md](docs/STORY-QUESTIONNAIRE.md) |
| See what we learned from the **Facebook page & news coverage** | [docs/FACEBOOK-AUDIT.md](docs/FACEBOOK-AUDIT.md) |
| Check **where every statistic comes from** | [docs/RESEARCH.md](docs/RESEARCH.md) |
| Colors, fonts, voice, photo rules | [docs/BRAND-GUIDE.md](docs/BRAND-GUIDE.md) |
| Get permission to feature a child or family | [docs/PHOTO-AND-STORY-RELEASE.md](docs/PHOTO-AND-STORY-RELEASE.md) |

## What's on the site

- **Home**: "Drowning is silent" hero, key facts, Adam's story, a live "time on this page" clock, an interactive **build-your-layers backyard**, and ways to help
- **Adam's Story**: *draft for the family to review*
- **Water Safety**: the seven layers of protection, with checklists, and high-risk moments
- **The Facts**: current statistics, each linked to its source
- **Survivors & Families**: what nonfatal drowning means, what families face, and where to find help
- **Water Watcher Pledge**: interactive pledge plus a **printable Water Watcher card**
- **Get Involved**, **Donate**, **About**, **Resources**, **News**, **Contact**, **Privacy**

The site shows a yellow **"Preview"** ribbon and hides from Google until `launchReady` is set to `true` in [`src/data/site.ts`](src/data/site.ts).

## How it's published

- Built with [Astro](https://astro.build) as a fast, static website (no database, nothing to hack, nearly free to run).
- **Every merge to `main` publishes automatically** to GitHub Pages ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
  - One-time setup: **Settings → Pages → Source: GitHub Actions**.
  - Address: `https://avemath.github.io/BcofADAM/` until a custom domain (e.g. `becauseofadam.org`) is connected.
- **Every pull request is checked** to make sure the site still builds ([`ci.yml`](.github/workflows/ci.yml)).
- **Every month, all links are checked**, including each statistic's source ([`links.yml`](.github/workflows/links.yml)).

## For developers

Requires Node.js 22.12+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # type-check
npm run build     # output in dist/
npm run preview   # serve the built site
```

```
src/
  data/          ← site settings, facts, layers, resources, story snippets (edit these most)
  content/
    pages/       ← long-form Markdown pages (Adam's Story, Privacy)
    news/        ← news posts (Markdown)
  pages/         ← one file per page/route
  components/    ← Header, Footer, LayersBuilder, TimeOnPage, PhotoFrame, Wave…
  layouts/       ← BaseLayout (head, header, footer), ProseLayout (Markdown pages)
  styles/        ← global.css (colors and fonts at the top)
public/          ← images, favicon, robots.txt (served as-is)
docs/            ← planning documents
```

Design notes: all motion respects `prefers-reduced-motion`; interactive pieces (the layers builder and the pledge) are built on native checkboxes, so they work with a keyboard and a screen reader; there's no horizontal scroll at phone widths; the Water Watcher card has its own print stylesheet.
