# Our brand guide

How we keep the website, social posts, flyers and Water Watcher cards looking and sounding like one organization. We'll update it once we have a real logo.

## Name
- **Full:** Because of ADAM: Allies in the Drowning Awareness Movement (the name we chose when we started it in 2020)
- **Short:** Because of ADAM (always capitalize **ADAM** when it refers to the movement; "Adam" when it's him)
- **Community:** Adam's Village / Adam's Village of Hope
- **Hashtags (already used on Facebook):** #BecauseofADAM (primary) · #AdamsVillage · #AdamRocks · #inHisTime · #smallmiracles

## Tagline options
- *Drowning is silent. We won't be.* (home page headline)
- *Learn from our past. Protect your future.* (our own hashtag, on the About page; the 2021 banner says "their future")
- *We will end childhood drowning.* (our banner)
- *Join the movement. Become an Ally!* (our banner; on Get Involved)
- *Providing awareness to end childhood drowning.* (our 2021 flyer)
- *Skills before thrills.*
- *It only takes a second.* (Mom and Dad's words)
- *No single layer is enough.*
- *Check the water first.*

## Colors
Defined at the top of [`src/styles/global.css`](../src/styles/global.css). Change them there and the whole site updates.

| Name | Hex | Use |
|---|---|---|
| Abyss | `#041d2b` | Footer, darkest sections |
| Deep | `#083349` | Dark sections, headings on light |
| Ocean | `#0b5470` | Links, buttons on light backgrounds |
| Aqua | `#1aa6b7` | Accents, eyebrows, stat underlines |
| Shallow | `#bfe7ea` | Soft highlights on dark |
| Foam | `#eef8f8` | Light alternating sections |
| Sand | `#fbf6ee` | Page background |
| **Sun** | `#ffb703` | **Hope & action.** Main buttons, key words, Water Watcher |
| Coral | `#e85d4f` | Alerts only (sparingly) |

**Contrast:** dark text on Sun, and white on Deep/Abyss/Ocean, pass WCAG AA. Avoid white text on Aqua or Sun.

## Type
- **Headlines:** Fraunces (a warm serif; italics for emotional emphasis, e.g. *is silent.*)
- **Body:** Figtree (friendly, highly readable sans-serif)
- Both are free Google Fonts and work in Canva.

## Photos
- Real over stock. Warm, natural light; Adam and family as they really are.
- Show **safe behavior** in any water photo: an adult within arm's reach, life jackets on open water, a fence and gate visible. Never publish photos of unsupervised children near water, even as a "don't."
- Always get written permission for any child who isn't yours ([release template](PHOTO-AND-STORY-RELEASE.md)).
- Don't pair a child's full name with their school or neighborhood.

## Voice
Warm, honest, urgent, never blaming. See [CONTENT-PLAN.md §4](CONTENT-PLAN.md#4-voice-and-words) for the words to use and avoid.

## Logo
Our mark is a **brain with a heart at its center**, in teal, purple, magenta and orange (September 2026). It's Adam's brain injury and the love around him in one picture ("Because of Adam, I know so much about the brain," as Lea says).

| File | Use |
|---|---|
| `public/images/logo-mark-large.png` | Full-size mark on a transparent background, for flyers, shirts and social posts |
| `public/images/logo-mark.png` | The small mark next to "Because of ADAM" in the site header and footer ([`Logo.astro`](../src/components/Logo.astro)) |
| `public/favicon.ico`, `icon-192.png`, `icon-512.png` | Browser tab and bookmark icons |
| `public/apple-touch-icon.png` | iPhone home-screen icon (on our sand background) |
| `public/images/share-card.png` | The picture Facebook and texts show when someone shares our link (1200×630) |

- The mark works on light and dark backgrounds. Don't stretch it, recolor it, or put it on a busy photo.
- Always leave a little space around it, about the width of the teal ring.
- For print or embroidery, ask a designer for an **SVG** (vector) version traced from `logo-mark-large.png`, plus a one-color version. If someone else designed it, get a written OK for the organization to use it.
