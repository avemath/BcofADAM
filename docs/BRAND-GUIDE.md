# Our brand guide

How we keep the website, social posts, flyers and Water Watcher cards looking and sounding like one organization. We'll update it once we have a real logo.

## Name
- **Full:** Because of ADAM: Allies in the Drowning Awareness Movement (the name we chose when we started it in 2020)
- **Short:** Because of ADAM (always capitalize **ADAM** when it refers to the movement; "Adam" when it's him)
- **Community:** Adam's Village / Adam's Village of Hope
- **Hashtags (already used on Facebook):** #BecauseofADAM (primary) · #AdamsVillage · #AdamRocks · #inHisTime · #smallmiracles

## Tagline options
- *Drowning is silent. We won't be.* (home page headline)
- *Learn from our past. Protect your future.* (our own hashtag, on the About page)
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
The site currently uses a simple text logo (sun over waves), in [`src/components/Logo.astro`](../src/components/Logo.astro). When we get a designed logo:
- Ask for **SVG** + **PNG** versions: full color, all-white (for dark backgrounds), and a square icon (for social profiles and the browser tab).
- Get a written **copyright assignment** to the organization from the designer.
- Replace `public/favicon.svg` and the markup in `Logo.astro`, and regenerate `public/images/share-card.png` (1200×630).
