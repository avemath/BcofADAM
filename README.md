# Because of ADAM: Allies in the Drowning Awareness Movement

This is the website for **Because of ADAM**, the drowning awareness movement my siblings and I started in 2020 because of our little brother, Adam.

When Adam was 14 months old, he slipped out of the house during a busy week of family celebrations and was found in our backyard pool. After 90 minutes without a pulse, his heart started beating again. He's a nonfatal drowning survivor, and he's the reason we do all of this. Drowning is the #1 cause of death for kids ages 1–4, and it's preventable. This site is how we help other families learn that before it happens to them.

Follow Adam's journey on Facebook: [Adam's Village of Hope](https://www.facebook.com/AdamsVillageofHope/)

---

## Editing the website

**Anyone in the family can edit the site in the Studio**. No code, no GitHub account. Go to the website and add `/studio` to the address, or click **Family Studio** at the bottom of any page.

👉 **[How to use the Studio](docs/STUDIO-GUIDE.md)**

## Our planning docs

| Doc | What's in it |
|---|---|
| [Studio guide](docs/STUDIO-GUIDE.md) | How to edit the site, add events, turn on the Donate button |
| [Launch checklist](docs/LAUNCH-CHECKLIST.md) | Everything left to do for the nonprofit and the site |
| [Content plan](docs/CONTENT-PLAN.md) | Who the site is for, what we say, and how we say it |
| [Story notes](docs/STORY-NOTES.md) | What we've shared about Adam on Facebook and what's on the site |
| [Questions for Mom & Dad](docs/STORY-QUESTIONNAIRE.md) | The last details to confirm before launch |
| [Research](docs/RESEARCH.md) | Where every statistic comes from, and which ones to avoid |
| [Brand guide](docs/BRAND-GUIDE.md) | Colors, fonts, taglines and photo rules |
| [Photo & story release](docs/PHOTO-AND-STORY-RELEASE.md) | Permission form for featuring other families |

## What's on the site

- **Home**: "Drowning is silent. We won't be." Plus the key facts, "Not just pools. Not just summer." (bathtubs, buckets, nighttime, winter clothes), Adam, a live "time on this page" clock, an interactive backyard where you build the layers of protection, Dad's ISR lessons, our events and our Facebook feed
- **Adam's Story**, told by me
- **Water Safety**: the seven layers of protection, plus teens, life jackets, the above-ground pool recall and CPR
- **Water Safety in Pennsylvania**: lakes and rivers near us, cold water, ice, flash floods and PA's life jacket rules
- **ISR Swim Lessons**: what Infant Swimming Resource is, what pediatricians say, why it matters so much to us, other ways to find lessons, and a search for certified instructors near you
- **The Facts**, **Survivors & Families**, **Events**, **Water Watcher Pledge** (with a printable card), **Home checklist** (printable), **Get Involved**, **Request a Talk**, **About**, **Resources**, **News**, **Press**, **Contact**, **Privacy**, **Terms**, **Accessibility**

The **Donate** buttons stay hidden until a donation link is added in the Studio. The yellow **Preview** banner stays up (and Google stays away) until we flip the launch switch. Once the switch is on, the build refuses to publish if anything marked `{{TODO: ...}}`, a photo without a description, or a missing email or location is left (see [launch-guard.mjs](integrations/launch-guard.mjs)).

Hosting, DNS, security headers and email setup: [HOSTING_NOTES.md](HOSTING_NOTES.md). Moving the private planning docs out of this public repo: [PRIVATE_DOCS_MIGRATION.md](PRIVATE_DOCS_MIGRATION.md).

## How it's published

- Every change made in the Studio, or merged into `main`, goes live automatically in about 2 minutes on GitHub Pages ([deploy.yml](.github/workflows/deploy.yml)). The site also rebuilds every morning so events move to "past" the day after they end.
- Every proposed change is checked to make sure the site still builds ([ci.yml](.github/workflows/ci.yml)).
- Once a month, every link on the site is checked, including every statistic's source ([links.yml](.github/workflows/links.yml)).

## For developers

Built with [Astro](https://astro.build). Requires Node.js 22.12+.

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # Studio config check + type-check
npm run build     # output in dist/ (also makes AVIF/WebP photos and runs the launch guard)
npm run icons -- path/to/logo.png   # remake every favicon and app icon from one logo file
```

```
.pages.yml       ← Studio (Pages CMS) setup: what the family can edit
src/
  data/          ← settings, home page, facts, resources, team, Dad's ISR story box (JSON, edited in the Studio)
  content/
    pages/       ← Adam's Story, ISR Swim Lessons, Pennsylvania, Press, Privacy, Terms and more (Markdown)
    events/      ← events & fundraisers (Markdown)
    news/        ← news posts (Markdown)
  pages/         ← one file per page
  components/    ← header, footer, layers builder, Facebook feed, ISR finder…
  styles/        ← global.css (colors and fonts at the top)
integrations/    ← build steps: launch guard, photo optimizer
scripts/         ← Studio config check, icon generator
public/images/   ← images (Studio uploads go in public/images/uploads)
```
