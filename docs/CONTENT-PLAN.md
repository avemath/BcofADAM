# Content plan: Because of ADAM website

What the site says, who it's for, why it's built the way it is, and what to add over time.

Related: [Launch checklist](LAUNCH-CHECKLIST.md) · [Research & sources](RESEARCH.md) · [Facebook audit](FACEBOOK-AUDIT.md) · [Brand guide](BRAND-GUIDE.md)

---

## 1. What the site needs to do

1. **Stop a parent in their tracks.** Within 10 seconds, a visitor should feel that drowning is real, fast, silent, and could happen at *their* house.
2. **Change behavior, not just awareness.** Every page ends in a concrete action: add a layer, name a Water Watcher, learn CPR, share.
3. **Tell Adam's story honestly and with hope.** Adam is the reason and the proof: a loving, careful family, a busy day, three minutes, and a boy who fought back.
4. **Be the voice of nonfatal drowning.** Almost every drowning prevention nonprofit was founded in memory of a child who died. Very few speak for **survivors** and the families caring for them. [Project One Cause](https://www.projectonecause.org/) is the main one we found. This is Because of ADAM's most distinctive role.
5. **Grow the village.** Turn Facebook followers into pledgers, sharers, volunteers, donors and partners, with Central Pennsylvania as home base.

## 2. Who it's for

| Audience | What they need | Where they land |
|---|---|---|
| **Parents of babies and toddlers** (primary) | A wake-up call and a simple checklist | Home → Water Safety → Pledge |
| **Grandparents, babysitters, relatives with pools** | "This applies to you too" | Water Safety ("At someone else's home"), Pledge, printable card |
| **Pool owners & new homeowners** | Fence/alarm/cover specifics | Water Safety (barriers, alarms, covers) |
| **Families of drowning survivors** | "You're not alone," practical resources | Survivors & Families |
| **Schools, daycares, churches, groups** | A speaker and materials | Get Involved → Contact |
| **Local media** | Story, facts, photos, contact | Adam's Story, The Facts (press kit to add later) |
| **Donors & partners** | What the money does, and whether they can trust you | Donate, About (board, transparency) |

## 3. Messaging pillars

Use these five ideas consistently across the site, social media, talks and printed materials.

1. **Drowning is silent.** It happens in seconds, often with adults nearby, with no splashing or screaming. *(Home hero; The Facts)*
2. **It only takes a second.** The family's own words. Adam slipped out during a busy graduation celebration and was found minutes later. *(Home clock; Adam's Story)*
3. **No single layer is enough, so stack them.** Supervision, barriers, alarms, covers, swim skills, life jackets and CPR. Layers fail on busy days, so you need more than one. *(Layers builder; Water Safety)*
4. **Surviving is only the beginning.** Nonfatal drowning can mean a lifetime of brain injury, therapy and cost. *(Survivors & Families)*
5. **It takes a village.** From *Adam's Village of Hope* to a movement. *(About; Get Involved)*

**The one line everyone should remember:** *If a child is missing, check the water first.* (It's in every page's footer.)

## 4. Voice and words

- **Warm, honest, urgent, never preachy or blaming.** Drowning happens to loving, attentive families. Shame keeps people silent.
- **Plain language.** Aim for a 7th–8th grade reading level. Short sentences.
- **Say:** "nonfatal drowning," "drowning survivor," "Water Watcher," "layers of protection," "check the water first."
- **Don't say:** "near-drowning" (outdated), "dry drowning" / "secondary drowning" (not medical terms), "drown-proof," or anything that suggests a single fix is enough.
- **Every number needs a source.** Use only the stats in [`src/data/facts.ts`](../src/data/facts.ts) / [RESEARCH.md](RESEARCH.md). Avoid the viral stats listed in RESEARCH.md §9.
- **Treatments:** share Adam's experience as *your family's story*, not as medical advice. Don't claim any therapy (e.g. HBOT) works for drowning injuries.

## 5. Site map (built)

✅ = built and ready · ✍️ = built, needs family content · 🔜 = future

| Page | Purpose | Key content | Main call to action | Status |
|---|---|---|---|---|
| **Home** `/` | Hook, emotion, first action | "Drowning is silent" hero · 4 headline stats · Adam teaser · time-on-page clock · interactive layers builder · 7 layers · survivors teaser · pledge band · ways to help | Read Adam's story / Learn the layers | ✍️ photo, story lines |
| **Adam's Story** `/adams-story` | The heart of the site | June 5, 2017 · the fight for his life · life after · why we speak up · Adam's village | Learn the layers / Take the pledge | ✍️ **family must review every section** |
| **Water Safety** `/water-safety` | The practical guide | Layers builder · 7 layers with checklists · high-risk moments (slipping away, full house, others' homes, bathtub, summer, autism) | Take the pledge | ✅ |
| **The Facts** `/the-facts` | Credibility, shareable numbers | Grouped stats with sources · note on words | See the layers | ✅ (click-verify sources) |
| **Survivors & Families** `/survivors-and-families` | Our unique voice | What nonfatal drowning means · stats · what families face · you're not alone · resources · treatment note | Reach out / Give | ✅ (add survivor stories later) |
| **Water Watcher Pledge** `/water-watcher` | Commitment + tool | 6 promises (interactive) · share button · **printable Water Watcher card** | Share / Print | ✅ |
| **Get Involved** `/get-involved` | Convert fans into helpers | 6 ways to help · copy-and-paste share toolkit | Various | ✅ |
| **Donate** `/donate` | Giving | What a gift does · donate button (when `donateUrl` is set) · tax-status note that switches automatically | Donate | ✍️ programs, platform link |
| **About** `/about` | Trust | Mission · ADAM acronym · values · team · transparency | Get involved | ✍️ mission, board |
| **Resources** `/resources` | Helpful hub, good for SEO | Curated links by topic | n/a | ✅ |
| **News** `/news` | Freshness, milestones | Updates (Markdown posts) | n/a | ✅ (1 starter post) |
| **Contact** `/contact` | Inbound | Form (when configured) or email/Facebook · emergency note | n/a | ✍️ form/email |
| **Privacy** `/privacy` | Required for donations/Ad Grants | Plain-language policy | n/a | ✍️ name your tools |

### What makes it engaging (already built)

- **Opening hero:** slow-moving underwater light and rising bubbles, and a headline that "surfaces" line by line.
- **The clock:** counts how long you've been on the page and sets that next to *"Adam was out of sight for about three minutes."*
- **Build your layers:** a top-down backyard. Switch on door alarm, fence, gate, pool alarm, cover and Water Watcher, and watch barriers appear on the toddler's path to the pool.
- **Water-level bar:** a thin "water line" on the left edge rises as you scroll.
- **Pledge with printable card:** tick all six promises, then print a Water Watcher card to laminate and put on a lanyard.
- **One-tap share text:** ready-made posts with #BecauseOfAdam.
- All motion respects the "reduce motion" accessibility setting, and everything works with a keyboard and screen reader.

## 6. What to add next (roadmap)

**Soon after launch**
- 🔜 **Adam's timeline:** milestones from June 2017 to today, with photos (a visual "then and now").
- 🔜 **A 60–120 second video** of the family telling the story (captioned). Put it on the home page and YouTube. This is often the single most-shared piece.
- 🔜 **Press kit page:** fact sheet, approved photos, logo files, bios, past coverage (WJAC, WTAJ), media contact.
- 🔜 **Pledge counter:** "1,284 Water Watchers and counting." It needs a form service (Web3Forms/Formspree → a spreadsheet); ask a volunteer or come back to Claude.
- 🔜 **Events page:** fundraisers, talks, Water Safety Month activities.

**Year one**
- 🔜 **Survivor family stories:** a gallery of nonfatal drowning survivors (with signed releases, see [PHOTO-AND-STORY-RELEASE.md](PHOTO-AND-STORY-RELEASE.md)). No other local organization tells these stories.
- 🔜 **"Is my home safe?" checklist/quiz:** 10 yes/no questions that give you a printable action list.
- 🔜 **For grandparents** and **For babysitters** one-pagers (printable).
- 🔜 **New pool owner packet** with local realtors, pool builders and insurers.
- 🔜 **Spanish version** of the Water Safety page and Water Watcher card.

**Programs the site could grow into** (only list them once they're real)
- Water Watcher tag distribution (events, pediatric offices, pool stores)
- Door/pool alarm giveaways for families with young children
- Swim lesson scholarships. ⚠️ If lessons are taught by a board member's or founder's own business (e.g. Rickey's ISR classes), scholarships paid to that business create a **conflict of interest / private benefit** issue. Get legal advice, disclose it, and have the unrelated board members approve it, or route scholarships to other providers.
- Infant/child CPR classes with a certified partner
- Talks for schools, daycares, churches, MOPS groups, pediatric offices
- Survivor family support: connection, resource navigation, partnership with Project One Cause
- Advocacy: Pennsylvania's building code still allows the house wall to be one side of a pool barrier if the doors have alarms. Pushing for **four-sided isolation fencing** locally is a natural cause for this family.

## 7. Content calendar

| Month | Theme | Ideas |
|---|---|---|
| Jan–Feb | Indoor water, bath time | Bathtub safety, buckets, winter ice/ponds |
| Mar–Apr | Get ready | Sign up for swim lessons now · CPR class push · fence/alarm checks before pool opening |
| **May** | **National Water Safety Month** | Daily posts · press · Water Watcher tag giveaways · pledge drive |
| **June 5** | **Adam's day** | Annual family update: where Adam is now |
| June–Aug | Peak season | "Pool party? Name a Water Watcher" · holiday reminders (Memorial Day, July 4, Labor Day) · vacation/lake safety · life jackets |
| **July 25** | **World Drowning Prevention Day** | Share the global picture; local event |
| Sep–Oct | Back to school / reflection | Thank the village · survivor stories · annual report |
| Nov–Dec | Giving | Giving Tuesday · year-end appeal · holiday gatherings at homes with pools/hot tubs |

**Social cadence:** 3 posts/week off-season, daily in May, 4–5/week in summer. Every post links to a page on the site so visitors come to you, not just to Facebook.

## 8. Search (SEO) and Google Ad Grants

- Each page already has its own title, description, social share image and a sitemap.
- Target phrases: *toddler drowning prevention, pool fence for kids, pool alarm, door alarm for pool, water watcher, nonfatal drowning, drowning survivor, water safety Pennsylvania, swim lessons Altoona/Blair County*.
- Once 501(c)(3) + domain + HTTPS are in place, apply for **Google Ad Grants** ($10k/month in ads). Set up "conversions" for pledge completions, contact form submissions and donations.
- Create a free **Google Business Profile** so "drowning prevention near me" searches in Central PA find you.

## 9. How we'll know it's working

- Pledges completed and Water Watcher cards printed
- Shares and site visits (especially in May–August)
- Talks given and Water Watcher tags distributed
- Newsletter signups, donations and recurring donors
- Survivor families who reach out
- Media mentions
